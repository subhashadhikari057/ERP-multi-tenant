import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Spotlight from '../components/Spotlight';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
       <Spotlight/>
      <Navbar/>
      <main className="flex-grow">{children}</main>
      {/* Later: Add <Footer /> here */}
    </div>
  );
};

export default MainLayout;
