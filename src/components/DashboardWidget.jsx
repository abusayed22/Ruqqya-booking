import { Icon } from "@iconify/react";
import React from "react";

const DashboardWidget = ({icon,label,count}) => {
  return (
    <div>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
            <div className="d-flex align-items-center gap-2">
              <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                <Icon icon={icon} className="icon"></Icon>
              </span>
              <div>
                <span className="mb-2 fw-medium text-secondary-light text-sm">
                  {label}
                </span>
                <h6 className="fw-semibold">{count}</h6>
              </div>
            </div>
          </div>
          <p className="text-sm mb-0">
            Increase by{" "}
            <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
              +200
            </span>{" "}
            this week
          </p>
        </div>
  );
};

export default DashboardWidget;
