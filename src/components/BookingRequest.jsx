"use client";

import { Icon } from "@iconify/react";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const BookingRequest = () => {
  const bookingData = [
    {
      customer: "Lisa Torres",
      date: "2025-02-22",
      time: "18:35:29",
      number: "981-617-2072",
      address: "47390 Peterson River\nMonicaborough, KS 31467",
      customerproblem:
        "This customer has reported multiple delivery issues over the past month. The items were either delayed or damaged upon arrival. There has also been some miscommunication with the customer service team regarding follow-up procedures. The customer has requested better communication and a follow-up on the issue. The most recent complaint was about a delayed package which caused significant inconvenience.",
    },
    {
      customer: "George Smith",
      date: "2025-03-05",
      time: "10:20:15",
      number: "052-152-3536",
      address: "30451 Rose Street\nSunnydale, CA 90023",
      customerproblem:
        "George has faced repeated issues with incorrect order shipments. He received the wrong product twice in a row, and he is frustrated with the lack of communication. The customer has requested a full refund for the inconvenience, and wants to ensure this does not happen again.",
    },
    {
      customer: "Emily White",
      date: "2025-01-19",
      time: "14:11:03",
      number: "097-324-5698",
      address: "128 Parkview Drive\nLakeside, TX 75052",
      customerproblem:
        "Emily has experienced significant delays in receiving items ordered, with an order that was supposed to arrive in 3 days taking over two weeks. Additionally, the customer received damaged goods, and she had to follow up multiple times to get a response. She is seeking compensation for the delays and a quick resolution for future orders.",
    },
    {
      customer: "Michael Torres",
      date: "2025-03-12",
      time: "08:45:39",
      number: "072-981-5673",
      address: "4790 Greenfield Road\nSeaspray, FL 33126",
      customerproblem:
        "Michael has complained about a recurring billing issue where his subscription was charged incorrectly. Despite multiple attempts to contact customer service, the issue has not been resolved in a timely manner. He is frustrated by the lack of progress and is requesting a full refund of the extra charges along with an investigation into the billing error.",
    },
    {
      customer: "Sarah Johnson",
      date: "2025-03-18",
      time: "17:10:29",
      number: "091-671-4928",
      address: "507 Willow Lane\nRiverstone, MI 49404",
      customerproblem:
        "Sarah has encountered multiple issues with her recent order, including receiving incomplete items and missing parts for a product. She has had to spend considerable time trying to get the issue resolved. Sarah has requested either the missing items be shipped urgently or a full refund for the incomplete order, along with a formal apology for the inconvenience.",
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [show]);

  return (
    <div className="card p-5">
      <b className="py-1">Booking Request</b>
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
                Problem
              </th>
              <th scope="col" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingData?.map(
              (
                { customer, date, time, number, address, customerproblem },
                index
              ) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="/assets/images/users/user1.png"
                        alt=""
                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                      />
                      <div className="flex-grow-1">
                        <h6 className="text-md mb-0 fw-medium">{customer}</h6>
                        <span className="text-sm text-secondary-light fw-medium">
                          redaniel@gmail.com
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{number}</td>
                  <td>{address}</td>
                  <td className="text-center">
                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                      Approved
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      // type="button"
                      className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm"
                      // data-bs-toggle="modal"
                      // data-bs-target="#exampleModal"
                      onClick={handleShow}
                    >
                      <Icon
                        icon="ph:read-cv-logo"
                        className="icon text-lg line-height-1"
                      ></Icon>
                    </button>
                    {/* Modal Add Event */}
                    <Modal
                      show={show}
                      onHide={handleClose}
                      centered
                      size="xl"
                      dialogClassName="modal-dialog-centered"
                      contentClassName="modal-content radius-16 bg-base"
                      aria-labelledby="exampleModalLabel"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="exampleModalLabel">
                          Problem
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body
                        style={{ overflowY: "auto", maxHeight: "80vh" }}
                      >
                        <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4">
                          {customerproblem}
                        </h6>
                      </Modal.Body>
                    </Modal>
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
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingRequest;
