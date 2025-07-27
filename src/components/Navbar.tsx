import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Menu, 
  ShoppingCart, 
  User, 
  Store, 
  TruckIcon 
} from "lucide-react";

interface NavbarProps {
  onLoginClick: (userType: 'vendor' | 'supplier') => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-start">
  <div className="w-16 h-16 bg-gradient-mandi-mitra rounded-2xl flex items-center justify-center shadow-glow transform hover:scale-105 transition-transform">
    <img 
      src={require("@/assets/mandi-mitra-logo.jpg")} 
      alt="Mandi Mitra Logo" 
      className="w-12 h-12 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
    <ShoppingCart className="h-10 w-10 text-white hidden" />
  </div>
  <div className="flex flex-col items-start ml-1 mt-1">
    <div className="flex items-center space-x-1">
      <span className="text-3xl font-extrabold bg-gradient-festival bg-clip-text text-transparent drop-shadow-md" style={{fontFamily: 'Devanagari, serif'}}>मंडी</span>
      <span className="text-3xl font-extrabold bg-gradient-cool bg-clip-text text-transparent drop-shadow-md">Mitra</span>
    </div>
    <span className="text-xs sm:text-sm md:text-base font-semibold bg-gradient-mandi-mitra bg-clip-text text-transparent mt-1 tracking-wide drop-shadow-sm">From Farm to Thela — Together</span>
  </div>
</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <div className="flex items-center space-x-3">
              <Button 
                variant="vendor" 
                onClick={() => onLoginClick('vendor')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Vendor Login
              </Button>
              <Button 
                variant="supplier" 
                onClick={() => onLoginClick('supplier')}
                className="flex items-center gap-2"
              >
                <TruckIcon className="h-4 w-4" />
                Supplier Login
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <div className="flex flex-col space-y-6 mt-8">
                  <a 
                    href="#features" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </a>
                  <a 
                    href="#how-it-works" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </a>
                  <a 
                    href="#pricing" 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </a>
                  <div className="flex flex-col space-y-3 pt-4">
                    <Button 
                      variant="vendor" 
                      onClick={() => {
                        onLoginClick('vendor');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 justify-center"
                    >
                      <User className="h-4 w-4" />
                      Vendor Login
                    </Button>
                    <Button 
                      variant="supplier" 
                      onClick={() => {
                        onLoginClick('supplier');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 justify-center"
                    >
                      <TruckIcon className="h-4 w-4" />
                      Supplier Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;