export const FETCH_JOBS_SUCCESS = "FETCH_JOBS_SUCCESS";
export const FETCH_JOBS_FAILURE = "FETCH_JOBS_FAILURE";
export const LOAD_MORE_JOBS_SUCCESS = "LOAD_MORE_JOBS_SUCCESS";

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

export const loadMoreJobsSuccess = (jobs) => ({
  type: LOAD_MORE_JOBS_SUCCESS,
  payload: jobs,
});
