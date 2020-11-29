import { combineReducers } from "redux";
import fetchTasks from "../features/tasks/fetchTasks";
import fetchFavorites from "../features/favorites/fetchFavorites";
import addFavorite from "../features/favorites/addFavorite";
import createTask from "../features/tasks/createTask";
import deleteTask from "../features/tasks/deleteTask";

const rootReducer = combineReducers({
  fetchTasks,
  createTask,
  deleteTask,
  fetchFavorites,
  addFavorite,
});

export default rootReducer;
