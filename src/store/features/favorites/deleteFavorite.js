import { fetchFavorites } from "./fetchFavorites";

// ACTIONS
const PENDING = "favorite-management/delete-favorite/PENDING";
const SUCCESS = "favorite-management/delete-favorite/SUCCESS";
const ERROR = "favorite-management/delete-favorite/ERROR";

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
      return state;
    case ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}

// ACTION CREATORS

function deleteFavoritePending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function deleteFavoriteSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function deleteFavoriteError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function deleteFavorite(payload) {
  console.log("delete favorite", payload);
  return (dispatch, getState) => {
    dispatch(deleteFavoritePending(true));

    fetch(`http://localhost:5000/favorites/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "berhasil delete");
        dispatch(fetchFavorites());
      })
      .catch((err) => {
        console.log(err, "<< error deleteFavorite");
        dispatch(deleteFavoriteError(err));
      })
      .finally(() => {
        dispatch(deleteFavoritePending(false));
      });
  };
}
