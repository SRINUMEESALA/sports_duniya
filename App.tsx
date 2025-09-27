import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store";
import CommentaryFeed from "./src/components/CommentaryFeed";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <CommentaryFeed />
      </SafeAreaProvider>
    </Provider>
  );
}
