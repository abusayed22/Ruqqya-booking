import React from "react";
import DashboardWidget from "./DashboardWidget";
import { userDashboardDataFetching } from "@/lib/user/actions/userDashboardData";

const UserDashboard = async ({userId}) => {

    const { bookingReq, ruqqyaReq, hizamaReq, ruqyyaCom, hizamaCom ,ruqyyaRej,hizamaRej} =
        await userDashboardDataFetching(userId);

  return (
    <div>
      <div className="row gy-4">
        {/* <span className="text-sm fw-medium text-secondary-light ">Today</span> */}
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"material-symbols:digital-out-of-home-outline-sharp"}
                label={"Booking Request"}
                count={bookingReq}
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
                count={ruqqyaReq}
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
                count={hizamaReq}
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
                count={ruqyyaCom}
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
                count={hizamaCom}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"icon-park-twotone:success"}
                label={"Ruqyya Rejected"}
                count={ruqyyaRej}
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-sm-6">
          <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
            <div className="card-body p-0">
              <DashboardWidget
                icon={"icon-park-twotone:success"}
                label={"Hizama Rejected"}
                count={hizamaRej}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row gy-4 mt-5">
        <span className="text-sm fw-medium text-secondary-light ">Today Complete</span>
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

export default UserDashboard;
