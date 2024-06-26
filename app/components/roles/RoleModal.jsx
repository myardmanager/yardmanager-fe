import Image from "next/image";
import React, { useEffect } from "react";
import DelIcon from "../../assets/main/35-trash.svg";
import CrossIcon from "../../assets/main/36-x.svg";
import SuccessIcon from "../../assets/main/40-successIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRole,
  setShowDeleteRoleModal,
  setShowSuccessModal,
} from "../../../lib/features/roles/roleSlice";
const RoleModal = () => {
  const dispatch = useDispatch();
  const { deleteRoleIndex, showDeleteRoleModal, showSuccessModal } =
    useSelector((state) => state.roles);

  // Disappear success modal after 3 seconds bc it doesnt have cross icon
  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => {
        dispatch(setShowDeleteRoleModal(false));
        dispatch(setShowSuccessModal(false));
      }, 3000);
    }
  }, [showSuccessModal]);
  return (
    <div
      className={`absolute z-20 w-full h-full  ${
        // Show the modal if either of them are true
        showDeleteRoleModal || showSuccessModal ? "block" : "hidden"
      }`}
    >
      {/* // Outer Black on whole screen till scroll end */}
      <div className="absolute z-20 bg-black opacity-50 w-full h-full"></div>
      {/* Container equal to screen to middle the modal */}
      <div className="w-full relative z-[60] h-screen flex justify-center items-center">
        {showDeleteRoleModal && (
          <div className=" bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
            {/* First row */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Image src={DelIcon} alt="DelIcon" />
                <p className="font-bold text-xs lg:text-base">Delete Invoice</p>
              </div>
              <div
                onClick={() => {
                  dispatch(setShowDeleteRoleModal(false));
                }}
                className="cursor-pointer"
              >
                <Image src={CrossIcon} alt="CrossIcon" />
              </div>
            </div>
            {/* Second row */}
            <div>
              <p className="text-xs lg:text-base">
                Are you sure you want to delete this role? Deleting it will
                remove all employees associated with this role from the system.
              </p>
            </div>
            <div className="flex space-x-2 lg:space-x-4">
              <div className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 hover:bg-gray-300 cursor-pointer">
                Cancel
              </div>
              <div
                onClick={() => {
                  dispatch(deleteRole(deleteRoleIndex));
                  dispatch(setShowDeleteRoleModal(false));
                }}
                className="flex bg-[#D32F2F] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-white hover:bg-[#B71C1C] cursor-pointer"
              >
                Yes, Delete
              </div>
            </div>
          </div>
        )}

        {/* Role Success Modal */}
        {showSuccessModal && (
          <div className="bg-white py-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col justify-center items-center">
            {/* First row */}
            <Image
              src={SuccessIcon}
              alt="SuccessIcon"
              width={50 * 2}
              height={50 * 2}
            />
            <p className="text-xs lg:text-base font-semibold">
              Role Permission changed Succesfuly
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleModal;
