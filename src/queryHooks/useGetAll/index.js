import { useQuery } from "@tanstack/react-query";
import { api, queryBuilder } from "services";

async function getAll({ queryKey }) {
  const { url, params } = queryKey[1];

  const res = await api.request.get(queryBuilder(url, params));
  return res.data;
}
function useGetAll(args) {
  const { name, onSuccess, onError, queryOptions, url, params } = args;

  const data = useQuery({
    queryKey: [`${name}`, { url, params }],
    queryFn: getAll,
    onSuccess,
    onError,
    ...queryOptions,
  });

  return { ...data };
}
export default useGetAll;
