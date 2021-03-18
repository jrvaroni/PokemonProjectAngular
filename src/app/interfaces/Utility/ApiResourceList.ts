export interface IApiResource<T> {
  url: string;
  endpoint?: any;
}

export interface IApiResourceList<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<IApiResource<T>>;
}
