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
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [weather, setWeather] = React.useState(UserEmptyState);
  const getWeather = async () => {
    const result = await fetchWeather(date?.toISOString());
    setWeather(result);
  }

  const showText = (value: any[]) => {
    return value.map((val, key) => <p key={key}>{val.value}{splitText()}</p>);
  }

  const splitText = (): string => {
    return weather.parameter.split("")[weather.parameter.length - 1]
  }

  return (
    <div className='contentData'>
      <div className='contentForm'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={date}
            onChange={newValue => {
              setDate(newValue);
            }}
          />
        </LocalizationProvider>
        <Button variant="outlined" onClick={() => { getWeather() }}>Search</Button>
      </div>
      <div className='contentResultTemp'>
        <ThermostatAutoIcon></ThermostatAutoIcon>
        {weather.coordinates?.map((coor, key) => <div key={key}>{showText(coor['dates'])}</div>)}
      </div>
      <img src={Logo} />

    </div>
  );
}
