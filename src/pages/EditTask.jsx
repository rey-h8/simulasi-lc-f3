import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTask } from "../store/features/tasks/editTask";
//location.state.task
export default function EditTask(props) {
  console.log(props, "<<< props edit task");
  const history = useHistory();
  const location = useLocation();
  const { task } = location.state;

  const dispatch = useDispatch();

  const [titleError, setTitleError] = useState(null);
  const [form, setForm] = useState({
    id: task.id,
    title: task.title,
    category: task.category,
  });

  function handleFormInput(e) {
    console.log({ ...form, [e.target.name]: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.target.title.value) {
      return setTitleError("Title is required");
    }

    dispatch(editTask(form));
    history.push("/");
  }

  function handleCancel() {
    document.getElementById("form").reset();

    history.push("/");
  }

  return (
    <div className="container">
      <h1>Edit Task</h1>
      {titleError && (
        <h1 style={{ color: "red", border: "5px solid red" }}>{titleError}</h1>
      )}
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          onChange={handleFormInput}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          onChange={handleFormInput}
          defaultValue={task.category}
        >
          <option value="">--Select category--</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Mobile">Mobile</option>
        </select>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
