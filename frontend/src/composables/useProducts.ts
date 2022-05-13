import { api } from 'src/boot/axios';

type queryParams = {
  type: careType;
  ids?: number[];
  query?: string;
};

export default function useProducts() {
  async function get(type: careType, id: number): Promise<Product> {
    const response: { data: Product } = await api.get(
      `${type.toLowerCase()}product/${id}`
    );
    return response.data;
  }

  async function getAll(type: careType): Promise<Product[]> {
    let response: Product[] = [];
    try {
      response = await api.get(`${type.toLowerCase()}product`);
    } catch (err) {
      console.error(err);
    }
    return response;
  }

  async function query({ type, ids, query }: queryParams): Promise<Product[]> {
    const response: { data: Product[] } = await api.get(
      `${type.toLowerCase()}product${createQueryString(ids, query)}`
    );
    return response.data;
  }

  function createQueryString(ids: number[] = [], query = ''): string {
    // we need to create own function for query Params, because our backend doesn't follow rfc
    // and expect arrays as arr=1&arr=2 instead of arr[]=1&arr[]=2
    let queryString = '?';
    if (query) {
      queryString += `query=${query}&`;
    }
    if (ids.length) {
      queryString += 'ids=' + ids.join('&ids=');
    }
    return queryString;
  }

  return {
    get,
    getAll,
    query,
  };
}
