import {
  EVENT_TYPES,
  MATCH_STATUS,
  DISMISSAL_TYPES,
  CricketEvent,
} from "../../types/CricketEvent";
import { Middleware, AnyAction } from "@reduxjs/toolkit";
import {
  addEvent,
  setStreamingInterval,
  incrementEventIndex,
  resetEventIndex,
  startStreaming,
  stopStreaming,
  resetEvents,
} from "../slices/commentarySlice";
import { processEvent, resetScore } from "../slices/scoreSlice";

const mockEvents = [
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 1,
      commentary: "Good running between the wickets.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 0.1,
    },
  },
  {
    type: EVENT_TYPES.BOUNDARY,
    payload: {
      runs: 4,
      commentary: "Classic cover drive, races to the boundary!",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 0.2,
    },
  },
  {
    type: EVENT_TYPES.SIX,
    payload: {
      runs: 6,
      commentary: "Massive six over long-on! What a shot!",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 0.3,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 0,
      commentary: "Dot ball, good line and length.",
      batsman: "R. Sharma",
      bowler: "S. Broad",
      over: 0.4,
    },
  },
  {
    type: EVENT_TYPES.WICKET,
    payload: {
      playerOut: "R. Sharma",
      dismissal: DISMISSAL_TYPES.LBW,
      commentary: "Big appeal... and he's out! LBW!",
      batsman: "R. Sharma",
      bowler: "S. Broad",
      over: 0.5,
    },
  },
  {
    type: EVENT_TYPES.OVER_COMPLETE,
    payload: {
      over: 1,
      runs: 14,
      commentary: "End of over 1. 14 runs from it.",
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 2,
      commentary: "Quick single, good fielding.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 1.1,
    },
  },
  {
    type: EVENT_TYPES.BOUNDARY,
    payload: {
      runs: 4,
      commentary: "Beautiful straight drive!",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 1.2,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 1,
      commentary: "Single to deep square leg.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 1.3,
    },
  },
  {
    type: EVENT_TYPES.SIX,
    payload: {
      runs: 6,
      commentary: "Another six! This is getting expensive!",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 1.4,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 0,
      commentary: "Dot ball, well bowled.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 1.5,
    },
  },
  {
    type: EVENT_TYPES.OVER_COMPLETE,
    payload: {
      over: 2,
      runs: 13,
      commentary: "End of over 2. 13 runs from it.",
    },
  },
  {
    type: "UNKNOWN_EVENT_1" as any,
    payload: {
      message: "This is an unknown event type",
      data: { test: "value", number: 42 },
      commentary: "Something unexpected happened!",
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 1,
      commentary: "Back to normal play.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 2.1,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 2,
      commentary: "Good start to the innings.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 2.2,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 1,
      commentary: "Single to mid-wicket.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 2.3,
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 3,
      commentary: "Three runs, good running between the wickets.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 2.4,
    },
  },
  {
    type: EVENT_TYPES.MATCH_STATUS,
    payload: {
      status: MATCH_STATUS.INNINGS_BREAK,
      summary: "India finishes on 31/1.",
    },
  },
  {
    type: EVENT_TYPES.BALL,
    payload: {
      runs: 1,
      commentary: "Back to normal play after the break.",
      batsman: "V. Kohli",
      bowler: "J. Anderson",
      over: 2.5,
    },
  },
];

let currentIndex = 0;
let streamingInterval: NodeJS.Timeout | null = null;

export const dataStreamMiddleware: Middleware =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);

    if (action.type === "commentary/startStreaming") {
      if (streamingInterval) {
        clearInterval(streamingInterval);
      }

      const processNextEvent = () => {
        if (currentIndex < mockEvents.length) {
          const event = {
            ...mockEvents[currentIndex],
            id: `event_${Date.now()}_${currentIndex}`,
          } as any;

          store.dispatch(addEvent(event));
          store.dispatch(processEvent(event));
          store.dispatch(incrementEventIndex());

          currentIndex++;

          if (event.type === EVENT_TYPES.MATCH_STATUS) {
            if (streamingInterval) {
              clearInterval(streamingInterval);
            }

            setTimeout(() => {
              setTimeout(() => {
                const matchStartEvent = {
                  type: EVENT_TYPES.MATCH_STATUS,
                  payload: {
                    status: MATCH_STATUS.MATCH_START,
                    summary: "Play resumes after the break.",
                  },
                  id: `status_resume_${Date.now()}`,
                };

                store.dispatch(addEvent(matchStartEvent));
                store.dispatch(processEvent(matchStartEvent));

                streamingInterval = setInterval(processNextEvent, 1500);
                store.dispatch(setStreamingInterval(streamingInterval));
              }, 3000);
            }, 3000);
          }
        } else {
          currentIndex = 0;
          store.dispatch(resetEventIndex());
        }
      };

      streamingInterval = setInterval(processNextEvent, 2000);

      store.dispatch(setStreamingInterval(streamingInterval));
    }

    if (action.type === "commentary/stopStreaming") {
      if (streamingInterval) {
        clearInterval(streamingInterval);
        streamingInterval = null;
        store.dispatch(setStreamingInterval(null));
      }
    }

    if (action.type === "commentary/resetEvents") {
      currentIndex = 0;
      if (streamingInterval) {
        clearInterval(streamingInterval);
        streamingInterval = null;
        store.dispatch(setStreamingInterval(null));
      }
      store.dispatch(resetScore());
    }

    return result;
  };
