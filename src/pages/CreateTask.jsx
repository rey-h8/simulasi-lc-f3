import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTask } from "../store/features/tasks/createTask";

export default function CreateTask() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [titleError, setTitleError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
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

    dispatch(createTask(form));
    history.push("/");
  }

  function handleCancel() {
    document.getElementById("form").reset();

    history.push("/");
  }
  return (
    <div className="container">
      <h1>Create Task</h1>
      {titleError && (
        <h1 style={{ color: "red", border: "5px solid red" }}>{titleError}</h1>
      )}
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleFormInput} />

        <label htmlFor="category">Category</label>
        <select name="category" onChange={handleFormInput}>
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
