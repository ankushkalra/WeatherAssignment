import React, {useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';
import ShowWeather from './ShowWeather';
import {fetchWeatherAction} from '../actions';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

const source = require('./animation.json');

function HomeScreen({dispatch, isFetching, fetchFailed, weatherData}) {
  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location for weather',
          message: 'Click OK so that we can show weather of your city.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: {latitude: lat, longitude: lon},
            } = position;
            dispatch(fetchWeatherAction({lat, lon}));
          },
          (error) => {
            ToastAndroid.show(
              "Can't get location, showing weather for Delhi",
              ToastAndroid.LONG,
            );
            dispatch(fetchWeatherAction());
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        ToastAndroid.show(
          "Can't get location, showing weather for Delhi",
          ToastAndroid.LONG,
        );
        dispatch(fetchWeatherAction());
      }
    })();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <View style={styles.loader}>
          <LottieView source={source} autoPlay loop />
        </View>
      ) : null}
      {isFetching ? null : fetchFailed ? (
        <Text style={styles.errorText}>Can't connect to network</Text>
      ) : (
        <ShowWeather data={weatherData} />
      )}
    </View>
  );
}

export default connect((state) => ({
  isFetching: state.weather.isFetching,
  fetchFailed: state.weather.fetchFailed,
  weatherData: state.weather.weatherData,
}))(HomeScreen);

const styles = StyleSheet.create({
  container: {flex: 1},
  loader: {flex: 1},
});
