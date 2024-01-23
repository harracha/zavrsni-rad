import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
    // <Router>
    //   {!useLocation().pathname.startsWith("/dashboard") ? (
    //     <PublicLayout>
    //       {
    //         <Routes>
    //           <Route path="/" Component={LandingPage} />
    //           <Route path="/login" Component={LoginPage} />
    //         </Routes>
    //       }
    //     </PublicLayout>
    //   ) : (
    //     <PrivateLayout>
    //       {
    //         <Routes>
    //           <Route path="/dashboard" Component={LandingPage} />
    //           <Route path="/dashboard/students" Component={LoginPage} />
    //         </Routes>
    //       }
    //     </PrivateLayout>
    //   )}
    // </Router>
  );
}

export default App;
