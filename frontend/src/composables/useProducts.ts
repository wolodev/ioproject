import { api } from 'src/boot/axios';

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

  async function query(
    type: careType,
    ids: number[],
    query: string
  ): Promise<Product> {
    const response: { data: Product } = await api.get(
      `${type.toLowerCase()}product`,
      {
        params: {
          ids,
          query,
        },
      }
    );
    return response.data;
  }

  return {
    get,
    getAll,
    query,
  };
}
