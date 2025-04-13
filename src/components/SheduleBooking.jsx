"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./child/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from "@iconify/react";
import { createBooking } from "@/lib/user/booking";
import { es } from "date-fns/locale";
import { checkDateTime } from "@/lib/user/actions/checkDateTime";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const SheduleBooking = ({ user }) => {
  const [wizard, setWizard] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [problem, setProblem] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [formValid2, setFormValid2] = useState(false);
  const [formValid3, setFormValid3] = useState(false);
  const [availableSlot, setAvailableSlot] = useState([]);

  const router = useRouter();

  const handleSelectCategory = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  const nextHandler = () => {
    setWizard((prev) => prev + 1);
  };

  const prevHandler = () => {
    setWizard((prev) => prev - 1);
  };

  const formatedDate = () => {
    return selectedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchingCheckData = async () => {
      const fetchData = await checkDateTime(selectedCategory, selectedDate);
      setAvailableSlot(fetchData);
    };
    fetchingCheckData();
  }, [selectedCategory, selectedDate]);

  useEffect(() => {
    const errors = {};
    if (!selectedCategory) errors.category = "Category is required";
    if (!selectedDate) errors.date = "Date is required";
    if (!name.trim()) errors.name = "Name is required";
    if (!phone.trim()) errors.phone = "Phone is required";
    if (!address.trim()) errors.address = "Address is required";
    setFormErrors(errors);
    setFormValid(Object.keys(errors).length === 0);
  }, [selectedCategory, selectedDate, name, phone, address]);

  useEffect(() => {
    if (!time) {
      setFormValid2(false);
    } else {
      setFormValid2(true);
    }
  }, [time]);

  useEffect(() => {
    if (!problem) {
      setFormValid3(false);
    } else {
      setFormValid3(true);
    }
  }, [problem]);

  const bookingHandler = async (e) => {
    e.preventDefault();
    const formObj = {
      selectedCategory,
      selectedDate,
      name,
      phone,
      address,
      time,
      problem,
    };

    try {
      const submit = await createBooking(formObj);
      if (submit.success) {
        toast.success(submit.message);
        router.push("/bookingstatus")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row py-4">
      <ToastContainer />
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 text-xl">Shedule Booking</h6>
          <p className="text-neutral-500">
            Fill up your details and proceed next steps.
          </p>

          <div className="form-wizard">
            <form>
              <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                <ul className="list-unstyled form-wizard-list">
                  <li
                    className={`form-wizard-list__item ${
                      wizard === 1 && "active"
                    }`}
                  >
                    <div className="form-wizard-list__line">
                      <span className="count">1</span>
                    </div>
                  </li>
                  <li
                    className={`form-wizard-list__item ${
                      wizard === 2 && "active"
                    }`}
                  >
                    <div className="form-wizard-list__line">
                      <span className="count">2</span>
                    </div>
                  </li>
                  <li
                    className={`form-wizard-list__item ${
                      wizard === 3 && "active"
                    }`}
                  >
                    <div className="form-wizard-list__line ">
                      <span className="count">3</span>
                    </div>
                  </li>
                  <li
                    className={`form-wizard-list__item ${
                      wizard === 4 && "active"
                    }`}
                  >
                    <div className="form-wizard-list__line ">
                      <span className="count">4</span>
                    </div>
                  </li>
                </ul>
              </div>
              {wizard === 1 && (
                <fieldset
                  className={`wizard-fieldset ${wizard === 1 && "show"}`}
                >
                  <h6 className="text-md text-neutral-500 text-center">
                    Booking Details
                  </h6>
                  <div className="row gy-3 d-flex justify-content-center">
                    <div className="col-lg-6">
                      <div>
                        <div>
                          <Dropdown
                            label="Category"
                            value={["ruqyya", "hizama"]}
                            onSelect={handleSelectCategory} // Pass the handler function as a prop
                          />
                        </div>
                        <div className="mt-3">
                          <label className="form-label">Date*</label>
                          <br />
                          <div className="w-100">
                            <DatePicker
                              locale={es}
                              className="btn text-primary-600 hover-text-primary px-18 py-11 dropdown-toggle toggle-icon show border w-100 "
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                            />
                          </div>
                        </div>
                        <div className="position-relative mt-3">
                          <label className="form-label"> Name*</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control wizard-required text-capitalize"
                            placeholder="Enter Name"
                            required=""
                          />
                          <div className="wizard-form-error"></div>
                        </div>
                        <div>
                          <div className="position-relative mt-3">
                            <label className="form-label">Phone*</label>
                            <input
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control wizard-required"
                              placeholder="+11 01 911"
                              required=""
                            />
                            <div className="wizard-form-error"></div>
                          </div>
                        </div>
                        <div>
                          <div className="position-relative mt-3 text-capitalize">
                            <label className="form-label">Address*</label>
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="form-control wizard-required"
                              placeholder="Enter Branch Name"
                              required=""
                            />
                            <div className="wizard-form-error">
                              {formErrors.address && formErrors.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                      <button
                        onClick={nextHandler}
                        disabled={!formValid}
                        type="button"
                        className="form-wizard-next-btn btn btn-primary-600 px-32"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </fieldset>
              )}

              {wizard === 2 && (
                <fieldset
                  className={`wizard-fieldset ${wizard === 2 && "show"}`}
                >
                  <div className="d-flex flex-column align-items-center">
                    <h6 className="text-lg text-neutral-500">
                      {formatedDate()}
                    </h6>
                    <p>
                      Available time slots for Ankle Arthroscopy by Laura White.
                    </p>
                  </div>
                  <div className="row gy-3">
                    <div className="border rounded p-3 d-flex flex-column gap-3">
                      <div className="d-flex flex-column gap-28">
                        {availableSlot.length > 0 ? (
                          availableSlot.map((item, index) => (
                            <div
                              key={item}
                              className={`form-check ${
                                time === item.time && "checked-primary"
                              } d-flex align-items-center gap-2`}
                            >
                              <input
                                onClick={() => setTime(item.time)}
                                className="form-check-input"
                                type="radio"
                                name="horizontal"
                                id={`horizontal${index}`}
                              />
                              <label
                                className="form-check-label line-height-1 fw-medium"
                                htmlFor={`horizontal${index}`}
                              >
                                {item.time}
                              </label>
                            </div>
                          ))
                        ) : (
                          <div className="no-available-time">
                            No available time schedule {formatedDate()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                      <button
                        onClick={prevHandler}
                        type="button"
                        className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                      >
                        Back
                      </button>
                      <button
                        onClick={nextHandler}
                        disabled={!formValid2}
                        type="button"
                        className="form-wizard-next-btn btn btn-primary-600 px-32"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </fieldset>
              )}

              {wizard === 3 && (
                <fieldset
                  className={`wizard-fieldset ${wizard === 3 && "show"}`}
                >
                  <h6 className="text-md text-neutral-500 text-center">
                    Patient Issue
                  </h6>
                  <div className="row gy-3 d-flex justify-content-center">
                    <div className="col-lg-6">
                      <div>
                        <div className="position-relative ">
                          <label className="form-label"> Problem*</label>
                          <textarea
                            name="#0"
                            className="form-control w-100 text-capitalize"
                            rows="4"
                            cols="50"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="The istikhara salat is an essential prayer and deeply anchored in the Islamic tradition. It offers believers a unique spiritual method for seeking divine guidance in complex or undecided situations."
                          ></textarea>

                          <div className="wizard-form-error"></div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                      <button
                        onClick={prevHandler}
                        type="button"
                        className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                      >
                        Back
                      </button>
                      <button
                        onClick={nextHandler}
                        disabled={!formValid3}
                        type="button"
                        className="form-wizard-next-btn btn btn-primary-600 px-32"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </fieldset>
              )}

              {wizard === 4 && (
                <fieldset
                  className={`wizard-fieldset ${wizard === 4 && "show"}`}
                >
                  <h6 className="text-md text-neutral-500">Booking Info</h6>
                  <div className="row gy-3">
                    <div className="col-sm-6 mt-24">
                      <ul>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            Category
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {selectedCategory}
                          </span>
                        </li>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            Date
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {formatedDate()}
                          </span>
                        </li>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            Shedule
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {time}
                          </span>
                        </li>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            Name
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {name}
                          </span>
                        </li>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            {" "}
                            Address
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {address}
                          </span>
                        </li>
                        <li className="d-flex align-items-center gap-1 mb-12">
                          <span className="w-30 text-md fw-semibold text-primary-light">
                            {" "}
                            Phone Number
                          </span>
                          <span className="w-70 text-secondary-light fw-medium text-capitalize">
                            : {phone}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <div className="position-relative ">
                          <label className="form-label"> Problem*</label>
                          <p className="  problem-text rounded">{problem}</p>

                          <div className="wizard-form-error"></div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                      <button
                        onClick={prevHandler}
                        type="button"
                        className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                      >
                        Back
                      </button>
                      <button
                        onClick={bookingHandler}
                        type="button"
                        className="form-wizard-next-btn btn btn-primary-600 px-32"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </fieldset>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheduleBooking;
