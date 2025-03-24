import DashboardWidget from "@/components/DashboardWidget";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="row gy-4">
        {/* <span class="text-sm fw-medium text-secondary-light ">Today</span> */}
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:digital-out-of-home-outline-sharp"}
                label={"Booking Request"}
                count={12}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:bath-private"}
                label={"Ruqyya Request"}
                count={9}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:airline-seat-flat-angled-rounded"}
                label={"Hizama Request"}
                count={3}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"icon-park-twotone:success"}
                label={"Ruqyya Complete"}
                count={3}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"icon-park-twotone:success"}
                label={"Hizama Complete"}
                count={3}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"mdi:account-pending"}
                label={"Hizama Pending"}
                count={3}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"mdi:account-pending"}
                label={"Ruqyya Pending"}
                count={3}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row gy-4 mt-5">
        <span class="text-sm fw-medium text-secondary-light ">Today Complete</span>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:digital-out-of-home-outline-sharp"}
                label={"Booking Request"}
                count={12}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:bath-private"}
                label={"Ruqyya Request"}
                count={9}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:airline-seat-flat-angled-rounded"}
                label={"Hizama Request"}
                count={3}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default page;
