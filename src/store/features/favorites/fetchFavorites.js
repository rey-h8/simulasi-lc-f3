// ACTIONS
const PENDING = "task-management/fetch-favorites/PENDING";
const SUCCESS = "task-management/fetch-favorites/SUCCESS";
const ERROR = "task-management/fetch-favorites/ERROR";

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
      console.log({ ...state, favorites: payload });
      return { ...state, favorites: payload };
    case ERROR:
      return { ...state, error: payload, favorites: [] };
    default:
      return state;
  }
}

// ACTION CREATORS

function fetchFavoritesPending(payload) {
  return {
    type: PENDING,
    payload,
  };
}
function fetchFavoritesSuccess(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}
function fetchFavoritesError(payload) {
  return {
    type: ERROR,
    payload,
  };
}

export function fetchFavorites() {
  console.log("fetch favorites");

  return (dispatch) => {
    dispatch(fetchFavoritesPending(true));

    fetch("http://localhost:5000/favorites")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "<<<< fetch favorites");
        dispatch(fetchFavoritesSuccess(data));
      })
      .catch((err) => {
        console.log(err, "<< error fetchFavorites");
        dispatch(fetchFavoritesError(err));
      })
      .finally(() => {
        dispatch(fetchFavoritesPending(false));
      });
  };
}
