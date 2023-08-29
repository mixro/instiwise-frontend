import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import coursesRedux from "./coursesRedux";
import lessonsRedux from "./lessonsRedux";
import roomsRedux from "./roomsRedux";
import freeRooms from "./freeRooms";
import ongoingCourses from "./ongoingCourses";
import ongoingLessons from "./ongoingLessons";
import upcomingLessons from "./upcomingLessons";
import roomsInUse from "./roomsInUse";
import userRedux from "./userRedux";
import postsRedux from "./postsRedux";
import todaysLessons from "./todaysLessons";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userRedux,
  rooms: roomsRedux,
  freeRooms: freeRooms,
  lessons: lessonsRedux,
  courses: coursesRedux,
  inUseRooms: roomsInUse,
  posts: postsRedux,
  ongoingCourses: ongoingCourses,
  ongoingLessons: ongoingLessons,
  upcomingLessons: upcomingLessons,
  todaysLessons: todaysLessons,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
