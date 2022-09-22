import { ApiUser, User } from '@/models';

export const WeatherAdapter = (user: ApiUser): User => {
  return {
    parameter: user.parameter,
    coordinates: user.coordinates,
  };
};
