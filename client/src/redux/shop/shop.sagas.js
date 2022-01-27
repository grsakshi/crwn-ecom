import { takeLatest, call, all, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import shopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // call takes function and it's params as the parameters
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        put(fetchCollectionsFailure(error.message));
    }
}

// if there are multiple fetches for collections by user then saga helps us to manage which call to accept and what to reject

export function* fetchCollectionsStart() {
    //takeLatest because we want it to fire only one time so we take the latest call as it will be the most up to date and safest
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}