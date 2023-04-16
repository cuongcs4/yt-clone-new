import React from "react";

const Popup = (props) => {
  const handleConfirm = () => {
    props.onConfirm();
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <div className="flex items-center justify-center confirm-popup fixed top-0 bottom-0 left-0 right-0 z-[999] dark:bg-slate-100/[0.3] bg-slate-600/[0.4]">
      <div className="flex flex-col confirm-container bg-white py-4 px-8 lg:w-[400px]">
        <div className=" message text-xl font-semibold mb-8 dark:text-black">{props.message}</div>
        <div className="actions flex items-center justify-end text-lg">
          <button className="px-4 mr-5 bg-green-300 rounded-lg font-semibold" onClick={handleCancel}>No</button>
          <button className="px-4 bg-red-600 rounded-lg font-semibold" onClick={handleConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
