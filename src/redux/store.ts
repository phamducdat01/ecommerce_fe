import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: 'auth', // Lưu dưới key riêng trong localStorage, vd: persist:auth
    storage,
    // whitelist: ['auth'], // Không cần whitelist khi chỉ persist 1 reducer
};

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedAuthReducer, // Trực tiếp dùng persisted reducer (không để trong object)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
