import { fetchTasks } from "./fetchTasks";

// ACTIONS
const PENDING = "task-management/edit-task/PENDING";
const SUCCESS = "task-management/edit-task/SUCCESS";
const ERROR = "task-management/edit-task/ERROR";

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
      return { ...state, tasks: payload };
    case ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

// ACTION CREATORS

function editTaskPending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function editTaskSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function editTaskError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function editTask(payload) {
  console.log("edit task", payload);
  return (dispatch, getState) => {
    dispatch(editTaskPending(true));

    fetch(`http://localhost:5000/tasks/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(getState());
        // let newTask = getState().editTask.tasks.concat(data);
        // console.log(newTask, "<<<< create tasks");
        // dispatch(editTaskSuccess(newTask));
        dispatch(fetchTasks("http://localhost:5000/tasks"));
      })
      .catch((err) => {
        console.log(err, "<< error editTask");
        dispatch(editTaskError(err));
      })
      .finally(() => {
        dispatch(editTaskPending(false));
      });
  };
}
