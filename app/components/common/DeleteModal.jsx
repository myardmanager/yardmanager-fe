import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteInventory } from "../../../lib/features/inventory/inventorySlice";
import { deletePart } from "../../../lib/features/parts/partSlice";
import { deleteLocation } from "../../../lib/features/locations/locationActions";
import { deleteInvoice } from "../../../lib/features/invoice/invoiceSlice";
import { deleteRole } from "../../../lib/features/roles/roleSlice";

import { deleteVehicle } from "../../../lib/features/vehicle/vehicleSlice";
import { deleteEmployee } from "../../../lib/features/employee/employeeSlice";

import DelIcon from "../../assets/main/35-trash.svg";
import CrossIcon from "../../assets/main/36-x.svg";
import Image from "next/image";
import { setShowDeleteModal } from "../../../lib/features/shared/sharedSlice";

import {
  deleteItemsPermanently,
  setShowRestoreModal,
} from "../../../lib/features/deleted-items/deletedItemsSlice";
const DeleteModal = () => {
  const dispatch = useDispatch();
  const { selectedItem, showDeleteModal, showSuccessModal, currentPage } =
    useSelector((state) => state.shared);
  const deleteRow = () => {
    switch (currentPage) {
      case "Inventory":
        dispatch(deleteInventory(selectedItem));
        break;
      case "Invoices":
        dispatch(deleteInvoice(selectedItem));
        break;
      case "Locations":
        dispatch(deleteLocation(selectedItem._id));
        break;
      case "Parts":
        dispatch(deletePart(selectedItem));
      case "Roles":
        dispatch(deleteRole(selectedItem));
        break;
      case "DeletedItems":
        dispatch(deleteItemsPermanently(selectedItem));
        break;
      case "Vehicle":
        dispatch(deleteVehicle(selectedItem));
        break;
      case "Employee":
        dispatch(deleteEmployee(selectedItem));
      default:
        break;
    }
    dispatch(setShowDeleteModal(false));
  };

  const renderHeadText = () => {
    switch (currentPage) {
      case "Inventory":
        return "Delete Inventory";
      case "Invoices":
        return "Delete Invoice";
      case "Locations":
        return "Delete Location";

      case "Parts":
        return "Delete Part";
      case "Roles":
        return "Delete Role";
      case "DeletedItems":
        return "Delete Permanently";
      case "Vehicle":
        return "Delete Part";
      case "Employee":
        return "Remove Employee";
      default:
        break;
    }
  };

  const renderMainText = () => {
    switch (currentPage) {
      case "Inventory":
        return "Are you sure you want to delete this part? Deleted parts will be moved to Deleted Items.";
        break;
      case "Invoices":
        return "Your Invoice will be Permanently Deleted. Are you sure you want to delete it? ";
        break;
      case "Locations":
        return "Are you sure you want to delete this location? Deleting it will completely remove it from the system.";
        break;
      case "Parts":
        return "Are you sure you want to delete this part? Deleting it will completely remove it from the system.";
      case "Roles":
        return "Are you sure you want to delete this role? Deleting it will remove all employees associated with this role from the system.";
        break;
      case "DeletedItems":
        return "Are you sure you want to delete this part? Deleting it will completely remove it from the system.";
      case "Vehicle":
        return "Are you sure you want to delete this part? Deleting it will permanently remove it from your system.";
      case "Employee":
        return "Are you sure you want to remove this employee? Removing them will permanently remove their access to your system.";
      default:
        break;
    }
  };
  return (
    showDeleteModal && (
      <div className=" bg-white p-4 w-1/2 lg:w-1/3 rounded-lg flex flex-col space-y-4 lg:space-y-8">
        {/* First row */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Image src={DelIcon} alt="DelIcon" />
            <p className="font-bold text-xs lg:text-base">{renderHeadText()}</p>
          </div>
          <div
            onClick={() => {
              dispatch(setShowDeleteModal(false));
            }}
            className="cursor-pointer"
          >
            <Image src={CrossIcon} alt="CrossIcon" />
          </div>
        </div>
        {/* Second row */}
        <div>
          <p className="text-xs lg:text-base">{renderMainText()}</p>
        </div>
        <div className="flex space-x-2 lg:space-x-4">
          <div
            onClick={() => {
              dispatch(setShowDeleteModal(false));
            }}
            className="flex p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </div>
          <div
            onClick={deleteRow}
            className="flex bg-[#D32F2F] p-2 lg:p-4 text-xs lg:text-base justify-center items-center border border-gray-300 rounded-lg flex-1 text-white hover:bg-[#B71C1C] cursor-pointer"
          >
            Yes, Delete
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
