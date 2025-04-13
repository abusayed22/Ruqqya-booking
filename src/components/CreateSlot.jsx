"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Dropdown from "./child/Dropdown";
import {
  createTimeSlot,
  fetchTimeSlot,
} from "@/lib/admin/actions/createTimeSlot";
import { toast, ToastContainer } from "react-toastify";

const CreateSlot = () => {
  // const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [existTimslots, setExistTimeslots] = useState([]);

  

  useEffect(() => {
    const fetchAllTimeslots = async () => {
      const data = await fetchTimeSlot(selectedCategory);
      setExistTimeslots(data.timeSlots);
    };
    fetchAllTimeslots();
  }, [selectedCategory]);

  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    if (existTimslots.some((slot) => slot.time === time)) {
      setError("This time slot is already taken. Please select another time.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    const errors = {};
    if (!selectedCategory) errors.category = "Category is required";
  
    if (!selectedTime) {
      errors.time = "Time is required";
    } else if (existTimslots.some(slot => slot.time === selectedTime)) {
      errors.time = "This time slot is already taken. Please select another time.";
    }
    setFormErrors(errors);
    setFormValid(Object.keys(errors).length === 0);
  }, [selectedCategory, selectedTime, existTimslots]); 

  const handleSelectCategory = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  const timeslotCreateHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const formObj = {
      selectedCategory,
      selectedTime,
    };
    try {
      const submit = await createTimeSlot(formObj);
      if (submit.success) {
        toast.success(submit.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error || "crete timeSlot someting worng!");
    } finally {
      setSubmitLoading(false);
      setSelectedTime("");
      setSelectedCategory("");
    }
  };


  return (
    <div className="card">
      <ToastContainer />
      <div className="row gy-3 d-flex justify-content-center">
        <div className="col-lg-6">
          <h6 className="text-md text-neutral-500 text-center py-3 mt-3">
            Create Time Slot for every day
          </h6>
          <div className="px-3 py-3">
            <div>
              <Dropdown
                label="Category"
                value={["ruqyya", "hizama"]}
                onSelect={handleSelectCategory} // Pass the handler function as a prop
              />
            </div>
            <div className="mt-3">
              <label className="form-label">Time*</label>
              <div className="w-100">
                <input
                  type="time"
                  id="time-picker"
                  name="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className={`custom-time-input ${error && "border-danger"}`}
                />
                {/* {error && <p className="error-message">{error}</p>} */}
                {error && (
                  <div className="wizard-form-error text-danger">{error}</div>
                )}
              </div>
            </div>
            <div className="form-group d-flex align-items-center justify-content-center gap-8 mt-3">
              <button
                onClick={timeslotCreateHandler}
                disabled={!formValid || submitLoading}
                type="button"
                className="form-wizard-next-btn btn btn-primary-600 px-32"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSlot;
