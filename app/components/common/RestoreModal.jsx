import React from "react";

import CrossIcon from "../../assets/main/36-x.svg";

import RestoreIcon from "../../assets/main/56-icon.svg";
import Image from "next/image";

import { setShowRestoreModal } from "../../../lib/features/deleted-items/deletedItemsSlice";
import { useDispatch, useSelector } from "react-redux";

const RestoreModal = () => {
  const { showRestoreModal } = useSelector((state) => state.deletedItems);
  const dispatch = useDispatch();
  return (
    showRestoreModal && (
      <div className=" bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
        {/* First row */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Image src={RestoreIcon} alt="RestoreIcon" />
            <p className="font-bold text-xs lg:text-base">Restore Item</p>
          </div>
          <div
            onClick={() => {
              dispatch(setShowRestoreModal(false));
            }}
            className="cursor-pointer"
          >
            <Image src={CrossIcon} alt="CrossIcon" />
          </div>
        </div>
        {/* Second row */}
        <div>
          <p className="text-xs lg:text-base">
            Are you sure you want to restore this item? Restoring it will add it
            back to your inventory.
          </p>
        </div>
        <div className="flex space-x-2 lg:space-x-4">
          <div
            onClick={() => {
              dispatch(setShowRestoreModal(false));
            }}
            className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 font-semibold rounded-lg flex-1 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              dispatch(setShowRestoreModal(false));
            }}
            className="flex bg-[#78FFB6] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-black font-bold hover:bg-[#49fb9c] cursor-pointer"
          >
            Yes, Restore
          </div>
        </div>
      </div>
    )
  );
};

export default RestoreModal;
