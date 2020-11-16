import {FETCH_WEATHER} from '../constants';

export const fetchWeatherAction = ({lat, lon} = {}) => ({
  type: FETCH_WEATHER,
  payload: {lat, lon},
});
