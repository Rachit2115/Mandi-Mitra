import { 
  Search, 
  Shield, 
  TruckIcon, 
  Star, 
  Users, 
  BarChart3,
  MapPin,
  Clock,
  CreditCard
} from "lucide-react";

const Features = () => {
  const vendorFeatures = [
    {
      icon: Search,
      title: "Smart Search & Discovery",
      description: "Find verified suppliers by location, price, rating, and product quality with intelligent filtering."
    },
    {
      icon: Shield,
      title: "Trust & Verification",
      description: "All suppliers are verified with ratings, reviews, and trust scores from fellow vendors."
    },
    {
      icon: TruckIcon,
      title: "Reliable Delivery",
      description: "Track your orders in real-time with guaranteed delivery timelines and quality assurance."
    },
    {
      icon: Users,
      title: "Bulk Purchase Groups",
      description: "Join other vendors for bulk orders and get better prices on raw materials."
    },
    {
      icon: BarChart3,
      title: "Order Management",
      description: "Simple dashboard to manage orders, track expenses, and analyze your purchasing patterns."
    },
    {
      icon: Star,
      title: "Review System",
      description: "Rate suppliers and read authentic reviews to make informed purchasing decisions."
    }
  ];

  const supplierFeatures = [
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Connect with vendors in your delivery area and expand your customer base efficiently."
    },
    {
      icon: Clock,
      title: "Order Management",
      description: "Receive, accept, and track orders with real-time notifications and status updates."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Get paid instantly with secure payment gateway and transparent transaction history."
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for Indian street food vendors and suppliers
          </p>
        </div>

        {/* Vendor Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-4 text-accent">
            For Vendors
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Source quality ingredients, build trust, and grow your business
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendorFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-warm transition-all duration-300 hover:scale-105 border border-border/50"
              >
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4 shadow-glow">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Features */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-4 text-secondary">
            For Suppliers
          </h3>
          <p className="text-center text-muted-foreground mb-12">
            Reach more customers, manage orders efficiently, and grow your revenue
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {supplierFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-warm transition-all duration-300 hover:scale-105 border border-border/50"
              >
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4 shadow-warm">
                  <feature.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;