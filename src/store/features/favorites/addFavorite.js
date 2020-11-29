import { fetchFavorites } from "./fetchFavorites";

// ACTIONS
const PENDING = "task-management/add-favorite/PENDING";
const SUCCESS = "task-management/add-favorite/SUCCESS";
const ERROR = "task-management/add-favorite/ERROR";

// REDUCERS
let initialState = {
  isPending: false,
  favorites: [],
  error: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case PENDING:
      return { ...state, isPending: payload };
    case SUCCESS:
      return { ...state, favorites: payload };
    case ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

// ACTION CREATORS

function addFavoritePending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function addFavoriteSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function addFavoriteError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function addFavorite(payload) {
  console.log("add favorite", payload);
  return (dispatch, getState) => {
    dispatch(addFavoritePending(true));

    fetch("http://localhost:5000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newFavorites = getState().addFavorite.favorites.concat(data);
        dispatch(addFavoriteSuccess(newFavorites));
        dispatch(fetchFavorites());
      })
      .catch((err) => {
        console.log(err, "<< error addFavorite");
        dispatch(addFavoriteError(err));
      })
      .finally(() => {
        dispatch(addFavoritePending(false));
      });
  };
}
