interface IMarvelResponse<T> {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    results: T[];
  };
}

export default IMarvelResponse;
