import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, TrendingUp } from "lucide-react";

interface PricingProps {
  onGetStarted: (userType: 'vendor' | 'supplier') => void;
}

const Pricing = ({ onGetStarted }: PricingProps) => {
  const vendorPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for new vendors getting started",
      features: [
        "Browse suppliers catalog",
        "Basic messaging with suppliers",
        "Order tracking",
        "Mobile app access",
        "Email support"
      ],
      highlighted: false,
      userType: 'vendor' as const
    },
    {
      name: "Professional",
      price: "₹299",
      period: "/month",
      description: "For growing food businesses",
      features: [
        "Everything in Starter",
        "Priority supplier matching",
        "Bulk order discounts",
        "Analytics dashboard",
        "Phone support",
        "Custom delivery scheduling"
      ],
      highlighted: true,
      userType: 'vendor' as const
    },
    {
      name: "Enterprise",
      price: "₹999",
      period: "/month",
      description: "For large vendor networks",
      features: [
        "Everything in Professional",
        "Multi-location management",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options"
      ],
      highlighted: false,
      userType: 'vendor' as const
    }
  ];

  const supplierPlans = [
    {
      name: "Basic",
      price: "₹199",
      period: "/month",
      description: "Start selling to local vendors",
      features: [
        "List up to 50 products",
        "Basic analytics",
        "Order management",
        "Mobile app access",
        "Email support"
      ],
      highlighted: false,
      userType: 'supplier' as const
    },
    {
      name: "Growth",
      price: "₹499",
      period: "/month",
      description: "Expand your reach and sales",
      features: [
        "Unlimited product listings",
        "Advanced analytics",
        "Priority placement",
        "Bulk order tools",
        "Phone support",
        "Inventory management"
      ],
      highlighted: true,
      userType: 'supplier' as const
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      description: "Maximum visibility and features",
      features: [
        "Everything in Growth",
        "Featured supplier badge",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Regional expansion tools"
      ],
      highlighted: false,
      userType: 'supplier' as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free, upgrade anytime.
          </p>
        </div>

        {/* Vendor Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-6 py-3 mb-4">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold text-accent-foreground">For Vendors</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Street Food Vendor Plans</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {vendorPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.highlighted ? 'border-2 border-primary shadow-glow scale-105' : 'border border-border'} transition-all duration-300 hover:shadow-warm`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? 'vendor' : 'outline'}
                    onClick={() => onGetStarted(plan.userType)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supplier Plans */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/20 rounded-full px-6 py-3 mb-4">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-secondary-foreground">For Suppliers</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Ingredient Supplier Plans</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {supplierPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.highlighted ? 'border-2 border-secondary shadow-card scale-105' : 'border border-border'} transition-all duration-300 hover:shadow-warm`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-secondary text-secondary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="py-4">
                    <span className="text-4xl font-bold text-secondary">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? 'supplier' : 'outline'}
                    onClick={() => onGetStarted(plan.userType)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16 pt-12 border-t border-border">
          <p className="text-muted-foreground mb-4">Trusted by 500+ vendors and 100+ suppliers across India</p>
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;