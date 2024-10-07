import useGetAll from "queryHooks/useGetAll";
import { get } from "lodash";

const All = ({
  children,
  name,
  url,
  onSuccess,
  onError,
  dataKey = "data",
  queryOptions,
  params,
}) => {
  const data = useGetAll({
    name,
    url,
    onSuccess,
    onError,
    queryOptions,
    params,
  });

  const newData = {
    items: get(data, `data.${dataKey}`, []),
    meta: {
      currentPage: get(data, "data.meta.currentPage", 1),
      pageCount: get(data, "data.meta.lastPage", 1),
      perPage: get(data, "data.meta.perPage", 1),
      totalCount: get(data, "data.meta.total", 1),
    },
  };
  return children({
    items: newData.items,
    meta: newData.meta,
    ...data,
  });
};

export default All;
