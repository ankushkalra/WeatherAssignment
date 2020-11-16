import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import WeatherData from './WeatherData';
import {fetchWeatherAction} from '../actions';
import {connect} from 'react-redux';

const source = require('./animation.json');

function Weather({dispatch, isFetching, fetchFailed, weatherData}) {
  useEffect(() => {
    dispatch(fetchWeatherAction());
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
        <WeatherData data={weatherData} />
      )}
    </View>
  );
}

export default connect((state) => ({
  isFetching: state.weather.isFetching,
  fetchFailed: state.weather.fetchFailed,
  weatherData: state.weather.weatherData,
}))(Weather);

const styles = StyleSheet.create({
  container: {flex: 1},
  loader: {flex: 1},
});
