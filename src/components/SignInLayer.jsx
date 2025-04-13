"use client";
import { signInWithCredentials } from "@/lib/actions/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isValid } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const SignInLayer = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [identifier, setIdentifier] = useState("");

  const router = useRouter();

  // Toggle function for password field
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const isValidForm = (feild) =>
      feild !== "" && feild !== null && feild !== undefined;

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = (email) => emailRegex.test(email);
    const isValidNumber = (num) => !isNaN(num) && num > 0;
    const validatedForm = isValidEmail(email) && isValidForm(password);
    setFormValid(validatedForm);
  }, [email, password]);


  const SignInHandler = async (e) => {
    e.preventDefault();
    const result = await signInWithCredentials({ identifier, password });
    if (result.success) {
      toast.success("You have successfully signed in.");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "An error occurred.");
    }
  };

  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const isValidEmail = (value) => emailRegex.test(value);
    const isValidPhone = (value) => phoneRegex.test(value);
    const isValidIdentifier =
      isValidEmail(identifier) || isValidPhone(identifier);
    const isValidPassword = password !== "";
    setFormValid(isValidIdentifier && isValidPassword);
  }, [identifier, password]);


  return (
    <>
      <section className="auth bg-base d-flex flex-wrap">
        <ToastContainer />
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src="assets/images/auth/auth-img.png" alt="logo" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div>
              <Link href="/" className="mb-40 max-w-290-px">
                <img src="assets/images/logo.png" alt="" />
              </Link>
              <h4 className="mb-12">Sign In to your Account</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Welcome back! please enter your detail
              </p>
            </div>
            <form onSubmit={SignInHandler}>
              <div className="icon-field mb-16">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Email or Phone"
                />
              </div>
              <div className="position-relative mb-20">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    id="your-password"
                    placeholder="Password"
                  />
                </div>

                <span
                  className={`toggle-password ${
                    passwordVisible ? "ri-eye-off-line" : "ri-eye-line"
                  } cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                  onClick={togglePasswordVisibility}
                ></span>
              </div>
              <div className="">
                <div className="d-flex justify-content-between gap-2">
                  <div className="form-check style-check d-flex align-items-center">
                    <input
                      className="form-check-input border border-neutral-300"
                      type="checkbox"
                      defaultValue=""
                      id="remeber"
                    />
                    <label className="form-check-label" htmlFor="remeber">
                      Remember me{" "}
                    </label>
                  </div>
                  <Link href="#" className="text-primary-600 fw-medium">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <button
                disabled={!formValid}
                type="submit"
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              >
                {" "}
                Sign In
              </button>
              <div className="mt-32 center-border-horizontal text-center">
                <span className="bg-base z-1 px-4">Or sign in with</span>
              </div>
              {/* <div className="mt-32 d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                >
                  <Icon
                    icon="ic:baseline-facebook"
                    className="text-primary-600 text-xl line-height-1"
                  />
                  Google
                </button>
                <button
                  type="button"
                  className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                >
                  <Icon
                    icon="logos:google-icon"
                    className="text-primary-600 text-xl line-height-1"
                  />
                  Google
                </button>
              </div> */}
              <div className="mt-32 text-center text-sm">
                <p className="mb-0">
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary-600 fw-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInLayer;
