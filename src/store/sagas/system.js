import { takeLatest, put, all, call } from "redux-saga/effects";

import { storage } from "../../services";
import systemActions from "../actions/system";
import { api, queryBuilder } from "../../services";

function* ChangeLanguage(action) {
	storage.set("gl_language", action.payload);
	yield put(systemActions.ChangeLanguage.success());
}

function* DeleteFile(action) {
	const { id, cb } = action.payload;

	try {
		yield put(systemActions.DeleteFile.request());
		const { data } = yield call(api.request.delete, queryBuilder(`/filemanager/uploads/${id}`));
		yield put(systemActions.DeleteFile.success({ files: data }));
		yield call(cb.success, data);
	} catch (e) {
		yield put(systemActions.DeleteFile.failure(e));
		yield call(cb.failure, e);
	} finally {
		yield put(systemActions.DeleteFile.fulfill());
		yield call(cb.finally);
	}
}

function* UploadFile(action) {
	const { files, cb } = action.payload;
	try {
		const { data } = yield call(api.request.post, queryBuilder("/profile/filemanager/uploads"), files);

		yield put(systemActions.UploadFile.success({ files: data }));
		yield call(cb.success, data);
	} catch (e) {
		yield put(systemActions.UploadFile.failure(e));
		yield call(cb.failure, e);
	} finally {
		yield put(systemActions.UploadFile.fulfill());
		yield call(cb.finally);
	}
}

function* GetSettings() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/settings", {
				limit: 50,
				include: "file"
			})
		);
		yield put(
			systemActions.GetSettings.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetSettings.failure({
				error
			})
		);
	}
}

function* GetSeo() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/meta", {
				limit: 50,
			})
		);
		yield put(
			systemActions.GetSeo.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetSeo.failure({
				error
			})
		);
	}
}

function* GetBanners() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/banners", {
				limit: 10,
				include: "fileUz,fileRu,fileEn,mobileFileUz,mobileFileRu,mobileFileEn",
				sort: 'sort'
			})
		);
		yield put(
			systemActions.GetBanners.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetBanners.failure({
				error
			})
		);
	}
}

function* GetCategories() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/categories", {
				limit: 50,
				extra: { root: 1 },
				sort: 'sort',
				include: "children.icon,file,icon"
			})
		);
		yield put(
			systemActions.GetCategories.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetCategories.failure({
				error
			})
		);
	}
}

function* GetHomeProducts() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/products", {
				limit: 20,
				extra: {
					is_sale: 1,
					is_new: 1
				},
				include: "file,translate,category",
				sort: '-id'
			})
		);
		yield put(
			systemActions.GetHomeProducts.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetHomeProducts.failure({
				error
			})
		);
	}
}

function* GetHomeNews() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/posts", {
				limit: 8,
				sort: '-published_at',
				include: "file",
				filter: {
					type: 1
				}
			})
		);
		yield put(
			systemActions.GetHomeNews.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetHomeNews.failure({
				error
			})
		);
	}
}

function* GetHomeVideo() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/posts", {
				limit: 8,
				sort: '-published_at',
				include: "file",
				filter: {
					type: 2
				}
			})
		);
		yield put(
			systemActions.GetHomeVideo.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetHomeVideo.failure({
				error
			})
		);
	}
}

function* GetFaqs() {
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/faq", {
				limit: 20,
				sort: '-id'
			})
		);
		yield put(
			systemActions.GetFaqs.success({
				data: data.data
			})
		);
	} catch (error) {
		yield put(
			systemActions.GetFaqs.failure({
				error
			})
		);
	}
}

function* GetContacts(action) {
	const {successCb} = action.payload;
	try {
		const { data } = yield call(
			api.request.get,
			queryBuilder("/contacts", {
				limit: 20,
				sort: '-id',
				include: 'region'
			})
		);
		yield put(
			systemActions.GetContacts.success({
				data: data.data
			})
		);

		if(typeof successCb === 'function'){
			yield call(successCb, data.data);
		}

	} catch (error) {
		yield put(
			systemActions.GetContacts.failure({
				error
			})
		);
	}
}

export default function* root() {
	yield all([
		takeLatest(systemActions.ChangeLanguage.TRIGGER, ChangeLanguage),
		takeLatest(systemActions.UploadFile.TRIGGER, UploadFile),
		takeLatest(systemActions.DeleteFile.TRIGGER, DeleteFile),
		takeLatest(systemActions.GetSettings.TRIGGER, GetSettings),
		takeLatest(systemActions.GetCategories.TRIGGER, GetCategories),
		takeLatest(systemActions.GetBanners.TRIGGER, GetBanners),
		takeLatest(systemActions.GetHomeProducts.TRIGGER, GetHomeProducts),
		takeLatest(systemActions.GetHomeVideo.TRIGGER, GetHomeVideo),
		takeLatest(systemActions.GetHomeNews.TRIGGER, GetHomeNews),
		takeLatest(systemActions.GetFaqs.TRIGGER, GetFaqs),
		takeLatest(systemActions.GetContacts.TRIGGER, GetContacts),
		takeLatest(systemActions.GetSeo.TRIGGER, GetSeo)
	]);
}
