// ACTIONS
const PENDING = "task-management/fetch-task/PENDING";
const SUCCESS = "task-management/fetch-task/SUCCESS";
const ERROR = "task-management/fetch-task/ERROR";

// REDUCERS

let initialState = {
  isPending: false,
  tasks: [],
  error: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case PENDING:
      return { ...state, isPending: payload };
    case SUCCESS:
      console.log({ ...state, tasks: payload });
      return { ...state, tasks: payload };
    case ERROR:
      return { ...state, error: payload, tasks: [] };
    default:
      return state;
  }
}

// ACTION CREATORS

function fetchTasksPending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function fetchTasksSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function fetchTasksError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function fetchTasks(url) {
  console.log("fetch tasks");

  return (dispatch) => {
    dispatch(fetchTasksPending(true));

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "<<<< fetch tasks");
        dispatch(fetchTasksSuccess(data));
      })
      .catch((err) => {
        console.log(err, "<< error fetchTasks");
        dispatch(fetchTasksError(err));
      })
      .finally(() => {
        dispatch(fetchTasksPending(false));
      });
  };
}
