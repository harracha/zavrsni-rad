// import React from "react";
// import landingImage from "../resources/eletehnika.webp"; // Replace with the actual path to your image

// const LandingPage: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <img
//         src={landingImage}
//         alt="Landing"
//         className="max-w-[70%] max-h-40vh mb-8"
//       />
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Statistička aplikacija</h1>
//         <p className="text-lg mb-4">
//           Dobrodošli u novi sustav za praćenje uspjeha studenata.
//         </p>
//         <p className="text-lg">Osnove elektrotehnike.</p>
//         {/* Add more lines as needed */}
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import landingImage from "../resources/eletehnika.webp"; // Replace with the actual path to your image

const LandingPage: React.FC = () => {
  return (
    <div
      className="flex flex-col h-[100%] items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <div className="text-white text-center relative z-10">
        <h1 className="text-3xl font-bold mb-4">Statistička aplikacija</h1>
        <p className="text-lg mb-4">
          Dobrodošli u novi sustav za praćenje uspjeha studenata.
        </p>
        <p className="text-lg">Osnove elektrotehnike.</p>
        {/* Add more lines as needed */}
      </div>
    </div>
  );
};

export default LandingPage;
