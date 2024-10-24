import React, { useState, useEffect } from "react";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../assets/img/loading.gif";

export function Create() {
  const url = `http://103.93.58.89:24243`;
  const [dataStatus, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function DataStatus() {
      const response = await fetch(`${url}/task/get/status`, {
        method: "GET",
      });
      const taskData = await response.json();
      console.log(taskData);
      setStatus(taskData.resultsInfo);
    }
    DataStatus();
  }, []);

  const formik = useFormik({
    onSubmit: createTask,
    initialValues: {
      title: "",
      descriptions: "",
      date: "",
      status: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Required!"),
      descriptions: Yup.string().required("Required!"),
      date: Yup.date().required("Required!"),
      status: Yup.string().required("Required!"),
    }),
  });

  async function createTask() {
    const { title, descriptions, date, status } = formik.values;

    console.log(title);
    console.log(descriptions);
    console.log(date);
    console.log(status);

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("date", date);
    formData.append("statusId", parseInt(status));

    const dataTask = await fetch(`${url}/task/create`, {
      method: "POST",
      body: formData,
    });
    const json = await dataTask.json();
    console.log(json);
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
            <h1 className="text-3xl md:text-4xl text-center">Create Task</h1>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title of the task"
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className="font-bold text-red-700">
                    {formik.errors.title}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="descriptions">Descriptions</label>
                <textarea
                  name="descriptions"
                  id="descriptions"
                  placeholder="Descriptions of the task"
                  className="h-[100px] border px-4 py-3 rounded-2xl"
                  onChange={formik.handleChange}
                ></textarea>
                {formik.errors.descriptions && formik.touched.descriptions && (
                  <p className="font-bold text-red-700">
                    {formik.errors.descriptions}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="border p-4 rounded-2xl"
                  onChange={formik.handleChange}
                />
                {formik.errors.date && formik.touched.date && (
                  <p className="font-bold text-red-700">{formik.errors.date}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  className="p-4 rounded-2xl border"
                  onChange={formik.handleChange}
                >
                  <option value="">Select status</option>
                  {dataStatus.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.status}
                    </option>
                  ))}
                </select>
                {formik.errors.status && formik.touched.status && (
                  <p className="font-bold text-red-700">
                    {formik.errors.status}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-400 p-3 rounded-xl text-lg"
              >
                Add Task
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
