import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/features/tasks/fetchTasks";
import { deleteTask } from "../store/features/tasks/deleteTask";
import { fetchFavorites } from "../store/features/favorites/fetchFavorites";
import { addFavorite } from "../store/features/favorites/addFavorite";
import { deleteFavorite } from "../store/features/favorites/deleteFavorite";

export default function Home() {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.fetchTasks);
  const { favorites } = useSelector((state) => state.fetchFavorites);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTasks("http://localhost:5000/tasks"));
    dispatch(fetchFavorites());
  }, []);

  function handleDelete(id) {
    console.log(id, "<<< delete");
    dispatch(deleteTask(id));
  }

  function handleFilter(e) {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "All") {
      dispatch(fetchTasks("http://localhost:5000/tasks"));
    } else {
      dispatch(
        fetchTasks(`http://localhost:5000/tasks?category=${e.target.value}`)
      );
    }
  }

  function isFavorited(id) {
    let result;

    favorites.forEach((fav) => {
      if (+fav.taskId === +id) {
        result = fav.id;
      }
    });

    return result;
  }

  function handleFavorite(id) {
    let favId = isFavorited(id);

    if (favId) {
      dispatch(deleteFavorite(favId));
    } else {
      dispatch(addFavorite({ taskId: id }));
    }
  }

  return (
    <div className="container">
      <select name="category" onChange={handleFilter}>
        <option values="All">All</option>
        <option values="Backend">Backend</option>
        <option values="Frontend">Frontend</option>
        <option values="Mobile">Mobile</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 &&
            tasks.map((task, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{task.title}</td>
                <td>{task.category}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/edit-task/${task.id}`,
                      state: { task },
                    }}
                  >
                    <button>Edit</button>
                  </Link>

                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                  <button
                    style={{
                      background: isFavorited(task.id) ? "red" : "blue",
                      color: "white",
                    }}
                    onClick={() => handleFavorite(task.id)}
                  >
                    Favorite
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
