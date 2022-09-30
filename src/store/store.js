import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const store = configureStore({
	reducer: {},
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development'
			? getDefaultMiddleware().concat(createLogger)
			: getDefaultMiddleware(),
});

export default store;
