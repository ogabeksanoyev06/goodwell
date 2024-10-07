import axios from "axios";
import config from "../../config";

const request = axios.create({
  baseURL: config.API_ROOT,
});

request.defaults.params = {};
request.defaults.params["_f"] = "json";
request.defaults.headers.common["Accept"] = "application/json";
request.defaults.headers.common["Cache-Control"] = "no-cache";
request.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";


const subscribe = store => {
  let state = store.getState();
  request.defaults.params["_l"] = state.system.currentLangCode;
};

export default {
  request,
  subscribe,
};
