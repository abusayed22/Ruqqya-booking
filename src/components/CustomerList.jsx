"use client";
import { getAllUserPagination } from "@/lib/admin/actions/customer";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Pagination from "./child/Pagination";
import Loading from "./child/Loading";

const CustomerList = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllUserPagination(page);
        if (result) {
          setUsers(result.data);
          setTotalUsers(result.totalCount);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);


  return (
    <div>
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Users Grid</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              <a
                href="index.html"
                className="d-flex align-items-center gap-1 hover-text-primary"
              >
                <Icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                ></Icon>
                Dashboard
              </a>
            </li>
            <li>-</li>
            <li className="fw-medium">Users Grid</li>
          </ul>
        </div>

        <div className="card h-100 p-0 radius-12">
          <div className="card-body p-24">
            {loading ? (
              <Loading />
            ) : users?.length === 0 ? ( // Changed condition from > 0 to === 0
              <p>No Users!</p>
            ) : (
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table sm-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Number</th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map(({ id, email, name, phone }) => (
                      <tr key={id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src="/assets/images/users/user1.png"
                              alt=""
                              className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                            />
                            <div className="flex flex-col space-y-1">
                              <p className="text-sm capitalize mb-0 fw-normal text-secondary-light">
                                {name}
                              </p>
                              <p className="text-xs mb-0 fw-normal text-secondary-light">
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {phone}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center gap-10 justify-content-center">
                            <a
                              href={`/view-profile/${id}`}
                              type="button"
                              className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                            >
                              <Icon
                                icon="majesticons:eye-line"
                                className="icon text-xl"
                              ></Icon>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalUsers > 0 && ( // Only show pagination if more than 10 users (adjust as needed)
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPage={Math.ceil(totalUsers)} // Assuming 10 items per page
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
