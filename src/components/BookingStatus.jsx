"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const BookingStatus = () => {
  const [tab, setTab] = useState("ruqayya");

  return (
    <div>
      <div className="card-body p-24">
        <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
          <ul
            className="nav border-gradient-tab nav-pills mb-0"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link d-flex align-items-center ${
                  tab === "ruqayya" && "active"
                }`}
                // id="pills-to-do-list-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#pills-to-do-list"
                type="button"
                role="tab"
                // aria-controls="pills-to-do-list"
                // aria-selected="true"
                onClick={() => setTab("ruqayya")}
              >
                Ruqyya
                <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                  12
                </span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link d-flex align-items-center ${
                  tab === "hizama" && "active"
                }`}
                // id="pills-recent-leads-tab"
                // data-bs-toggle="pill"
                // data-bs-target="#pills-recent-leads"
                type="button"
                role="tab"
                aria-controls="pills-recent-leads"
                // aria-selected="false"
                tabindex="-1"
                onClick={() => setTab("hizama")}
              >
                Hizama
                <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                  35
                </span>
              </button>
            </li>
          </ul>
          <a
            href="javascript:void(0)"
            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
          >
            View All
            <Icon
              icon="solar:alt-arrow-right-linear"
              className="icon"
            ></Icon>
          </a>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade active show"
            id="pills-to-do-list"
            role="tabpanel"
            aria-labelledby="pills-to-do-list-tab"
            tabindex="0"
          >
            {tab === "ruqayya" && (
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
                      <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                        Completed
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
            )}
            {tab === "hizama" && (
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
                      <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                        Completed
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;
