"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggleButton from "@/helper/ThemeToggleButton";
import { Icon } from "@iconify/react";
// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";

const MasterLayout = ({ children, session }) => {
  const [userLoading, setUserLoading] = useState(false);
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = usePathname(); // Hook to get the current route
  let pathname = usePathname();
  const { user } = session;


  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location ||
            link.getAttribute("to") === location
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const signOutHanler = async () => {
    await signOut();
  };

  return (
    <section
      className={mobileMenu ? "overlay active" : "overlay "}
      onClick={mobileMenu ? mobileMenuControl : null}
    >
      {/* sidebar */}
      <aside
        className={
          sidebarActive
            ? "sidebar active "
            : mobileMenu
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <button
          onClick={mobileMenuControl}
          type="button"
          className="sidebar-close-btn"
        >
          <Icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <Link href="/" className="sidebar-logo">
            <img
              src="/assets/images/logo.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="/assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="/assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </Link>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            <li>
              <Link
                href="/dashboard"
                className={pathname === "/dashboard" ? "active-page" : ""}
              >
                <Icon icon="mage:dashboard-check" className="menu-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            {user?.role === "user" && (
              <li>
                <Link
                  href="/shedulebooking"
                  className={
                    pathname === "/shedulebooking" ? "active-page" : ""
                  }
                >
                  <Icon icon="uit:calender" className="menu-icon" />
                  <span>Shedule Booking</span>
                </Link>
              </li>
            )}
            {user?.role === "user" && (
              <li>
                <Link
                  href="/bookingstatus"
                  className={pathname === "/bookingstatus" ? "active-page" : ""}
                >
                  <Icon icon="lets-icons:status-list" className="menu-icon" />
                  <span>Booking Status</span>
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/createslot"
                  className={pathname === "/createslot" ? "active-page" : ""}
                >
                  <Icon icon="carbon:create-link" className="menu-icon" />
                  <span> Create Time Slot</span>
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/timeslot"
                  className={pathname === "/timeslot" ? "active-page" : ""}
                >
                  <Icon icon="gravity-ui:list-timeline" className="menu-icon" />
                  <span>Time Slot List</span>
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/bookingreq"
                  className={pathname === "/bookingreq" ? "active-page" : ""}
                >
                  <Icon
                    icon="mingcute:git-pull-request-fill"
                    className="menu-icon"
                  />
                  <span> Booking Request</span>
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link
                  href="/bookingcomplete"
                  className={
                    pathname === "/bookingcomplete" ? "active-page" : ""
                  }
                >
                  <Icon icon="mdi:account-tick" className="menu-icon" />
                  <span> Booking Complete</span>
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li>
                <Link
                  href="/customers"
                  className={pathname === "/customers" ? "active-page" : ""}
                >
                  <Icon
                    icon="material-symbols-light:patient-list"
                    className="menu-icon text-2xl"
                  />
                  <span> Customers</span>
                </Link>
              </li>
            )}

            <li>
              <Link
                href="/completedbooking"
                className={
                  pathname === "/completedbooking" ? "active-page" : ""
                }
              >
                <Icon icon="mdi:playlist-tick" className="menu-icon text-2xl" />
                <span> Completed Booking</span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/settings"
                className={pathname === "/settings" ? "active-page" : ""}
              >
                <Icon icon="icon-park-outline:setting" className="menu-icon" />
                <span>Settings</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <div className="navbar-header">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-4">
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={sidebarControl}
                >
                  {sidebarActive ? (
                    <Icon
                      icon="iconoir:arrow-right"
                      className="icon text-2xl non-active"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:bars-3-solid"
                      className="icon text-2xl non-active "
                    />
                  )}
                </button>
                <button
                  onClick={mobileMenuControl}
                  type="button"
                  className="sidebar-mobile-toggle"
                >
                  <Icon icon="heroicons:bars-3-solid" className="icon" />
                </button>
                <form className="navbar-search">
                  <input type="text" name="search" placeholder="Search" />
                  <Icon icon="ion:search-outline" className="icon" />
                </form>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex flex-wrap align-items-center gap-3">
                {/* ThemeToggleButton */}
                <ThemeToggleButton />

                <div className="dropdown">
                  <button
                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <Icon
                      icon="mage:email"
                      className="text-primary-light text-xl"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                    <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-0">
                          Message
                        </h6>
                      </div>
                      <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                        05
                      </span>
                    </div>
                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="/assets/images/notification/profile-3.png"
                              alt=""
                            />
                            <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                            8
                          </span>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="/assets/images/notification/profile-4.png"
                              alt=""
                            />
                            <span className="w-8-px h-8-px  bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                            2
                          </span>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="/assets/images/notification/profile-5.png"
                              alt=""
                            />
                            <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="/assets/images/notification/profile-6.png"
                              alt=""
                            />
                            <span className="w-8-px h-8-px bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                            0
                          </span>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                            <img
                              src="/assets/images/notification/profile-7.png"
                              alt=""
                            />
                            <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Kathryn Murphy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                              hey! there i’m...
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            12:30 PM
                          </span>
                          <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                            8
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="text-center py-12 px-16">
                      <Link
                        href="#"
                        className="text-primary-600 fw-semibold text-md"
                      >
                        See All Message
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Message dropdown end */}
                <div className="dropdown">
                  <button
                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <Icon
                      icon="iconoir:bell"
                      className="text-primary-light text-xl"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                    <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-0">
                          Notifications
                        </h6>
                      </div>
                      <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                        05
                      </span>
                    </div>
                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <Icon
                              icon="bitcoin-icons:verify-outline"
                              className="icon text-xxl"
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Congratulations
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Your profile has been Verified. Your profile has
                              been Verified
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <img
                              src="/assets/images/notification/profile-1.png"
                              alt=""
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Ronald Richards
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              You can stitch between artboards
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            AM
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Arlene McCoy
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <img
                              src="/assets/images/notification/profile-2.png"
                              alt=""
                            />
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Annette Black
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                      >
                        <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            DR
                          </span>
                          <div>
                            <h6 className="text-md fw-semibold mb-4">
                              Darlene Robertson
                            </h6>
                            <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                              Invite you to prototyping
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-secondary-light flex-shrink-0">
                          23 Mins ago
                        </span>
                      </Link>
                    </div>
                    <div className="text-center py-12 px-16">
                      <Link
                        href="#"
                        className="text-primary-600 fw-semibold text-md"
                      >
                        See All Notification
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Notification dropdown end */}
                <div className="dropdown">
                  <button
                    className="d-flex justify-content-center align-items-center rounded-circle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={user?.img || "/assets/images/user.png"}
                      alt="image_user"
                      className="w-40-px h-40-px object-fit-cover rounded-circle"
                    />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg capitalize text-primary-light fw-semibold mb-2">
                          {user?.name}
                        </h6>
                        <span className="capitalize text-secondary-light fw-medium text-sm">
                          {user?.role || "User"}
                        </span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon
                          icon="radix-icons:cross-1"
                          className="icon text-xl"
                        />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          href={`/view-profile/${user?.id}`}
                        >
                          <Icon
                            icon="solar:user-linear"
                            className="icon text-xl"
                          />{" "}
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          href="/email"
                        >
                          <Icon
                            icon="tabler:message-check"
                            className="icon text-xl"
                          />{" "}
                          Inbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          href="/settings"
                        >
                          <Icon
                            icon="icon-park-outline:setting-two"
                            className="icon text-xl"
                          />
                          Setting
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                          onClick={() => signOut()}
                        >
                          <Icon icon="lucide:power" className="icon text-xl" />{" "}
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Profile dropdown end */}
              </div>
            </div>
          </div>
        </div>

        {/* dashboard-main-body */}
        <div className="dashboard-main-body">{children}</div>

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">© 2025 WowDash. All Rights Reserved.</p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Made by <span className="text-primary-600">wowtheme7</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
