import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { fetchWeather } from './services/weather';
import { UserEmptyState } from '@/models'
import Button from '@mui/material/Button';
import axios from 'axios';
import { WeatherAdapter } from './adapter';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import Logo from '../../assets/Logo-udi-web.png'

const username = 'udi_dominguez';
const password = 'FKh50iPx48';

export default function Home() {
  const [value, setValue] = React.useState<string>('');
  const [weather, setWeather] = React.useState(UserEmptyState);
  const getWeather = async () => {
    axios.get(`https://api.meteomatics.com/${value}/t_2m:C/52.520551,13.461804/json`, {
      withCredentials: true,
      auth: {
        username,
        password
      }
    })
      .then((res: any) => {
        setWeather(WeatherAdapter(res.data.data[0]));
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  const showText = (value: any[]) => {
    return value.map((val, key) => <p key={key}>{val.value}     {splitText()}</p>);
  }

  const splitText = ():string => {
    return weather.parameter.split("")[weather.parameter.length - 1]
  }

  return (
    <div className='contentData'>
      <div className='contentForm'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue?.toISOString());
            }}
          />
        </LocalizationProvider>
        <Button variant="outlined" onClick={() => { getWeather() }}>Search</Button>
      </div>
      <div className='contentResultTemp'>
        <ThermostatAutoIcon></ThermostatAutoIcon>
        {weather.coordinates.map((coor, key) => <div key={key}>{showText(coor['dates'])}</div>)}
      </div>
      <img src={Logo} />
      
    </div>
  );
}
