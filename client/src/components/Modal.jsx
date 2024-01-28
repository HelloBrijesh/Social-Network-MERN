import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`
  ${
    isOpen ? "block" : "hidden"
  } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
   bg-white rounded-md z-20 shadow-2xl shadow-black w-full md:w-auto "
`}
    >
      <div className="relative w-full h-full rounded-lg shadow-3xl">
        <button
          className="absolute top-0 right-5 font-semibold text-xl me-2 mt-3"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
