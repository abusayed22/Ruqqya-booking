"use client";

import { AdminCompletedStatus } from "@/lib/admin/actions/bookingCompleted";
import { UserCompletedStatus } from "@/lib/user/sheduleStatus";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Pagination from "./child/Pagination";
import { formatDateToISO } from "@/lib/utils/formatDate&time";

const AdminCompleted = () => {
  const [selectedProblem, setSelectedProblem] = useState("");

  const [tab, setTab] = useState("ruqyya");
  const [tabData, setTabData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setData] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await AdminCompletedStatus(tab, page);
        if (result) {
          setTabData(result.data);
          setTotalPage(result.totalPages);
          setData(result.totalCount);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, page]);

  const handleModalOpen = (problem) => {
    setSelectedProblem(problem);
  };
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
                  tab === "ruqyya" && "active"
                }`}
                type="button"
                role="tab"
                onClick={() => setTab("ruqyya")}
              >
                Ruqyya
                {tab === "ruqyya" && (
                  <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                    {totalData}
                  </span>
                )}
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link d-flex align-items-center ${
                  tab === "hizama" && "active"
                }`}
                type="button"
                role="tab"
                aria-controls="pills-recent-leads"
                tabIndex="-1"
                onClick={() => setTab("hizama")}
              >
                Hizama
                {tab === "hizama" && (
                  <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                    {totalData}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade active show"
            id="pills-to-do-list"
            role="tabpanel"
            aria-labelledby="pills-to-do-list-tab"
            tabIndex="0"
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-32">
                <span className="spinner-border text-primary" role="status" />
                <span className="ms-12">Loading...</span>
              </div>
            ) : (
              ["ruqyya", "hizama"].includes(tab) &&
              (tabData?.length > 0 ? (
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
                        <th scope="col">problem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabData.map(
                        ({
                          id,
                          status,
                          user,
                          slottime,
                          requestdate,
                          problem,
                        }) => (
                          <tr key={id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="/assets/images/users/user1.png"
                                  alt=""
                                  className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                />
                                <div className="flex-grow-1">
                                  <h6 className="text-md mb-0 fw-medium">
                                    {user?.name}
                                  </h6>
                                  <span className="text-sm text-secondary-light fw-medium">
                                    {user?.email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>{formatDateToISO(requestdate)}</td>
                            <td>{slottime}</td>
                            <td>{user?.phone}</td>
                            <td>{user?.address}</td>
                            <td className="text-center">
                              {status === "pending" && (
                                <span className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                                  {status}
                                </span>
                              )}
                              {status === "completed" && (
                                <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                  {status}
                                </span>
                              )}
                              {status === "rejected" && (
                                <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                                  {status}
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              <button
                                onClick={() => handleModalOpen(problem)}
                                type="button"
                                className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <Icon
                                  icon="ph:read-cv-logo"
                                  className="icon text-lg line-height-1"
                                ></Icon>
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>
                  No {tab === "ruqyya" ? "Ruqyya" : "Hizama"} schedule booking
                </p>
              ))
            )}

            {!loading && totalData?.length > 0 && (
              <Pagination page={page} totalPage={totalPage} setPage={setPage} />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered overflow-hidden">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <p className="modal-title fs-5" id="exampleModalLabel">
                Problem
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <h6 className="text-primary-light text-justify fw-semibold text-md mb-0 mt-4">
                {selectedProblem}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompleted;
