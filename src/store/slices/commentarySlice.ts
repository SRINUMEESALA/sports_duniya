import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CricketEvent } from "../../types/CricketEvent";

interface CommentaryState {
  events: CricketEvent[];
  isStreaming: boolean;
  streamingInterval: NodeJS.Timeout | null;
  currentEventIndex: number;
}

const initialState: CommentaryState = {
  events: [],
  isStreaming: false,
  streamingInterval: null,
  currentEventIndex: 0,
};

const commentarySlice = createSlice({
  name: "commentary",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CricketEvent>) => {
      state.events.push(action.payload);
    },
    resetEvents: (state) => {
      state.events = [];
      state.currentEventIndex = 0;
    },
    setStreaming: (state, action: PayloadAction<boolean>) => {
      state.isStreaming = action.payload;
    },
    setStreamingInterval: (
      state,
      action: PayloadAction<NodeJS.Timeout | null>
    ) => {
      state.streamingInterval = action.payload;
    },
    incrementEventIndex: (state) => {
      state.currentEventIndex += 1;
    },
    resetEventIndex: (state) => {
      state.currentEventIndex = 0;
    },
    startStreaming: (state) => {
      state.isStreaming = true;
    },
    stopStreaming: (state) => {
      state.isStreaming = false;
    },
  },
});

export const {
  addEvent,
  resetEvents,
  setStreaming,
  setStreamingInterval,
  incrementEventIndex,
  resetEventIndex,
  startStreaming,
  stopStreaming,
} = commentarySlice.actions;

export default commentarySlice.reducer;
