"use client";
import { getAlltimeslot } from "@/lib/admin/actions/createTimeSlot";
import React, { useEffect, useState } from "react";

const TimeSlots = () => {
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
        const result = await getAlltimeslot(tab);
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
                        <th scope="col">Slot</th>
                        <th scope="col ">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabData.map(
                        ({
                          id,
                          time,
                          category,
                        }) => (
                          <tr key={id}>
                            <td>{time}</td>
                            <td className="">
                              {category === "ruqyya" && (
                                <span className="bg-light text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                                  {category}
                                </span>
                              )}
                              {category === "hizama" && (
                                <span className="bg-light text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                                  {category}
                                </span>
                              )}
                             
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>
                  No {tab === "ruqyya" ? "Ruqyya" : "Hizama"} Time Slot
                </p>
              ))
            )}

            {/* {!loading && totalData?.length > 0 && (
              <Pagination page={page} totalPage={totalPage} setPage={setPage} />
            )} */}
          </div>
        </div>
      </div>
      {/* <div
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
      </div> */}
    </div>
  );
};

export default TimeSlots;
