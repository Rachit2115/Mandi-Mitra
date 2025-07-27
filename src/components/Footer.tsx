import { ShoppingCart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center shadow-glow">
                <ShoppingCart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                RasoiLink
              </span>
            </div>
            <p className="text-muted-foreground">
              Connecting Indian street food vendors with trusted suppliers for sustainable growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="block text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="block text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#support" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>

          {/* For Vendors */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">For Vendors</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Find Suppliers
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Track Orders
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Bulk Purchase
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Reviews
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@rasoilink.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 RasoiLink. All rights reserved. Made with ❤️ for Indian street food vendors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;