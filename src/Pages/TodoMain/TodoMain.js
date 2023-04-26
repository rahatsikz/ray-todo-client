import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TodoMain.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useEffect } from "react";
import TodoCard from "./TodoCard";

const TodoMain = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  // const [value, onChange] = useState(new Date());
  const handleAddTodo = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    // console.log(title, startDate, description);
    axios
      .post("http://localhost:5000/addtodo", {
        title,
        description,
        dueDate: startDate,
        email: user?.email,
      })
      .then(
        (response) => {
          console.log(response);
          toast.success("Task has been added successfully");
          form.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetch(`http://localhost:5000/todo?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [user?.email, todos]);
  return (
    <div className="container mx-auto my-12">
      <div>
        <h3 className="text-center font-bold text-xl my-8">
          Welcome {user?.displayName}
        </h3>
        {todos.length > 0 ? (
          <h4 className="text-center text-lg font-medium">
            Here is your Todo List
          </h4>
        ) : (
          <h4 className="text-center text-lg font-medium">
            No Todo's Found. Please Add some
          </h4>
        )}
      </div>
      <div>
        {todos.map((todo) => (
          <TodoCard key={todo._id} todo={todo}></TodoCard>
        ))}
      </div>
      <div>
        <h4 className="text-center text-lg font-medium mt-8">Add New Task</h4>
      </div>
      <form
        onSubmit={handleAddTodo}
        className="bg-gray-100 mt-8 p-8 rounded-lg"
      >
        <div className="grid grid-cols-2 gap-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input focus:border-0 input-bordered w-full"
            required
          />

          <div className="input focus:border-0 input-bordered w-full pt-2">
            <DatePicker
              selected={startDate}
              showTimeSelect
              dateFormat="Pp"
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <textarea
          name="description"
          className="textarea textarea-bordered focus:border-0 w-full my-4"
          placeholder="Description"
          required
        ></textarea>
        <button
          type="submit"
          className="btn btn-block bg-[#17A9EA] border-0 text-white"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TodoMain;
