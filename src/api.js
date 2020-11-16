import {create} from 'apisauce';

const API_KEY = '8b703f5a717bc4aed1d05288b282d539';

const api = create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export async function fetchWeather({lat, lon} = {}) {
  const response = await api.get('/onecall', {
    lat: lat || 28.704,
    lon: lon || 77.102,
    appid: API_KEY,
    exclude: 'hourly,current,minutely',
  });

  return response.data;
}

export async function fetchCity({lat, lon} = {}) {
  const response = await api.get('/forecast', {
    lat: lat || 28.704,
    lon: lon || 77.102,
    appid: API_KEY,
  });

  return response.data;
}
