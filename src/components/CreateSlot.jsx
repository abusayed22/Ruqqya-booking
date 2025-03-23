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

const CreateSlot = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const formatedDate = () => {
    return selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const takenTimes = ["09:00", "13:00", "15:30"];
  const handleTimeChange = (event) => {
    const time = event.target.value;
    setSelectedTime(time);

    // Check if the selected time is already taken
    if (takenTimes.includes(time)) {
      setError("This time slot is already taken. Please select another time.");
    } else {
      setError("");
    }
  };

  //
  //   useEffect(() => {
  //     const errors = {};

  //     if (!selectedCategory) errors.category = "Category is required";
  //     if (!selectedDate) errors.date = "Date is required";
  //     if (!name.trim()) errors.name = "Name is required";
  //     if (!phone.trim()) errors.phone = "Phone is required";
  //     if (!address.trim()) errors.address = "Address is required";

  //     setFormErrors(errors);
  //     setFormValid(Object.keys(errors).length === 0);
  //   }, [selectedCategory, selectedDate, name, phone, address]);

  //   useEffect(() => {
  //     if (!time) {
  //       setFormValid2(false);
  //     } else {
  //       setFormValid2(true);
  //     }
  //   }, [time]);

  //   useEffect(() => {
  //     if (!problem) {
  //       setFormValid3(false);
  //     } else {
  //       setFormValid3(true);
  //     }
  //   }, [problem]);

  const handleSelectCategory = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  return (
    <div className="card">
      <div className="row gy-3 d-flex justify-content-center">
        <div className="col-lg-6">
          <h6 className="text-md text-neutral-500 text-center py-3 mt-3">
            Create Time Slot for every day
          </h6>
          <div className="px-3 py-3">
            <div>
              <Dropdown
                label="Category"
                value={["ruqayya", "hizama"]}
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
                {error && <div className="wizard-form-error text-danger">{error}</div>}
              </div>
            </div>
            <div className="form-group d-flex align-items-center justify-content-center gap-8 mt-3">
          <button
            // onClick={nextHandler}
            // disabled={!formValid}
            type="button"
            className="form-wizard-next-btn btn btn-primary-600 px-32"
          >
            Next
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSlot;
