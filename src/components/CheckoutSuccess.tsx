import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CheckoutSuccessProps {
  orderId: string;
}

const CheckoutSuccess = ({ orderId }: CheckoutSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 z-50">
      <div className="text-center p-8 animate-fade-in">
        <div className="animate-scale-in mb-6">
          <div className="bg-success/20 rounded-full p-4 inline-block">
            <CheckCircle className="w-16 h-16 text-success" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 animate-slide-up delay-400">
          Order Placed Successfully!
        </h2>

        <p className="text-muted-foreground mb-6 animate-slide-up delay-500">
          Your order #{orderId} has been confirmed
        </p>

        <div className="space-x-4 animate-slide-up delay-600">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/track-order/${orderId}`)}
          >
            Track Order
          </Button>
          <Button onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
