import React from "react";
import "./SidebarHeader.css";

const SidebarHeader = () => {
  return (
    <div className="d-flex align-items-center sidebar mb-3 mb-md-0 text-dark text-decoration-none justify-content-between header">
      <div className="text-start h3">Boonmafarm</div>
      <div className="text-end btn btn-secondary">
        <i className="fa-regular fa-bell"></i>
      </div>
    </div>
  );
};

export default SidebarHeader;
