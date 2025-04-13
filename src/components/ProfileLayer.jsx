"use client";
import {
  customerInfo,
  customerInfoUpdate,
} from "@/lib/user/actions/viewProfile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import ProfileInfoCom from "./ProfileInfoCom";
import { toast, ToastContainer } from "react-toastify";
import { constructNow } from "date-fns";
import { resetPassword, verifiedPassword } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";

const ProfileLayer = ({ user }) => {
  // loading
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  // validation
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [confirmPassword, setComfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  // edit
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // password
  const [verified, setVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");

  const { data: session, update } = useSession();
  

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await customerInfo(user.id);
      if (data) {
        setAddress(data.address ?? "");
        setProfileData(data);
        setName(data.name ?? "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/user-grid/user-grid-img13.png"
  );

  // Toggle function for password field
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Toggle function for confirm password field
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const toggleOldPasswordPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };


  const editSaveHandler = async () => {
    setEditLoading(true);
    try {
      const updateResult = await customerInfoUpdate(
        profileData.id,
        name,
        address
      );
      if (updateResult) {
        await fetchProfileData(); // Ensure this updates `profileData` state
        toast.success("Update profile successfully");
        setEditLoading(false);
        const updatedSession = await update({
          ...session,
          user: {
            ...session?.user,
            name:name
          }
        })
        window.location.reload();
        console.log("updated", updatedSession)
      }
    } catch (error) {
      setEditLoading(false);
      toast.error(
        "Update profile failed: " + (error.message || "Something went wrong!")
      );
    }
  };

  const verifiedHandler = async () => {
    setVerifyLoading(true);
    const isVerify = await verifiedPassword(user.email, user.id, oldPassword);
    if (isVerify.success) {
      setVerified(true);
      setVerifyLoading(false);
    } else {
      toast.error(isVerify.massage);
      setOldPassword("");
      setVerifyLoading(false);
    }
  };

  // edit form validation
  useEffect(() => {
    const isValidField = (field) =>
      field?.trim() !== "" && field !== null && field !== undefined;
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (num) => !isNaN(num) && num.length >= 10;
    const isPasswordMatch = (newPass, confirmPass) => newPass === confirmPass;
    const hasChanges =
      name?.trim() !== profileData?.name?.trim() ||
      address?.trim() !== profileData?.address?.trim();
    const isProfileValid =
      isValidField(name) && isValidField(address) && hasChanges;
    setIsFormValid(isProfileValid);
  }, [name, address, profileData?.name, profileData?.address]);

  // old password validation
  useEffect(() => {
    if (!verified) {
      const isValid = oldPassword.trim() !== "";
      setIsFormValid(isValid);
    }
  }, [oldPassword, verified]);

  // new and confirm pass validation
  useEffect(() => {
    if (verified) {
      const isValid =
        newPassword.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        newPassword === confirmPassword;

      setIsFormValid(isValid);
    }
  }, [newPassword, confirmPassword, verified]);

  const resetHandler = async () => {
    setResetLoading(true);
    const isVerify = await resetPassword(user.email, user.id, newPassword);
    if (isVerify.success) {
      toast.success(isVerify.message);
      setVerified(false);
      setOldPassword("");
      setNewPassword("");
      setComfirmPassword("");
      setResetLoading(false);
    } else {
      toast.error(isVerify.error);
      setOldPassword("");
      setNewPassword("");
      setResetLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row gy-4">
        <ProfileInfoCom personalInfo={profileData} />

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
                    Edit Profile
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
                    Change Password
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
                    Profile Image
                  </h6>
                  {/* Upload Image Start */}
                  <div className="mb-24 mt-16">
                    <div className="avatar-upload">
                      <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={readURL}
                        />
                        <label
                          htmlFor="imageUpload"
                          className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                        >
                          <Icon
                            icon="solar:camera-outline"
                            className="icon"
                          ></Icon>
                        </label>
                      </div>
                      <div className="avatar-preview">
                        <div
                          id="imagePreview"
                          style={{
                            backgroundImage: `url(${imagePreview})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Upload Image End */}
                  <form action="#">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Full Name
                            <span className="text-danger-600">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            value={name ?? ""}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Full Name"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="email"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Email <span className="text-danger-600">*</span>
                          </label>
                          <input
                            disabled
                            type="email"
                            className="form-control radius-8 "
                            id="email"
                            placeholder="Enter email address"
                            value={profileData?.email ?? ""}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="number"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Phone
                          </label>
                          <input
                            disabled
                            type="email"
                            className="form-control radius-8"
                            id="number"
                            placeholder="Enter phone number"
                            value={profileData?.phone ?? ""}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="number"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="number"
                            placeholder="Enter address"
                            value={address ?? ""}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button
                        disabled={editLoading || !isFormValid}
                        onClick={editSaveHandler}
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-change-passwork"
                  role="tabpanel"
                  aria-labelledby="pills-change-passwork-tab"
                  tabIndex="0"
                >
                  {verified ? (
                    <>
                      <div className="mb-20">
                        <label
                          htmlFor="your-password"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          New Password{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control radius-8"
                            id="your-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter New Password*"
                          />
                          <span
                            className={`toggle-password ${
                              passwordVisible
                                ? "ri-eye-off-line"
                                : "ri-eye-line"
                            } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                            onClick={togglePasswordVisibility}
                          ></span>
                        </div>
                      </div>

                      <div className="mb-20">
                        <label
                          htmlFor="confirm-password"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Confirm Password{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            className="form-control radius-8"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setComfirmPassword(e.target.value)}
                            placeholder="Confirm Password*"
                          />

                          <span
                            className={`toggle-password ${
                              confirmPasswordVisible
                                ? "ri-eye-off-line"
                                : "ri-eye-line"
                            } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                            onClick={toggleConfirmPasswordVisibility}
                          ></span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mb-20">
                      <label
                        htmlFor="confirm-password"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Old Password <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={oldPasswordVisible ? "text" : "password"}
                          className="form-control radius-8"
                          id="confirm-password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Old Password*"
                        />

                        <span
                          className={`toggle-password ${
                            oldPasswordVisible
                              ? "ri-eye-off-line"
                              : "ri-eye-line"
                          } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                          onClick={toggleOldPasswordPasswordVisibility}
                        ></span>
                      </div>
                    </div>
                  )}
                  <div className="w-100 mt-5 d-flex justify-content-center ">
                    {!verified ? (
                      <button
                        disabled={verifyLoading || !isFormValid}
                        onClick={verifiedHandler}
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Verify
                      </button>
                    ) : (
                      <button
                        disabled={resetLoading || !isFormValid}
                        onClick={resetHandler}
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Reset
                      </button>
                    )}
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

export default ProfileLayer;
