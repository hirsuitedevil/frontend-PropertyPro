/* eslint-disable */ 
import React from "react";
import DropdownItem from "../DropdownItem";
import { MdSpaceDashboard } from "react-icons/md";
import { PiBuildings } from "react-icons/pi";
import { BsReceipt } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiContactsLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white w-50 p-4 border-r border-t">
      <div className="text-gray-500 text-sm font-semibold">MENU</div>
      <ul className="space-y-3">
        <DropdownItem
          icon={MdSpaceDashboard}
          name="Dashboard"
          link="/dashboard"
        />
        <DropdownItem icon={PiBuildings} name="Properties" link="/properties" />
        <DropdownItem
          icon={BsReceipt}
          name="Transactions"
          link="/transactions"
        />
        <DropdownItem
          icon={HiOutlineDocumentReport}
          name="Report"
          link="/report"
        />
        <DropdownItem
          icon={RiContactsLine}
          name="Residents and Leases"
          link="/leases"
        />
      </ul>
      <hr className="w-[90%] border-1 mt-2" />
      <div className="text-gray-500 text-sm font-semibold mt-4">OTHERS</div>
      <ul className="space-y-3">
        <DropdownItem
          icon={IoHelpCircleOutline}
          name="Help Center"
          link="/help"
        />
        <DropdownItem
          icon={MdOutlineFeedback}
          name="Provide Feedback"
          link="/feedback"
        />
        <DropdownItem
          icon={IoSettingsOutline}
          name="Settings"
          link="/settings"
        />
      </ul>
    </div>
  );
};

export default Sidebar;
