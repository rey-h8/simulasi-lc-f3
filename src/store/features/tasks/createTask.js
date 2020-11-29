// ACTIONS
const PENDING = "task-management/create-task/PENDING";
const SUCCESS = "task-management/create-task/SUCCESS";
const ERROR = "task-management/create-task/ERROR";

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

function createTaskPending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function createTaskSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function createTaskError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function createTask(payload) {
  console.log("create task", payload);
  return (dispatch, getState) => {
    dispatch(createTaskPending(true));

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // // console.log(getState());
        // let newTask = getState().createTask.tasks.concat(data);
        // console.log(newTask, "<<<< create tasks");
        // dispatch(createTaskSuccess(newTask));
      })
      .catch((err) => {
        console.log(err, "<< error createTask");
        dispatch(createTaskError(err));
      })
      .finally(() => {
        dispatch(createTaskPending(false));
      });
  };
}
