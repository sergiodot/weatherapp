interface UserAssociatedUrl {
  name: string;
  url: string;
}

export interface ApiUser {
  parameter: string;
  coordinates: string[];
}

export interface User {
  parameter: string;
  coordinates: any[];
}

export const UserEmptyState: User = {
  parameter: '',
  coordinates: [],
};
