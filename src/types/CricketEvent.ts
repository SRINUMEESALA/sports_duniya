export const EVENT_TYPES = {
  BALL: "BALL",
  BOUNDARY: "BOUNDARY",
  WICKET: "WICKET",
  MATCH_STATUS: "MATCH_STATUS",
  OVER_COMPLETE: "OVER_COMPLETE",
  SIX: "SIX",
  WIDE: "WIDE",
  NO_BALL: "NO_BALL",
  BYE: "BYE",
  LEG_BYE: "LEG_BYE",
} as const;

export const MATCH_STATUS = {
  INNINGS_BREAK: "Innings Break",
  MATCH_START: "Match Start",
  MATCH_END: "Match End",
  RAIN_DELAY: "Rain Delay",
  LUNCH: "Lunch",
  TEA: "Tea",
} as const;

export const DISMISSAL_TYPES = {
  BOWLED: "Bowled",
  CAUGHT: "Caught",
  LBW: "LBW",
  RUN_OUT: "Run Out",
  STUMPED: "Stumped",
  HIT_WICKET: "Hit Wicket",
  RETIRED_HURT: "Retired Hurt",
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];
export type MatchStatus = (typeof MATCH_STATUS)[keyof typeof MATCH_STATUS];
export type DismissalType =
  (typeof DISMISSAL_TYPES)[keyof typeof DISMISSAL_TYPES];

export interface BallPayload {
  runs: number;
  commentary: string;
  batsman: string;
  bowler: string;
  over: number;
}

export interface BoundaryPayload {
  runs: number;
  commentary: string;
  batsman: string;
  bowler: string;
  over: number;
}

export interface WicketPayload {
  playerOut: string;
  dismissal: DismissalType;
  commentary: string;
  batsman: string;
  bowler: string;
  over: number;
}

export interface MatchStatusPayload {
  status: MatchStatus;
  summary: string;
}

export interface OverCompletePayload {
  over: number;
  runs: number;
  commentary: string;
}

export interface CricketEvent {
  id: string;
  type: EventType;
  payload:
    | BallPayload
    | BoundaryPayload
    | WicketPayload
    | MatchStatusPayload
    | OverCompletePayload;
}
