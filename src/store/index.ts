import { configureStore } from "@reduxjs/toolkit";
import commentaryReducer, {
  startStreaming,
  stopStreaming,
} from "./slices/commentarySlice";
import scoreReducer from "./slices/scoreSlice";
import { dataStreamMiddleware } from "./middleware/dataStreamMiddleware";

export const store = configureStore({
  reducer: {
    commentary: commentaryReducer,
    score: scoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [startStreaming.type, stopStreaming.type],
        ignoredPaths: ["commentary.streamingInterval"],
      },
    }).concat(dataStreamMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
