import { getCategories } from "./categoriesService";
import { getTracks } from "./trackService";

export const fetchMountCustomerData = async () => {
  const [categoriesResponse, tracksResponse] = await Promise.all([
    getCategories(),
    getTracks(),
  ]);

  return {
    categories: categoriesResponse,
    tracks: tracksResponse,
  };
};
