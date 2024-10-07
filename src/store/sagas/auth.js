import { call, put, all, takeLatest, takeEvery } from "redux-saga/effects";
import { api, queryBuilder, storage } from "../../services";
import authActions from "../actions/auth";
import get from "lodash/get";

export function* LoginRequest(action) {
  const {
    values: { username, password },
    cb,
  } = action.payload;

  try {
    const { data } = yield call(
      api.request.post,
      queryBuilder("/user/sign-in"),
      {
        username,
        password,
      }
    );

    if (get(data, "data.token")) {
      yield call(storage.set, "token", get(data, "data.token"));

      yield put(authActions.Login.success(get(data, "data")));
    }

    yield call(cb.success, data);
  } catch (error) {
    yield put(
      authActions.Login.failure({
        error,
      })
    );

    yield call(cb.error, get(error, "errorData.errors.otp"));
  } finally {
    yield call(cb.finally);
  }
}

export function* GetMeRequest(action) {
  // try {
  //   const { data } = yield call(
  //     api.request.get,
  //     queryBuilder("/account/info/")
  //   );

  //   yield put(authActions.GetMe.success({ data: data }));

  //   if (get(action.payload, "successCb")) {
  //     yield call(action.payload.successCb, data);
  //   }
  // } catch (error) {
  //   yield put(
  //     authActions.GetMe.failure({
  //       error,
  //     })
  //   );

  //   yield call(storage.remove, "token");
  // }

  try {
    const { data } = yield call(
      api.request.get,
      queryBuilder("/auth/get-me", {
        include: "company.region,company.district,company.file,file,setting",
      })
    );
    yield put(authActions.GetMe.success({ data: data }));

    if (get(action.payload, "successCb")) {
      yield call(action.payload.successCb, data);
    }
  } catch (error) {
    yield put(
      authActions.GetMe.failure({
        error,
      })
    );

    yield call(storage.remove, "token");
  }
}

export function* LogoutRequest() {
  yield call(storage.remove, "token");
}

export default function* root() {
  yield all([
    takeEvery(authActions.Login.REQUEST, LoginRequest),
    takeLatest(authActions.GetMe.TRIGGER, GetMeRequest),
    takeLatest(authActions.Logout.REQUEST, LogoutRequest),
  ]);
}
