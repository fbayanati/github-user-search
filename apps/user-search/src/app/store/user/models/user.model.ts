export interface User {
  id: string;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface MapUserSearch {
  totalCount: number;
  users: User[];
  searchValue: string;
  searchPage: number;
}
