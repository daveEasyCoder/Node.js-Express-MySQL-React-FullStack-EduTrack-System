import React from "react";

const Modal = ({setShowModal,message,subMessage}) => {
  return (
    <div className="bg-black/60 fixed inset-0 z-20 flex items-center justify-center">
      <div className="p-8 rounded-sm bg-white">
        <h1 className="font-bold text-gray-950 text-2xl mb-0">
          {message}
        </h1>
        <p className="text-sm mt-0 text-gray-800">{subMessage}</p>
        <button
          onClick={() => setShowModal(false)}
          className="border-0 bg-green-900 rounded-sm w-full py-1 text-white mt-4 cursor-pointer"
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
