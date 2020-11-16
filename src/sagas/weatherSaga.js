import {fetchWeather, fetchCity} from '../api';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILED,
} from '../constants';
import {ToastAndroid} from 'react-native';

export function* fetchWeatherSaga(action) {
  try {
    const {lat, lon} = action.payload || {};
    const weather = yield call(fetchWeather, {lat, lon});
    const cityData = yield call(fetchCity, {lat, lon});

    weather.city = cityData.city;

    yield put({
      type: FETCH_WEATHER_SUCCESS,
      payload: weather,
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      ToastAndroid.show("Can't connect to Internet", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
    yield put({
      type: FETCH_WEATHER_FAILED,
    });
  }
}

export function* watchFetchWeather() {
  yield takeLatest(FETCH_WEATHER, fetchWeatherSaga);
}

export default {watchFetchWeather};
