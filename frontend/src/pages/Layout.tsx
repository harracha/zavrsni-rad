import { useLocation, Routes, Route } from "react-router-dom";
import LandingPage from "../components/Homepage";
import StudentsPage from "../components/dashboard/Students";
import PrivateLayout from "../components/layouts/PrivateLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import { LoginPage } from "../components/Login";
import { useUser } from "../components/UserContext";
import ClassGroupsPage from "../components/dashboard/ClassGroups";
import { MidtermsPage } from "../components/dashboard/Midterms";

const Layout = () => {
  const location = useLocation();
  const isPrivate = location.pathname.startsWith("/dashboard");

  const { user } = useUser();

  return isPrivate ? (
    <PrivateLayout>
      {
        <Routes>
          <Route path="/dashboard" />
          <Route path="/dashboard/studenti" element={<StudentsPage />} />
          <Route
            path="/dashboard/nastavne-grupe"
            element={<ClassGroupsPage />}
          />
          <Route path="/dashboard/meduispiti" element={<MidtermsPage />} />
        </Routes>
      }
    </PrivateLayout>
  ) : (
    <PublicLayout>
      {
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      }
    </PublicLayout>
  );
};

export default Layout;
