import { UserCheck, Search, ShoppingCart, TruckIcon, Star, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksProps {
  onGetStarted: (userType: 'vendor' | 'supplier') => void;
}

const HowItWorks = ({ onGetStarted }: HowItWorksProps) => {
  const vendorSteps = [
    {
      icon: UserCheck,
      title: "Sign Up",
      description: "Create your vendor account with basic business details"
    },
    {
      icon: Search,
      title: "Find Suppliers",
      description: "Browse verified suppliers by location, rating, and price"
    },
    {
      icon: ShoppingCart,
      title: "Place Orders",
      description: "Add items to cart and place orders with trusted suppliers"
    },
    {
      icon: TruckIcon,
      title: "Track Delivery",
      description: "Monitor your order status and receive quality ingredients"
    }
  ];

  const supplierSteps = [
    {
      icon: UserCheck,
      title: "Register",
      description: "Create supplier profile and get verified by our team"
    },
    {
      icon: ShoppingCart,
      title: "List Products",
      description: "Add your products with prices, quantities, and descriptions"
    },
    {
      icon: Star,
      title: "Receive Orders",
      description: "Get order notifications from nearby vendors"
    },
    {
      icon: CreditCard,
      title: "Get Paid",
      description: "Complete deliveries and receive instant payments"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              RasoiLink
            </span>{" "}
            Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to connect, source, and grow your food business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Vendors */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-accent">
              For Vendors
            </h3>
            <div className="space-y-8">
              {vendorSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow">
                      <step.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {index < vendorSteps.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-hero mx-auto mt-4 opacity-30" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Suppliers */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-secondary">
              For Suppliers
            </h3>
            <div className="space-y-8">
              {supplierSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center shadow-warm">
                      <step.icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    {index < supplierSteps.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-secondary mx-auto mt-4 opacity-30" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 text-primary-foreground shadow-glow">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of vendors and suppliers already using RasoiLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => onGetStarted('vendor')}
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Start as Vendor
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onGetStarted('supplier')}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 font-semibold"
              >
                Join as Supplier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;