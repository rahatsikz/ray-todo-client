import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaEdit, FaTimes } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast } from "react-hot-toast";

const TodoCard = ({ todo }) => {
  const { title, _id, description, dueDate } = todo;
  const [startDate, setStartDate] = useState(new Date());

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    axios
      .patch(`https://hellwet-server.vercel.app/todo/${_id}`, {
        title,
        description,
        dueDate: startDate,
      })
      .then(
        (response) => {
          console.log(response);
          toast.success("Updated successfully");
          form.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handleDelete = () => {
    const proceed = window.confirm("Are you sure that you want to delete");

    if (proceed) {
      // console.log(_id);
      axios.delete(`https://hellwet-server.vercel.app/delete/${_id}`).then(
        (response) => {
          console.log(response);
          toast.success("Deleted successfully");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const handleDone = () => {
    const proceed = window.confirm("Press okay if you completed the task");
    if (proceed) {
      axios.patch(`https://hellwet-server.vercel.app/done/${_id}`).then(
        (response) => {
          console.log(response);
          toast.success("Congratulation for completing");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div>
      <div className="lg:w-1/3 w-9/12 mx-auto rounded-lg px-5 py-8 text-center shadow-lg mt-4">
        <div className="flex items-center justify-center gap-4">
          <p> {title} </p>
          <label htmlFor={_id} className="btn btn-sm btn-ghost">
            <BsArrowRight />
          </label>
        </div>
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={handleDone}
            className="btn btn-circle btn-outline text-xl btn-sm"
          >
            <TiTick />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-circle btn-outline text-xl btn-sm"
          >
            <FaTimes />
          </button>
          <label
            htmlFor={title}
            className="btn btn-circle btn-outline text-xl btn-sm mr-4"
          >
            <FaEdit />
          </label>
        </div>
      </div>
      <input type="checkbox" id={_id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={_id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-semibold">
            Due date:{" "}
            <span className="text-[#2879E1]">
              {moment(dueDate).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </h3>
          <p className="py-4">{description}</p>
        </div>
      </div>
      <input type="checkbox" id={title} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={handleEdit} className="rounded-lg px-4 py-2">
            <div className="grid gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  defaultValue={title}
                  className="input focus:border-0 input-bordered w-full"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Old Due Date</span>
                </label>
                <div className="input focus:border-0 input-bordered w-full pt-2">
                  {moment(dueDate).format("MMMM Do YYYY, h:mm:ss a")}
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">New Due Date</span>
                </label>
                <div className="input focus:border-0 input-bordered w-full pt-2">
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    dateFormat="Pp"
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered focus:border-0 w-full mb-4"
                placeholder="Description"
                defaultValue={description}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#2879E1] border-0 text-white rounded-xl"
              >
                <label htmlFor={title} className="btn">
                  Update
                </label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
