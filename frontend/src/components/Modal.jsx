import React from "react";

export  function Modal({ open, onClose, children }) {
  if (!open) {
    return null;
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {children}

      </div>
    </div>
  );
}