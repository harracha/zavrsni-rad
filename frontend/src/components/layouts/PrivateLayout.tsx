import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import AdminSidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

// TODO -> IMPLEMENTIRATI PROVJERU ZA ADMIN/ASSISTANT/TEACHER I STUDENT ROLU
const PrivateLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header login="User" />
      <div className="flex flex-row flex-grow items-center">
        <AdminSidebar />
        <main className="flex-grow flex-shrink-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
