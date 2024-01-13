import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header login="Login" />
      <main className="flex-grow flex-shrink-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
