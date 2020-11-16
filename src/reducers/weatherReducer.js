import {
  FETCH_WEATHER,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILED,
} from '../constants';

const initialState = {weatherData: {}, isFetching: false, fetchFailed: false};

const formatWeatherData = (data) => {
  const formattedData = {
    city: data.city,
    today: data.daily[0],
    next5Days: data.daily.slice(1, 6),
  };
  return formattedData;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {...state, isFetching: true};
    case FETCH_WEATHER_SUCCESS:
      return {
        isFetching: false,
        fetchFailed: false,
        weatherData: formatWeatherData(action.payload),
      };
    case FETCH_WEATHER_FAILED:
      return {isFetching: false, fetchFailed: true};
    default:
      return state;
  }
};
