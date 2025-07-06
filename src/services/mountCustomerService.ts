import { getCategories } from "./categoriesService";
import { getStatuses } from "./statusService";
import { getTracks } from "./trackService";

export const fetchMountCustomerData = async () => {
  const [categoriesResponse, tracksResponse, statusesResponse] =
    await Promise.all([getCategories(), getTracks(), getStatuses()]);

  return {
    categories: categoriesResponse,
    tracks: tracksResponse,
    statuses: statusesResponse,
  };
};
