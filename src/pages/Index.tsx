import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import AuthModal from "@/components/auth/AuthModal";
import VendorDashboard from "@/components/dashboard/VendorDashboard";
import SupplierDashboard from "@/components/dashboard/SupplierDashboard";

const Index = () => {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    userType: 'vendor' | 'supplier';
  }>({ isOpen: false, userType: 'vendor' });

  const [user, setUser] = useState<{
    userData: any;
    userType: 'vendor' | 'supplier';
  } | null>(null);

  const handleLoginClick = (userType: 'vendor' | 'supplier') => {
    setAuthModal({ isOpen: true, userType });
  };

  const handleAuthSuccess = (userType: 'vendor' | 'supplier', userData: any) => {
    setUser({ userData, userType });
    setAuthModal({ isOpen: false, userType: 'vendor' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is logged in, show appropriate dashboard
  if (user) {
    if (user.userType === 'vendor') {
      return (
        <VendorDashboard 
          userData={user.userData} 
          onLogout={handleLogout} 
        />
      );
    } else {
      return (
        <SupplierDashboard 
          userData={user.userData} 
          onLogout={handleLogout} 
        />
      );
    }
  }

  // Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={handleLoginClick} />
      <Hero onGetStarted={handleLoginClick} />
      <Features />
      <HowItWorks onGetStarted={handleLoginClick} />
      <Pricing onGetStarted={handleLoginClick} />
      <Footer />
      
      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, userType: 'vendor' })}
        userType={authModal.userType}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
