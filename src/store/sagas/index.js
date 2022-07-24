import { all, fork } from 'redux-saga/effects';
import { productSaga } from './productSaga';
import { userSaga } from './userSaga';

export function* mySaga() {
    console.log("saga run");
    yield all([fork(userSaga), fork(productSaga)]);
    // yield all([fork(productSaga)]);
}