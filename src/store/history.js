import { createBrowserHistory } from "history";
import { helpers, storage } from "../services";
import config from "../config";

const pathname = window.location.pathname;
const locationLang = pathname.split('/')[1];
const storageLanguage = storage.get('gl_language')

const history = createBrowserHistory({
	basename: helpers.isEnableLang(locationLang) ? locationLang : (storageLanguage ? storageLanguage : config.DEFAULT_LANGUAGE)
});


export default history;




