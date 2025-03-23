"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";

const ViewCustomer = () => {
  const profileInfo = {
    name: "Sayed",
    email: "sayed@gmail.com",
    password: "1234",
    profileImg: "/assets/images/user-grid/user-grid-img13.png",
    phone: "01918181814",
    address: "Mughda, Dhaka",
  };

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/user-grid/user-grid-img13.png"
  );

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };

  return (
    <div>
      <div className="row gy-4">
        <div className="col-lg-4">
          <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
            <img
              src="/assets/images/user-grid/user-grid-bg1.png"
              alt=""
              className="w-100 object-fit-cover"
            />
            <div className="pb-24 ms-16 mb-24 me-16  mt--100">
              <div className="text-center border border-top-0 border-start-0 border-end-0">
                <img
                  src="/assets/images/user-grid/user-grid-img14.png"
                  alt=""
                  className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                />
                <h6 className="mb-0 mt-16">{profileInfo.name}</h6>
                <span className="text-secondary-light mb-16">
                  {profileInfo.email}
                </span>
              </div>
              <div className="mt-24">
                <h6 className="text-xl mb-16">Personal Info</h6>
                <ul>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      Full Name
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : {profileInfo.name}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      {" "}
                      Email
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : {profileInfo.email}
                    </span>
                  </li>
                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      {" "}
                      Phone Number
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : {profileInfo.phone}
                    </span>
                  </li>

                  <li className="d-flex align-items-center gap-1 mb-12">
                    <span className="w-30 text-md fw-semibold text-primary-light">
                      {" "}
                      Address
                    </span>
                    <span className="w-70 text-secondary-light fw-medium">
                      : {profileInfo.address}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body p-24">
              <ul
                className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center px-24 active"
                    id="pills-edit-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-edit-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-edit-profile"
                    aria-selected="true"
                  >
                    Completed
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center px-24"
                    id="pills-change-passwork-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-change-passwork"
                    type="button"
                    role="tab"
                    aria-controls="pills-change-passwork"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Pending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center px-24"
                    id="pills-notification-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-notification"
                    type="button"
                    role="tab"
                    aria-controls="pills-notification"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Rejected
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-edit-profile"
                  role="tabpanel"
                  aria-labelledby="pills-edit-profile-tab"
                  tabIndex={0}
                >
                  <h6 className="text-md text-primary-light mb-16">
                    Completed
                  </h6>
                  {/* Upload Image Start */}
                  <div className="mb-24 mt-16">
                    <table className="table bordered-table sm-table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Customer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">Number</th>
                          <th scope="col">Address</th>
                          <th scope="col" className="text-center">
                            Status
                          </th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="/assets/images/users/user1.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                              />
                              <div className="flex-grow-1">
                                <h6 className="text-md mb-0 fw-medium">
                                  Dianne Russell
                                </h6>
                                <span className="text-sm text-secondary-light fw-medium">
                                  redaniel@gmail.com
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>27 Mar 2024</td>
                          <td>10:00 AM</td>
                          <td>+11 019453-9485398</td>
                          <td>Dhaka</td>
                          <td className="text-center">
                            <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                              Pending
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <div className="w-32-px cursor-pointer h-32-px bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="mdi:tick"></Icon>
                              </div>
                              <div className="w-32-px cursor-pointer h-32-px bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="maki:cross"></Icon>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-change-passwork"
                  role="tabpanel"
                  aria-labelledby="pills-change-passwork-tab"
                  tabIndex="0"
                >
                  <div className="table-responsive scroll-sm">
                    <h6 className="text-md text-primary-light mb-16">
                      Pending
                    </h6>
                    <table className="table bordered-table sm-table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Customer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">Number</th>
                          <th scope="col">Address</th>
                          <th scope="col" className="text-center">
                            Status
                          </th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="/assets/images/users/user1.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                              />
                              <div className="flex-grow-1">
                                <h6 className="text-md mb-0 fw-medium">
                                  Dianne Russell
                                </h6>
                                <span className="text-sm text-secondary-light fw-medium">
                                  redaniel@gmail.com
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>27 Mar 2024</td>
                          <td>10:00 AM</td>
                          <td>+11 019453-9485398</td>
                          <td>Dhaka</td>
                          <td className="text-center">
                            <span className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                              Pending
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <div className="w-32-px cursor-pointer h-32-px bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="mdi:tick"></Icon>
                              </div>
                              <div className="w-32-px cursor-pointer h-32-px bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="maki:cross"></Icon>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-notification"
                  role="tabpanel"
                  aria-labelledby="pills-notification-tab"
                  tabIndex={0}
                >
                  <h6 className="text-md text-primary-light mb-16">Rejected</h6>

                  <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Customer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">Number</th>
                          <th scope="col">Address</th>
                          <th scope="col" className="text-center">
                            Status
                          </th>
                          <th scope="col" className="text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src="/assets/images/users/user1.png"
                                alt=""
                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                              />
                              <div className="flex-grow-1">
                                <h6 className="text-md mb-0 fw-medium">
                                  Dianne Russell
                                </h6>
                                <span className="text-sm text-secondary-light fw-medium">
                                  redaniel@gmail.com
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>27 Mar 2024</td>
                          <td>10:00 AM</td>
                          <td>+11 019453-9485398</td>
                          <td>Dhaka</td>
                          <td className="text-center">
                            <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                              Rejected
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-2">
                              <div className="w-32-px cursor-pointer h-32-px bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="mdi:tick"></Icon>
                              </div>
                              <div className="w-32-px cursor-pointer h-32-px bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center">
                                <Icon icon="maki:cross"></Icon>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
