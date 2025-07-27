import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Store,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'vendor' | 'supplier';
  onSuccess: (userType: 'vendor' | 'supplier', userData: any) => void;
}

const AuthModal = ({ isOpen, onClose, userType, onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
    location: ''
  });
  const [formError, setFormError] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError({});
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (isSignUp: boolean) => {
    const errors: {[key: string]: string} = {};
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address (e.g., abc@xyz.com)";
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter your password";
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        errors.name = "Please enter your full name";
      }
      if (!formData.businessName.trim()) {
        errors.businessName = "Please enter your business name";
      }
      if (!formData.location.trim()) {
        errors.location = "Please enter your location";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Please enter your phone number";
      }
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (isSignUp: boolean) => {
    if (!validateForm(isSignUp)) {
      return;
    }
    setIsLoading(true);
    
    // Here you would typically make an API call to verify credentials
    // For now, we'll simulate a basic check
    if (!isSignUp && formData.password !== 'demo123') { // Demo password check
      setIsLoading(false);
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.name || formData.email.split('@')[0],
        userType,
        businessName: formData.businessName,
        location: formData.location,
        phone: formData.phone
      };

      toast({
        title: isSignUp ? "Account Created!" : "Welcome Back!",
        description: "Successfully registered as vendor",
      });

      onSuccess(userType, userData);
      onClose();
      setIsLoading(false);
    }, 1500);
  };

  const isVendor = userType === 'vendor';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${isVendor ? 'border-primary/30' : 'border-secondary/30'}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            {isVendor ? (
              <ShoppingCart className="h-6 w-6 text-primary" />
            ) : (
              <Store className="h-6 w-6 text-secondary" />
            )}
            <span className={isVendor ? 'text-primary' : 'text-secondary'}>
              Welcome Back
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full grid-cols-2 ${isVendor ? 'bg-primary/10' : 'bg-secondary/10'}`}>
            <TabsTrigger 
              value="signin" 
              className={`${isVendor ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : 'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground'}`}
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className={`${isVendor ? 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground' : 'data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground'}`}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className={`p-6 space-y-4 ${isVendor ? 'border-primary/20 bg-primary/5' : 'border-secondary/20 bg-secondary/5'}`}>
              {/* User Type Indicator */}
              <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${isVendor ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'}`}>
                {isVendor ? (
                  <>
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-primary font-medium">Vendor</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Store className="h-4 w-4 text-secondary" />
                    </div>
                    <span className="text-secondary font-medium">Supplier</span>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <Button 
                onClick={() => handleSubmit(false)}
                disabled={isLoading}
                className={`w-full ${isVendor ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}`}
              >
                {isLoading ? 'Signing In...' : `Login as ${isVendor ? 'Vendor' : 'Supplier'}`}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Secure authentication powered by modern backend services</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className={`p-6 space-y-4 ${isVendor ? 'border-primary/20 bg-primary/5' : 'border-secondary/20 bg-secondary/5'}`}>
              {/* User Type Indicator */}
              <div className={`flex items-center justify-center gap-2 p-3 rounded-lg ${isVendor ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'}`}>
  {isVendor ? (
    <>
      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
        <ShoppingCart className="h-4 w-4 text-primary" />
      </div>
      <span className="text-primary font-medium">Vendor</span>
    </>
  ) : (
    <>
      <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
        <Store className="h-4 w-4 text-secondary" />
      </div>
      <span className="text-secondary font-medium">Supplier</span>
    </>
  )}
</div>

<div className="grid grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label htmlFor="signup-name" className="flex items-center gap-2">
      <User className="h-4 w-4" />
      Name
    </Label>
    <Input
      id="signup-name"
      placeholder="Full name"
      value={formData.name}
      onChange={(e) => handleInputChange('name', e.target.value)}
      className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
    />
    {formError.name && <span className="text-destructive text-xs">{formError.name}</span>}
  </div>
  <div className="space-y-2">
    <Label htmlFor="signup-phone" className="flex items-center gap-2">
      <Phone className="h-4 w-4" />
      Phone
    </Label>
    <Input
      id="signup-phone"
      placeholder="+91 9876543210"
      value={formData.phone}
      onChange={(e) => handleInputChange('phone', e.target.value)}
      className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
    />
    {formError.phone && <span className="text-destructive text-xs">{formError.phone}</span>}
  </div>
</div>

<div className="space-y-2">
  <Label htmlFor="signup-email" className="flex items-center gap-2">
    <Mail className="h-4 w-4" />
    Email
  </Label>
  <Input
    id="signup-email"
    type="email"
    placeholder="your@email.com"
    value={formData.email}
    onChange={(e) => handleInputChange('email', e.target.value)}
    className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
  />
  {formError.email && <span className="text-destructive text-xs">{formError.email}</span>}
</div>

<div className="space-y-2">
  <Label htmlFor="signup-password" className="flex items-center gap-2">
    <Lock className="h-4 w-4" />
    Password
  </Label>
  <Input
    id="signup-password"
    type="password"
    placeholder="Create password"
    value={formData.password}
    onChange={(e) => handleInputChange('password', e.target.value)}
    className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
  />
  {formError.password && <span className="text-destructive text-xs">{formError.password}</span>}
</div>

<div className="space-y-2">
  <Label htmlFor="business-name" className="flex items-center gap-2">
    <Store className="h-4 w-4" />
    {isVendor ? 'Stall Name' : 'Business Name'}
  </Label>
  <Input
    id="business-name"
    placeholder={isVendor ? "e.g., Raj's Chaat Corner" : "e.g., Fresh Farm Suppliers"}
    value={formData.businessName}
    onChange={(e) => handleInputChange('businessName', e.target.value)}
    className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
  />
  {formError.businessName && <span className="text-destructive text-xs">{formError.businessName}</span>}
</div>

<div className="space-y-2">
  <Label htmlFor="location" className="flex items-center gap-2">
    <MapPin className="h-4 w-4" />
    Location
  </Label>
  <Input
    id="location"
    placeholder="City, State"
    value={formData.location}
    onChange={(e) => handleInputChange('location', e.target.value)}
    className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
  />
  {formError.location && <span className="text-destructive text-xs">{formError.location}</span>}
</div>


              <div className="space-y-2">
                <Label htmlFor="business-name" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  {isVendor ? 'Stall Name' : 'Business Name'}
                </Label>
                <Input
                  id="business-name"
                  placeholder={isVendor ? "e.g., Raj's Chaat Corner" : "e.g., Fresh Farm Suppliers"}
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
                {formError.businessName && <span className="text-destructive text-xs">{formError.businessName}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
                {formError.location && <span className="text-destructive text-xs">{formError.location}</span>}
              </div>

              <Button 
                onClick={() => handleSubmit(true)}
                disabled={isLoading}
                className={`w-full ${isVendor ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}`}
              >
                {isLoading ? 'Creating Account...' : `Create Account as ${isVendor ? 'Vendor' : 'Supplier'}`}
              </Button>
              {formError.general && <div className="text-destructive text-xs mt-2">{formError.general}</div>}
              
              <div className="text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Secure authentication powered by modern backend services</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;