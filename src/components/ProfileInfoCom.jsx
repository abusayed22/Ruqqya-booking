import React from "react";

const ProfileInfoCom = ({ personalInfo }) => {
  
  return (
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
            <h6 className="mb-0 mt-16 capitalize">{personalInfo?.name}{personalInfo?.role === "admin" && <span className="text-sm fw-medium">({personalInfo.role})</span>} </h6> 
            <span className="text-secondary-light mb-16">
              {personalInfo?.email}
            </span>
          </div>
          <div className="mt-24">
            <h6 className="text-xl mb-16">Personal Info</h6>
            <ul>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">
                  Full Name
                </span>
                <span className="w-70 capitalize text-secondary-light fw-medium">
                  : {personalInfo?.name} 
                </span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">
                  {" "}
                  Email
                </span>
                <span className="w-70 text-secondary-light fw-medium">
                  : {personalInfo?.email}
                </span>
              </li>
              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 text-md fw-semibold text-primary-light">
                  {" "}
                  Phone Number
                </span>
                <span className="w-70 text-secondary-light fw-medium">
                  : {personalInfo?.phone}
                </span>
              </li>

              <li className="d-flex align-items-center gap-1 mb-12">
                <span className="w-30 capitalize text-md fw-semibold text-primary-light">
                  {" "}
                  Address
                </span>
                <span className="w-70 text-secondary-light fw-medium">
                  : {personalInfo?.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoCom;
