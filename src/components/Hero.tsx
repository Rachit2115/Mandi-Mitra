import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, TrendingUp, Star } from "lucide-react";
import heroImage from "@/assets/hero-marketplace.jpg";

interface HeroProps {
  onGetStarted: (userType: 'vendor' | 'supplier') => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative pt-24 pb-16 px-4 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        {/* Static Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-6 py-3 border border-primary/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">India's #1 Street Food Marketplace</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block">Connect.</span>
                <span className="block">Source.</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Grow.
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                The first marketplace connecting Indian street food vendors with 
                trusted suppliers. Source quality ingredients at competitive prices, 
                build lasting partnerships, and grow your business.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => onGetStarted('vendor')}
                className="flex items-center gap-2 text-lg px-8 py-6 group"
              >
                <span>Start as Vendor</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="marketplace" 
                size="lg"
                onClick={() => onGetStarted('supplier')}
                className="flex items-center gap-2 text-lg px-8 py-6 group"
              >
                <span>Join as Supplier</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap gap-8 pt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">500+</div>
                  <div className="text-sm text-muted-foreground">Active Vendors</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Shield className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300">100%</div>
                  <div className="text-sm text-muted-foreground">Verified Suppliers</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">30%</div>
                  <div className="text-sm text-muted-foreground">Cost Savings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative lg:order-first order-last animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img 
                src={heroImage} 
                alt="Indian street food marketplace" 
                className="w-full h-[600px] object-cover"
              />
              
              {/* Enhanced Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 mix-blend-overlay" />
              
              {/* Enhanced Floating Elements */}
              <div className="absolute top-8 right-8 bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <div className="text-lg font-semibold text-card-foreground">Fresh Ingredients</div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Delivered Daily • 100% Fresh</div>
              </div>
              
              <div className="absolute bottom-8 left-8 bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div className="text-lg font-semibold text-card-foreground">Trusted Network</div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">500+ Verified Partners</div>
              </div>
              
              {/* Floating Trust Indicators */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              
              <div className="absolute bottom-1/3 right-4 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
            
            {/* Enhanced Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-40 blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full opacity-40 blur-xl" />
            <div className="absolute top-1/2 -right-4 w-24 h-24 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-full opacity-30 blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;