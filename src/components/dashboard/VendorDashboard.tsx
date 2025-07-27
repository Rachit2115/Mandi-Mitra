import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Star, 
  ShoppingCart, 
  TruckIcon, 
  Filter,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  User,
  LogOut
} from "lucide-react";
import vendorProfileImage from "@/assets/vendor-profile.jpg";

interface UserData {
  name?: string;
  email?: string;
  businessName?: string;
  location?: string;
  phone?: string;
}

interface VendorDashboardProps {
  userData: UserData;
  onLogout: () => void;
}

interface Order {
  id: string;
  supplier: string;
  items: string;
  amount: string;
  status: string;
  date: string;
}

interface Supplier {
  id: number;
  name: string;
  location: string;
  rating: number;
  deliveryTime: string;
  specialties: string[];
  price: string;
  product: string;
  verified: boolean;
  distance: string;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ userData, onLogout }) => {
  const { toast } = useToast();

  // UI States
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [nearMeEnabled, setNearMeEnabled] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [priceRange, setPriceRange] = useState("any");
  const [ratingFilter, setRatingFilter] = useState("any");
  const [deliveryFilter, setDeliveryFilter] = useState("any");
  const [showCart, setShowCart] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  // Mock data
  const [ordersState, setOrdersState] = useState<Order[]>([
    {
      id: "ORD001",
      supplier: "Fresh Farm Suppliers",
      items: "5kg Tomatoes, 3kg Onions",
      amount: "₹1,200",
      status: "delivered",
      date: "2024-01-26"
    },
    {
      id: "ORD002", 
      supplier: "Spice Master Co.",
      items: "500g Garam Masala, 1kg Red Chili",
      amount: "₹850",
      status: "in-transit",
      date: "2024-01-27"
    },
    {
      id: "ORD003",
      supplier: "Mumbai Flour Mills",
      items: "10kg Wheat Flour",
      amount: "₹450",
      status: "pending",
      date: "2024-01-27"
    }
  ]);

  const suppliers: Supplier[] = [
    {
      id: 1,
      name: "Fresh Farm Suppliers",
      location: "Connaught Place, Delhi",
      rating: 4.8,
      deliveryTime: "2-4 hours",
      specialties: ["Vegetables", "Fruits", "Herbs"],
      price: "₹150/kg",
      product: "Fresh Tomatoes",
      verified: true,
      distance: "1.2 km"
    },
    {
      id: 2,
      name: "Spice Master Co.",
      location: "Chandni Chowk, Delhi",
      rating: 4.9,
      deliveryTime: "1-2 hours",
      specialties: ["Spices", "Masalas", "Dry Fruits"],
      price: "₹200/kg",
      product: "Garam Masala",
      verified: true,
      distance: "0.8 km"
    }
  ];

  // Edit Profile State
  const [editProfile, setEditProfile] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    businessName: userData?.businessName || "",
    location: userData?.location || "",
    phone: userData?.phone || ""
  });

  const [profileError, setProfileError] = useState<{email?: string; general?: string}>({});

  // Helper functions
  const getStatusIcon = (status: string): JSX.Element | null => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-transit":
        return <TruckIcon className="h-4 w-4 text-primary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-accent" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "delivered":
        return "secondary";
      case "in-transit":
        return "default";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  // Event handlers
  const handleAddToCart = (supplier: Supplier): void => {
    const cartItem = {
      id: Date.now(),
      supplierId: supplier.id,
      supplierName: supplier.name,
      product: supplier.product,
      price: supplier.price,
      quantity: 1
    };
    setCart(prev => [...prev, cartItem]);
    toast({
      title: "Added to Cart",
      description: `${supplier.product} from ${supplier.name} added to cart.`
    });
  };

  const handleRemoveFromCart = (itemId: number): void => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Removed from Cart",
      description: "Item removed from cart."
    });
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number): void => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = (): void => {
    toast({
      title: "Order Placed!",
      description: `Checkout total: ₹${getTotalPrice()}. Order placed successfully!`
    });
    setCart([]);
    setShowCart(false);
  };

  const handleFilterToggle = (): void => setShowFilters(!showFilters);
  const handleNearMeToggle = (): void => setNearMeEnabled(!nearMeEnabled);
  const handleViewSupplier = (supplier: Supplier): void => setSelectedSupplier(supplier);
  const handleTrackOrder = (orderId: string): void => {
    const order = ordersState.find(o => o.id === orderId);
    if (order) setTrackingOrder(order);
  };

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const handleProfileSave = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!editProfile.email || !validateEmail(editProfile.email)) {
      setProfileError({ email: "Invalid email format." });
      return;
    }
    setProfileError({});
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
    setShowEditProfile(false);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    setProfileError({});
  };

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesCategory = 
      selectedCategory === "all" || 
      supplier.specialties.some(specialty => 
        specialty.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    
    const price = parseInt(supplier.price.replace(/[^\d]/g, ""));
    const matchesPrice = 
      priceRange === "any" ||
      (priceRange === "0-100" && price <= 100) ||
      (priceRange === "100-500" && price > 100 && price <= 500) ||
      (priceRange === "500+" && price > 500);
    
    const matchesRating = 
      ratingFilter === "any" ||
      (ratingFilter === "4.5+" && supplier.rating >= 4.5) ||
      (ratingFilter === "4.0+" && supplier.rating >= 4.0) ||
      (ratingFilter === "3.5+" && supplier.rating >= 3.5);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Content goes here - your existing JSX */}
    </div>
  );
};

export default VendorDashboard;
