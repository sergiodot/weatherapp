import { ApiUser } from '@/models';
import { WeatherAdapter } from '../adapter';

const username = 'udi_dominguez';
const password = 'FKh50iPx48';

export const fetchWeather = (date: string | null | undefined) => {
  const url = `https://api.meteomatics.com/${date}/t_2m:C/52.520551,13.461804/json`;
  return fetch(url, {
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    },
  })
    .then(res => res.json())
    .then(res => WeatherAdapter(res.data[0]));
};
