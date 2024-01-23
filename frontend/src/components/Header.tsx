// const Header: React.FC<headerProps> = (props) => {
//   return (
//     <div className="flex flex-col mt-8 md:mt-0 md:flex-row p-5 border-b-[1px] border-neutral-weak bg-section-strong gap-10 justify-between bg-gray-800">
//       <div className="flex flex-col gap-3">
//         <div className="title-1 text-neutral">{"Osnove elektrotehnike"}</div>
//         <div className="body-2 text-neutral">{"infoMessage"}</div>
//       </div>
//       <div className=" gap-2 items-center hidden md:flex">{props.login}</div>
//       <div className=" gap-2 items-center flex flex-row-reverse md:hidden z-0">
//         {"actions"}
//       </div>
//     </div>
//   );
// };

// export default Header;

// import { useNavigate } from "react-router-dom";

// interface HeaderProps {
//   login: string;
//   userEmail?: string;
//   userRole?: string;
// }

// const Header: React.FC<HeaderProps> = (props) => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/login"); // Replace '/login' with the actual path to your login page
//   };

//   return (
//     <div className="flex flex-col mt-8 md:mt-0 md:flex-row p-5 border-b-[1px] border-neutral-weak bg-section-strong gap-10 justify-between bg-gray-800">
//       <div className="flex flex-col gap-3">
//         <div className="title-1 text-neutral">
//           {/* Wrap login text inside a button */}
//           <div className=" gap-2 items-center hidden md:flex">
//             Osnove Elektrotehnike
//           </div>
//         </div>
//         <div className="body-2 text-neutral">{"infoMessage"}</div>
//       </div>
//       <button className="text-neutral p-2" onClick={handleLoginClick}>
//         {props.login}
//       </button>

//       <div className=" gap-2 items-center flex flex-row-reverse md:hidden z-0">
//         {"actions"}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  login: string;
  userEmail?: string;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Replace '/login' with the actual path to your login page
  };

  return (
    <div className="flex items-center justify-between p-5 border-b-[1px] border-neutral-weak bg-section-strong bg-gray-800">
      {/* Left side - Image */}
      <div className="flex items-center">
        <img
          src="../resources/fer_logo.jpg" // Replace with the path to your image
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        {/* <div className="title-1 text-neutral">Osnove Elektrotehnike</div> */}
      </div>

      {/* Center - Text */}
      <div className="flex flex-col gap-3 items-center">
        <div className="title-1 text-neutral hidden md:flex">
          Osnove Elektrotehnike
        </div>
      </div>

      {/* Right side - Login Button or User Info */}
      <div className="flex items-center gap-2">
        {props.userEmail && props.userRole ? (
          <div className="hidden md:flex flex-col text-neutral text-sm">
            <div>{props.userEmail}</div>
            <div>{props.userRole}</div>
          </div>
        ) : (
          <button className="text-neutral p-2" onClick={handleLoginClick}>
            {props.login}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
