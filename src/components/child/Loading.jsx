import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="spinner-border text-primary" role="status" />
      <span className="ms-12">Loading...</span>
    </div>
  );
};

export default Loading;
