import { ApiUser } from '@/models';
import { WeatherAdapter } from '../adapter';
import axios from 'axios';

const username = 'udi_dominguez';
const password = 'FKh50iPx48';

export const fetchWeather =  (date: string):any => {
   axios.get(`https://api.meteomatics.com/${date}/t_2m:C/52.520551,13.461804/json`, {
    withCredentials: true,
    auth: {
      username, 
      password
    }
  })
    .then((res: any) => {
      const result = WeatherAdapter(res.data.data[0]);
      return result
    })
    .catch(function (error: any) {
      console.log(error);
    });

};
