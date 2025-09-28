import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CricketEvent } from "../../types/CricketEvent";

interface BatsmanStats {
  runs: number;
  balls: number;
}

interface BowlerStats {
  runs: number;
  balls: number;
  wickets: number;
}

interface ScoreState {
  totalRuns: number;
  totalWickets: number;
  currentOver: number;
  ballsInOver: number;
  currentBatsman: string | null;
  currentBowler: string | null;
  matchStatus: string;
  batsmanStats: Record<string, BatsmanStats>;
  bowlerStats: Record<string, BowlerStats>;
}

const initialState: ScoreState = {
  totalRuns: 0,
  totalWickets: 0,
  currentOver: 0,
  ballsInOver: 0,
  currentBatsman: null,
  currentBowler: null,
  matchStatus: "Not Started",
  batsmanStats: {},
  bowlerStats: {},
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    processEvent: (state, action: PayloadAction<CricketEvent>) => {
      const event = action.payload;

      switch (event.type) {
        case "BALL":
          const { runs, batsman, bowler } = event.payload;

          if (
            state.matchStatus === "Not Started" &&
            state.totalRuns === 0 &&
            state.ballsInOver === 0
          ) {
            state.matchStatus = "Match Start";
          }

          state.totalRuns += runs;
          state.ballsInOver += 1;

          if (state.ballsInOver === 6) {
            state.currentOver += 1;
            state.ballsInOver = 0;
          }

          state.currentBatsman = batsman;
          state.currentBowler = bowler;

          if (!state.batsmanStats[batsman]) {
            state.batsmanStats[batsman] = { runs: 0, balls: 0 };
          }
          state.batsmanStats[batsman].runs += runs;
          state.batsmanStats[batsman].balls += 1;

          if (!state.bowlerStats[bowler]) {
            state.bowlerStats[bowler] = { runs: 0, balls: 0, wickets: 0 };
          }
          state.bowlerStats[bowler].runs += runs;
          state.bowlerStats[bowler].balls += 1;
          break;

        case "BOUNDARY":
        case "SIX":
          const boundaryRuns = event.payload.runs;
          const boundaryBatsman = event.payload.batsman;
          const boundaryBowler = event.payload.bowler;

          if (
            state.matchStatus === "Not Started" &&
            state.totalRuns === 0 &&
            state.ballsInOver === 0
          ) {
            state.matchStatus = "Match Start";
          }

          state.totalRuns += boundaryRuns;
          state.ballsInOver += 1;

          if (state.ballsInOver === 6) {
            state.currentOver += 1;
            state.ballsInOver = 0;
          }

          state.currentBatsman = boundaryBatsman;
          state.currentBowler = boundaryBowler;

          if (!state.batsmanStats[boundaryBatsman]) {
            state.batsmanStats[boundaryBatsman] = { runs: 0, balls: 0 };
          }
          state.batsmanStats[boundaryBatsman].runs += boundaryRuns;
          state.batsmanStats[boundaryBatsman].balls += 1;

          if (!state.bowlerStats[boundaryBowler]) {
            state.bowlerStats[boundaryBowler] = {
              runs: 0,
              balls: 0,
              wickets: 0,
            };
          }
          state.bowlerStats[boundaryBowler].runs += boundaryRuns;
          state.bowlerStats[boundaryBowler].balls += 1;
          break;

        case "WICKET":
          const {
            playerOut,
            batsman: wicketBatsman,
            bowler: wicketBowler,
          } = event.payload;

          if (
            state.matchStatus === "Not Started" &&
            state.totalRuns === 0 &&
            state.ballsInOver === 0
          ) {
            state.matchStatus = "Match Start";
          }

          state.totalWickets += 1;
          state.ballsInOver += 1;

          if (state.ballsInOver === 6) {
            state.currentOver += 1;
            state.ballsInOver = 0;
          }

          state.currentBatsman = wicketBatsman;
          state.currentBowler = wicketBowler;

          if (!state.bowlerStats[wicketBowler]) {
            state.bowlerStats[wicketBowler] = { runs: 0, balls: 0, wickets: 0 };
          }
          state.bowlerStats[wicketBowler].balls += 1;
          state.bowlerStats[wicketBowler].wickets += 1;
          break;

        case "MATCH_STATUS":
          state.matchStatus = event.payload.status;
          break;

        case "OVER_COMPLETE":
          state.currentOver += 1;
          state.ballsInOver = 0;
          break;

        default:
          break;
      }
    },
    resetScore: (state) => {
      state.totalRuns = 0;
      state.totalWickets = 0;
      state.currentOver = 0;
      state.ballsInOver = 0;
      state.currentBatsman = null;
      state.currentBowler = null;
      state.matchStatus = "Not Started";
      state.batsmanStats = {};
      state.bowlerStats = {};
    },
  },
});

export const { processEvent, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
