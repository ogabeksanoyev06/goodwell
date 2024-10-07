import { useMutation } from "@tanstack/react-query";
import { api, queryBuilder } from "services";

export async function postData(options) {
  const { url, data, params, method } = options;
  return await api.request[method](queryBuilder(url, params), data);
}

const usePost = () => {
  return useMutation(postData);
};

export default usePost;
