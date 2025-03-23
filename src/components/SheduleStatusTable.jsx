import React from "react";

const SheduleStatusTable = () => {
  return (
    <div>
      <div className="card basic-data-table">
        <div className="card-header">
          <h5 className="card-title mb-0">Holiday</h5>
        </div>
        <div className="card-body ">
          <div className="table-responsive table-wrapper">
            <table
              className="table  bordered-table mb-0 "
              id="dataTable"
              data-page-length={10}
            >
              <thead>
                <tr>
                  <th scope="col">
                    <div className="form-check style-check d-flex align-items-center">
                      <input className="form-check-input" type="checkbox" />
                      <label className="form-check-label">Emloyee ID</label>
                    </div>
                  </th>
                  <th scope="col"> Name</th>
                  <th scope="col"> Phone</th>
                  <th scope="col"> Email</th>
                  <th scope="col">Position</th>
                  <th scope="col">Department</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Salary</th>
                  <th scope="col">status</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map(
                  ({
                    employeeId,
                    firstName,
                    lastName,
                    phone,
                    email,
                    position,
                    department,
                    hireDate,
                    salary,
                    status,
                  }) => (
                    <tr>
                      <td>
                        <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">
                            {employeeId}
                          </label>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <img
                            src="/assets/images/users/user1.png"
                            alt=""
                            class="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                          />
                          <h6 class="text-md mb-0 fw-medium flex-grow-1">
                            {firstName} {lastName}
                          </h6>
                        </div>
                      </td>
                      <td>{phone}</td>
                      <td>{email}</td>
                      <td>{position}</td>
                      <td className="">{department}</td>
                      <td className="">{hireDate}</td>
                      <td className="text-center">{salary}</td>
                      <td>
                        {(status === "pending" && (
                          <span className="bg-success-focus text-warning -main px-24 py-4 rounded-pill fw-medium text-sm">
                            {status}
                          </span>
                        )) ||
                          (status === "Active" && (
                            <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                              {status}
                            </span>
                          )) ||
                          (status === "Inactive" && (
                            <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                              {status}
                            </span>
                          ))}
                      </td>
                      <td>
                        <Link
                          href="#"
                          className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <Icon icon="iconamoon:eye-light" />
                        </Link>
                        <Link
                          href="#"
                          className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <Icon icon="lucide:edit" />
                        </Link>
                        <Link
                          href="#"
                          className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <Icon icon="mingcute:delete-2-line" />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheduleStatusTable;
