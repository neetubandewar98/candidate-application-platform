import { combineReducers } from "redux";
import {
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  LOAD_MORE_JOBS_SUCCESS,
} from "./actions";

const initialState = {
  jobs: [],
  error: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs: [...action.payload], 
        error: null,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        jobs: [],
        error: action.payload,
      };
    case LOAD_MORE_JOBS_SUCCESS:
      return {
        ...state,
        jobs: [...state.jobs, ...action.payload], // Assuming payload is an array of jobs
        error: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  jobs: jobsReducer,
});

export default rootReducer;
