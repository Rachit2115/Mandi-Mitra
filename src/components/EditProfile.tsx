import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Store, 
  Camera,
  Save,
  ArrowLeft
} from "lucide-react";

interface EditProfileProps {
  userData: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    location?: string;
    userType: 'vendor' | 'supplier';
    avatar?: string;
  };
  onSave: (updatedData: any) => void;
  onBack: () => void;
}

const EditProfile = ({ userData, onSave, onBack }: EditProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    businessName: userData.businessName || '',
    location: userData.location || '',
    avatar: userData.avatar || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address (e.g., abc@xyz.com)",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.businessName.trim()) {
      toast({
        title: "Business Name Required",
        description: `Please enter your ${userData.userType === 'vendor' ? 'stall name' : 'business name'}`,
        variant: "destructive"
      });
      return false;
    }

    if (!formData.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter your location",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        ...userData,
        ...formData
      };

      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated",
      });

      onSave(updatedData);
      setIsLoading(false);
    }, 1000);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const isVendor = userData.userType === 'vendor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-mandi bg-clip-text text-transparent">
            Edit Profile
          </h1>
        </div>

        <Card className={`${isVendor ? 'border-primary/20' : 'border-secondary/20'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isVendor ? 'text-primary' : 'text-secondary'}`}>
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className={`text-2xl ${isVendor ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer ${isVendor ? 'bg-primary text-white' : 'bg-secondary text-white'} hover:opacity-80 transition-opacity`}
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-600">Click the camera icon to change your profile picture</p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  {isVendor ? 'Stall Name' : 'Business Name'}
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder={isVendor ? "e.g., Raj's Chaat Corner" : "e.g., Fresh Farm Suppliers"}
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  className={`${isVendor ? 'focus:ring-primary focus:border-primary' : 'focus:ring-secondary focus:border-secondary'}`}
                />
              </div>
            </div>

            {/* User Type Badge */}
            <div className={`p-4 rounded-lg ${isVendor ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'}`}>
              <div className="flex items-center gap-2">
                <Store className={`h-5 w-5 ${isVendor ? 'text-primary' : 'text-secondary'}`} />
                <span className={`font-medium ${isVendor ? 'text-primary' : 'text-secondary'}`}>
                  Account Type: {isVendor ? 'Vendor' : 'Supplier'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {isVendor 
                  ? 'You can sell products directly to customers in the marketplace'
                  : 'You can supply products to vendors and manage wholesale orders'
                }
              </p>
            </div>

            {/* Save Button */}
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className={`w-full ${isVendor ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'} text-white py-3 text-lg font-semibold`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
