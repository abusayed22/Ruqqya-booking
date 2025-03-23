import Link from "next/link";
import React, { useState } from "react";

const Dropdown = ({ label, value, onSelect}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (item) => {
    setSelected(item);   // Update the selected item in the dropdown
    onSelect(item);      // Call the parent callback to update the parent's state
  };

  return (
    <div className="dropdown w-full">
      <label className="form-label">{label}*</label>
      <button
        className="btn text-capitalize text-primary-600 hover-text-primary px-18 py-11 dropdown-toggle toggle-icon show border w-100"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selected || "Select"}
      </button>
      <ul className="dropdown-menu w-100">
        {value?.map((item, index) => (
          <li key={index}>
            <Link
              onClick={() => handleSelect(item)}
              className="dropdown-item px-16 text-capitalize py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 w-full"
              href="#"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
