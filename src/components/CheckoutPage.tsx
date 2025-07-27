import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  CheckCircle,
  Package,
  Truck,
  Clock
} from "lucide-react";

interface CheckoutPageProps {
  orderItems: any[];
  totalAmount: number;
  onOrderComplete: (orderId: string) => void;
  onBack: () => void;
}

const CheckoutPage = ({ orderItems, totalAmount, onOrderComplete, onBack }: CheckoutPageProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Delivery Information
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'pincode', 'cardNumber', 'expiryDate', 'cvv', 'cardName'];
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData].trim()) {
        toast({
          title: "Missing Information",
          description: `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    // Phone validation
    if (formData.phone.length < 10) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = 'MM' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setOrderId(newOrderId);
      setOrderPlaced(true);
      setIsProcessing(false);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${newOrderId} has been confirmed`,
      });

      // Call parent callback after animation
      setTimeout(() => {
        onOrderComplete(newOrderId);
      }, 3000);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="animate-bounce mb-6">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </div>
            
            <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Thank you for your order</p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="text-lg font-bold text-green-700">{orderId}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>Order Confirmed</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Processing</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Truck className="h-4 w-4" />
                <span>Out for Delivery</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              You will receive updates via SMS and email
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Cart
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-mandi bg-clip-text text-transparent">
            Checkout
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="Name on card"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-mandi text-white py-3 text-lg font-semibold"
            >
              {isProcessing ? 'Processing Payment...' : `Place Order - ₹${totalAmount}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
