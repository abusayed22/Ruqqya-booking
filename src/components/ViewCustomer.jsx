"use client";

import {
  customerProfileData,
  singleDataFethcing,
} from "@/lib/user/actions/viewProfile";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Pagination from "./child/Pagination";
import ProfileInfoCom from "./ProfileInfoCom";
import Loading from "./child/Loading";
import { useRouter } from "next/router";

const ViewCustomer = ({ customerId, personalInfo,user }) => {
  // data
  const [profileData, setProfileData] = useState(null);
  const [ruqyyaCompletedData, setRuqyyaCompletedData] = useState([]);
  const [hizamaCompletedData, setHizamaCompletedData] = useState([]);
  const [ruqyyaPendingData, setRuqyyaPendingData] = useState([]);
  const [hizamaPendingData, setHizamaPendingData] = useState([]);
  const [ruqyyaRejectedData, setRuqyyaRejectedData] = useState([]);
  const [hizamaRejectedData, setHizamaRejectedData] = useState([]);

  // Pagination
  const [ruqyyaCompletedPage, setRuqyyaCompletedPage] = useState(1);
  const [hizamaCompletedPage, setHizamaCompletedPage] = useState(1);
  const [ruqyyaPendingPage, setRuqyyaPendingPage] = useState(1);
  const [hizamaPendingPage, setHizamaPendingPage] = useState(1);
  const [ruqyyaRejectedPage, setRuqyyaRejectedPage] = useState(1);
  const [hizamaRejectedPage, setHizamaRejectedPage] = useState(1);

  // loading
  const [profileDataLoading, setProfileDataLoading] = useState(true);
  const [ruqyyaCompletedLoading, setRuqyyaCompletedLoading] = useState(false);
  const [hizamaCompletedLoading, setHizamaCompletedLoading] = useState(false);
  const [ruqyyaPendingLoading, setRuqyyaPendingLoading] = useState(false);
  const [hizamaPendingLoading, setHizamaPendingLoading] = useState(false);
  const [ruqyyaRejectedLoading, setRuqyyaRejectedLoading] = useState(false);
  const [hizamaRejectedLoading, setHizamaRejectedLoading] = useState(false);

  // Function to fetch data
  const fetchData = async (category, page) => {

    try {
      const data = await singleDataFethcing(customerId, category, page);
      switch (category) {
        case "RuqyyaCompleted":
          setRuqyyaCompletedData(data);
          break;
        case "HizamaCompleted":
          setHizamaCompletedData(data);
          break;
        case "RuqyyaPending":
          setRuqyyaPendingData(data);
          break;
        case "HizamaPending":
          setHizamaPendingData(data);
          break;
        case "RuqyyaRejected":
          setRuqyyaRejectedData(data);
          break;
        case "HizamaRejected":
          setHizamaRejectedData(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("profile data fetching error", error);
    } 
  };

  // Pagination data fetching
  useEffect(() => {
    setRuqyyaCompletedLoading(true);
    fetchData("RuqyyaCompleted", ruqyyaCompletedPage);
    setRuqyyaCompletedLoading(false);
  }, [ruqyyaCompletedPage]);

  useEffect(() => {
    setHizamaCompletedLoading(true);
    fetchData("HizamaCompleted", hizamaCompletedPage);
    setHizamaCompletedLoading(false);
  }, [hizamaCompletedPage]);

  useEffect(() => {
    setRuqyyaPendingLoading(true);
    fetchData("RuqyyaPending", ruqyyaPendingPage);
    setRuqyyaPendingLoading(false);
  }, [ruqyyaPendingPage]);

  useEffect(() => {
    setHizamaPendingLoading(true);
    fetchData("HizamaPending", hizamaPendingPage);
    setHizamaPendingLoading(false);
  }, [hizamaPendingPage]);

  useEffect(() => {
    setRuqyyaRejectedLoading(true);
    fetchData("RuqyyaRejected", ruqyyaRejectedPage);
    setRuqyyaRejectedLoading(false);
  }, [ruqyyaRejectedPage]);

  useEffect(() => {
    setHizamaRejectedLoading(true);
    fetchData("HizamaRejected", hizamaRejectedPage);
    setHizamaRejectedLoading(false);
  }, [hizamaRejectedPage]);

  return (
    <div>
      <div className="row gy-4 ">
        <ProfileInfoCom personalInfo={personalInfo} />

        {
          user.role === "user" || user.id !== customerId &&  (
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
                  <div>
                    <div>
                      <h6 className="text-md text-primary-light mb-16">
                        Ruqyya
                      </h6>
                      {ruqyyaCompletedLoading ? (
                        <Loading />
                      ) : (
                        <div className="mb-24 mt-16">
                          {ruqyyaCompletedData?.data?.length > 0 ? (
                            <div className="table-responsive scroll-sm">
                              <table className="table bordered-table sm-table mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ruqyyaCompletedData?.data?.map(
                                    ({ id, slottime, requestdate }) => (
                                      <tr key={id}>
                                        <td>
                                          {
                                            new Date(requestdate)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                        <td>{slottime}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <Pagination
                                page={ruqyyaCompletedPage}
                                setPage={setRuqyyaCompletedPage}
                                totalPage={ruqyyaCompletedData?.count}
                              />
                            </div>
                          ) : (
                            <p className="">No Ruqyya </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-12">
                      <h6 className="text-md text-primary-light mb-16">
                        Hizama
                      </h6>
                      {hizamaCompletedLoading ? (
                        <Loading />
                      ) : (
                        <div className="mb-24 mt-16">
                          {hizamaCompletedData?.data?.length > 0 ? (
                            <div className="table-responsive scroll-sm">
                              <table className="table bordered-table sm-table mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {hizamaCompletedData?.data?.map(
                                    ({ id, slottime, requestdate }) => (
                                      <tr key={id}>
                                        <td>
                                          {
                                            new Date(requestdate)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                        <td>{slottime}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <Pagination
                                page={hizamaCompletedPage}
                                setPage={setHizamaCompletedPage}
                                totalPage={hizamaCompletedData?.count}
                              />
                            </div>
                          ) : (
                            <p className="">No Hizama </p>
                          )}
                        </div>
                      )}
                    </div>
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
                    <div>
                      <div>
                        <h6 className="text-md text-primary-light mb-16">
                          Ruqyya
                        </h6>
                        {ruqyyaPendingLoading ? (
                          <Loading />
                        ) : (
                          <div className="mb-24 mt-16">
                            {ruqyyaPendingData?.data?.length > 0 ? (
                              <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">Date</th>
                                      <th scope="col">Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ruqyyaPendingData?.data?.map(
                                      ({ id, slottime, requestdate }) => (
                                        <tr key={id}>
                                          <td>
                                            {
                                              new Date(requestdate)
                                                .toISOString()
                                                .split("T")[0]
                                            }
                                          </td>
                                          <td>{slottime}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                                <Pagination
                                  page={ruqyyaPendingPage}
                                  setPage={setRuqyyaPendingPage}
                                  totalPage={ruqyyaPendingData?.count}
                                />
                              </div>
                            ) : (
                              <p className="">No Ruqyya </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-12">
                        <h6 className="text-md text-primary-light mb-16">
                          Hizama
                        </h6>
                        {hizamaPendingLoading ? (
                          <Loading />
                        ) : (
                          <div className="mb-24 mt-16">
                            {hizamaPendingData?.data?.length > 0 ? (
                              <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">Date</th>
                                      <th scope="col">Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {hizamaPendingData?.data?.map(
                                      ({ id, slottime, requestdate }) => (
                                        <tr key={id}>
                                          <td>
                                            {
                                              new Date(requestdate)
                                                .toISOString()
                                                .split("T")[0]
                                            }
                                          </td>
                                          <td>{slottime}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                                <Pagination
                                  page={hizamaPendingPage}
                                  setPage={setHizamaPendingPage}
                                  totalPage={hizamaPendingData?.count}
                                />
                              </div>
                            ) : (
                              <p className="">No Hizama </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-notification"
                  role="tabpanel"
                  aria-labelledby="pills-notification-tab"
                  tabIndex={0}
                >
                  <div>
                    <div>
                      <h6 className="text-md text-primary-light mb-16">
                        Ruqyya
                      </h6>
                      {ruqyyaRejectedLoading ? (
                        <Loading />
                      ) : (
                        <div className="mb-24 mt-16">
                          {ruqyyaRejectedData?.data?.length > 0 ? (
                            <div className="table-responsive scroll-sm">
                              <table className="table bordered-table sm-table mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ruqyyaRejectedData?.data?.map(
                                    ({ id, slottime, requestdate }) => (
                                      <tr key={id}>
                                        <td>
                                          {
                                            new Date(requestdate)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                        <td>{slottime}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <Pagination
                                page={ruqyyaRejectedPage}
                                setPage={setRuqyyaRejectedPage}
                                totalPage={ruqyyaRejectedData?.count}
                              />
                            </div>
                          ) : (
                            <p className="">No Ruqyya </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="mt-12">
                      <h6 className="text-md text-primary-light mb-16">
                        Hizama
                      </h6>
                      {hizamaRejectedLoading ? (
                        <Loading />
                      ) : (
                        <div className="mb-24 mt-16">
                          {hizamaRejectedData?.data?.length > 0 ? (
                            <div className="table-responsive scroll-sm">
                              <table className="table bordered-table sm-table mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {hizamaRejectedData?.data?.map(
                                    ({ id, slottime, requestdate }) => (
                                      <tr key={id}>
                                        <td>
                                          {
                                            new Date(requestdate)
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                        </td>
                                        <td>{slottime}</td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <Pagination
                                page={hizamaRejectedPage}
                                setPage={setHizamaRejectedPage}
                                totalPage={hizamaRejectedData?.count}
                              />
                            </div>
                          ) : (
                            <p className="">No Hizama </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default ViewCustomer;
