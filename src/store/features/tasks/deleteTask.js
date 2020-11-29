import { fetchTasks } from "./fetchTasks";

// ACTIONS
const PENDING = "task-management/delete-task/PENDING";
const SUCCESS = "task-management/delete-task/SUCCESS";
const ERROR = "task-management/delete-task/ERROR";

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
      return state;
    case ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

// ACTION CREATORS

function deleteTaskPending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function deleteTaskSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function deleteTaskError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function deleteTask(payload) {
  console.log("delete task", payload);
  return (dispatch, getState) => {
    dispatch(deleteTaskPending(true));

    fetch(`http://localhost:5000/tasks/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "berhasil delete");
        console.log(fetchTasks);
        dispatch(fetchTasks());
      })
      .catch((err) => {
        console.log(err, "<< error deleteTask");
        dispatch(deleteTaskError(err));
      })
      .finally(() => {
        dispatch(deleteTaskPending(false));
      });
  };
}
