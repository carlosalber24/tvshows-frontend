export interface ITvShowsList {
  title: string;
  age: string;
  year: number;
  imdb: string;
  rotten: string;
  sources: Array<string>;
  type: number;
}

export interface IParamsList {
  title: string | null;
  age: string | null;
  [key: string]: any;
}