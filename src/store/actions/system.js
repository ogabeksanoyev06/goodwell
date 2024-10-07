import { createRoutine } from "redux-saga-routines";

const ChangeLanguage = createRoutine("CHANGE_LANGUAGE");
const UploadFile = createRoutine("UPLOAD_FILE");
const DeleteFile = createRoutine("DELETE_FILE");
const GetSettings = createRoutine("GET_SETTINGS");
const GetBanners = createRoutine("GET_BANNERS");
const GetCategories = createRoutine("GET_CATEGORIES");
const GetHomeProducts = createRoutine("GET_HOME_PRODUCTS");
const GetHomeNews = createRoutine("GET_HOME_NEWS");
const GetHomeVideo = createRoutine("GET_HOME_VIDEO");
const GetFaqs = createRoutine("GET_FAQS");
const GetContacts = createRoutine("GET_CONTACTS");
const SetIsMobile = createRoutine("SET_IS_MOBILE");
const GetSeo = createRoutine("GET_SEO");

export default {
  ChangeLanguage,
  UploadFile,
  DeleteFile,
  GetSettings,
  SetIsMobile,
  GetBanners,
  GetCategories,
  GetHomeProducts,
  GetHomeNews,
  GetHomeVideo,
  GetFaqs,
  GetContacts,
  GetSeo
};
