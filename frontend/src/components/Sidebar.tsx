import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaFlask,
  FaTasks,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";

import { MdElectricBolt } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";

const AdminSidebar: React.FC = () => {
  const sidebarItems = [
    { label: "Studenti", icon: <FaUsers /> },
    { label: "Nastavne grupe", icon: <FaChalkboardTeacher /> },
    { label: "Laboratorijske grupe", icon: <FaFlask /> },
    { label: "Laboratorijske vježbe", icon: <MdElectricBolt /> },
    { label: "Zadaće", icon: <FaTasks /> },
    { label: "Kontinuirana nastava", icon: <LuFileStack /> },
    { label: "Ispiti", icon: <FaClipboardList /> },
  ];

  // State to keep track of the selected item
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="w-[17%] bg-[#232941] text-white p-4 flex flex-col h-[100%] justify-around">
      {/* Sidebar Content */}
      <ol className=" flex flex-col gap-2 sidebarListItem">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`${selectedItem === item.label ? "selected" : ""}`}
            onClick={() => setSelectedItem(item.label)}
          >
            <Link
              to={`/dashboard/${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center"
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AdminSidebar;
