import { useReducer } from "react";

import { END_POINTS } from "constants/api";
import buildBffUrl from "utils/buildBffUrl";

import type { Body, State, Action } from "./types";

function reducer(state: State, action: Action): State {
  if (action.type === "START") {
    return {
      isLoading: true,
      err: null,
      created: undefined,
    };
  }

  if (action.type === "DONE") {
    return {
      isLoading: false,
      err: null,
      created: true,
    };
  }

  if (action.type === "ERROR") {
    return {
      isLoading: false,
      err: action.err,
      created: false,
    };
  }

  return state;
}

function useSaveReview(): [State, (body: Body) => Promise<void>] {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: undefined,
    err: undefined,
    created: undefined,
  });

  const save = async (body: Body) => {
    dispatch({ type: "START" });

    try {
      const url = buildBffUrl(END_POINTS.REVIEW);

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.status === 201) {
        return dispatch({ type: "DONE" });
      }

      const responseBody = await response.json();

      dispatch({ type: "ERROR", err: responseBody });
    } catch (err) {
      dispatch({ type: "ERROR", err });
    }
  };

  return [state, save];
}

export default useSaveReview;
