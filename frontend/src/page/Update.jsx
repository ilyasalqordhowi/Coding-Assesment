import React, { useState, useEffect } from "react";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Loading from "../assets/img/loading.gif";

export function Update() {
  const url = `http://103.93.58.89:24243`;
  let { id } = useParams();
  const [dataStatus, setStatus] = useState([]);
  const [taskId, setDataTask] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function DataTask() {
      const response = await fetch(`${url}/task/get/${id}`, {
        method: "GET",
      });
      const taskData = await response.json();
      if (taskData.success) {
        setDataTask(taskData.resultsInfo);
      } else {
        console.error("Error fetching tasks");
      }
    }
    DataTask();
  }, [id]);

  useEffect(() => {
    async function DataStatus() {
      const response = await fetch(`${url}/task/get/status`, {
        method: "GET",
      });
      const taskData = await response.json();
      setStatus(taskData.resultsInfo);
    }
    DataStatus();
  }, []);

  async function updateTask(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const title = e.target.title.value;
    const descriptions = e.target.descriptions.value;
    const date = e.target.date.value;
    const status = parseInt(e.target.status.value);

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("date", date);
    formData.append("statusId", status);
    const dataTask = await fetch(`${url}/task/put/${id}`, {
      method: "PUT",
      body: formData,
    });
    const json = await dataTask.json();
    if (json.success) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-blue-950 min-h-screen flex justify-center items-center p-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-full max-w-md gap-4 bg-white p-5 rounded-lg shadow-md">
            <Link to={"/"}>
              <button className="flex hover:text-red-500 items-center text-xl gap-2">
                <FaPersonWalkingArrowLoopLeft />
                <h2>Exit</h2>
              </button>
            </Link>
            <h1 className="text-3xl md:text-4xl text-center">Update Task</h1>
            <form onSubmit={updateTask} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input
                  className="p-4 border rounded-2xl"
                  defaultValue={taskId.title}
                  name="title"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="descriptions">Descriptions</label>
                <textarea
                  name="descriptions"
                  id="descriptions"
                  defaultValue={taskId.descriptions}
                  className="h-[100px] border px-4 py-3 rounded-2xl"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={taskId.date}
                  className="border p-4 rounded-2xl"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  className="p-4 rounded-2xl border"
                >
                  <option value="">Select status</option>
                  {dataStatus.map((item) => (
                    <option
                      value={item.id}
                      selected={item.id === taskId.statusId}
                      key={item.id}
                    >
                      {item.status}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-400 p-3 rounded-xl text-lg"
              >
                Save Task
              </button>
            </form>
          </div>
        </div>
        {loading && (
          <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
            <div className="bg-[#AED2FF] flex items-center gap-4 rounded-md p-4">
              <img className="w-24" src={Loading} alt="Loading" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
