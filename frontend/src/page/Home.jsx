import React, { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Home() {
  const url = `http://103.93.58.89:24243`;
  const [task, setDataTask] = useState([]);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    async function DataTask() {
      const response = await fetch(`${url}/task/get`, {
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
  }, []);

  useEffect(() => {
    async function DataStatus() {
      const response = await fetch(`${url}/task/get/status`, {
        method: "GET",
      });
      const statusData = await response.json();
      if (statusData.success) {
        setStatusList(statusData.resultsInfo);
      } else {
        console.error("Error fetching status");
      }
    }
    DataStatus();
  }, []);

  function getStatusName(statusId) {
    const statusItem = statusList.find((status) => status.id === statusId);
    return statusItem ? statusItem.status : "Unknown";
  }

  async function RemoveTask(id) {
    const response = await fetch(`${url}/task/delete/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setDataTask((prevTasks) => prevTasks.filter((item) => item.id !== id));
    } else {
      console.error("Error deleting task");
    }
  }

  return (
    <>
      <div className="bg-blue-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col p-4 md:p-16 gap-10 max-w-4xl w-full">
          <h1 className="text-blue-500 font-bold text-3xl md:text-5xl text-center">
            Todo List
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex text-2xl md:text-3xl text-blue-700 items-center gap-3">
                <h2 className="bg-white rounded-full h-10 flex items-center justify-center p-5">
                  {task.length}
                </h2>
                <h3>Tasks</h3>
              </div>
              <div className="flex justify-center">
                <Link to={"/create"}>
                  <button className="bg-blue-600 w-12 md:w-20 rounded-full text-2xl md:text-4xl font-bold p-2">
                    +
                  </button>
                </Link>
              </div>
            </div>
            <hr />
            <ol className="flex justify-between text-slate-400">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <li key={index} className="hover:text-white">
                    {day}
                  </li>
                )
              )}
            </ol>
            {task.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row bg-yellow-300 items-start md:items-center justify-between p-5 rounded-xl"
              >
                <div className="flex gap-3 flex-col">
                  <h1 className="text-xl md:text-2xl">{item.title}</h1>
                  <p className="text-sm md:text-base">{item.descriptions}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3">
                  <h2 className="text-sm md:text-base">{item.date}</h2>
                  <h3 className="bg-blue-500 p-2 rounded-xl text-sm md:text-base">
                    {getStatusName(item.statusId)}
                  </h3>
                  <div className="flex justify-between w-full mt-2">
                    <Link to={`/update/${item.id}`}>
                      <FaPenToSquare className="cursor-pointer" />
                    </Link>
                    <button onClick={() => RemoveTask(item.id)}>
                      <FaTrash className="text-red-600 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
