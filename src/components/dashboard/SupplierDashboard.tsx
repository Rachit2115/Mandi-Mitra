import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Package, 
  TruckIcon, 
  DollarSign, 
  Star,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
  User
} from "lucide-react";
import supplierImage from "@/assets/supplier-ingredients.jpg";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  name?: string;
  email?: string;
  businessName?: string;
  location?: string;
  phone?: string;
}

interface SupplierDashboardProps {
  userData: UserData;
  onLogout: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  sold: number;
  rating: number;
}

interface Order {
  id: string;
  vendor: string;
  items: string;
  amount: number;
  status: string;
  date: string;
  vendorLocation: string;
  vendorPhone: string;
}

interface NewProduct {
  name: string;
  price: string;
  unit: string;
  stock: string;
  category: string;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ userData, onLogout }) => {
  const { toast } = useToast();

  // State management
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    price: '',
    unit: 'kg',
    stock: '',
    category: ''
  });
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      vendor: "Raj's Chaat Corner",
      items: "5kg Tomatoes, 3kg Onions",
      amount: 1200,
      status: "pending",
      date: "2024-01-27",
      vendorLocation: "CP, Delhi",
      vendorPhone: "+91 9876543210"
    },
    {
      id: "ORD002",
      vendor: "Mumbai Street Foods",
      items: "500g Garam Masala, 1kg Red Chili",
      amount: 850,
      status: "confirmed",
      date: "2024-01-27",
      vendorLocation: "Dadar, Mumbai",
      vendorPhone: "+91 8765432109"
    },
    {
      id: "ORD003",
      vendor: "Delhi Snacks Hub",
      items: "10kg Wheat Flour",
      amount: 450,
      status: "delivered",
      date: "2024-01-26",
      vendorLocation: "Karol Bagh, Delhi",
      vendorPhone: "+91 7654321098"
    }
  ]);

  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 150,
      unit: "kg",
      stock: 500,
      category: "Vegetables",
      sold: 120,
      rating: 4.8
    },
    {
      id: 2,
      name: "Garam Masala",
      price: 200,
      unit: "kg", 
      stock: 50,
      category: "Spices",
      sold: 25,
      rating: 4.9
    },
    {
      id: 3,
      name: "Wheat Flour",
      price: 45,
      unit: "kg",
      stock: 1000,
      category: "Grains",
      sold: 300,
      rating: 4.6
    }
  ]);

  // Helper functions
  const getStatusIcon = (status: string): JSX.Element | null => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'confirmed':
        return <TruckIcon className="h-4 w-4 text-primary" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-accent" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'delivered':
        return 'secondary';
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  // Event handlers
  const handleProductSubmit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all product details",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: Number(newProduct.price),
      unit: newProduct.unit,
      stock: Number(newProduct.stock),
      category: newProduct.category,
      sold: 0,
      rating: 0
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      unit: 'kg',
      stock: '',
      category: ''
    });

    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully.`,
    });
  };

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'confirmed' }
        : order
    ));
    const acceptedOrder = orders.find(order => order.id === orderId);
    toast({
      title: "Order Accepted",
      description: `Order ${orderId} from ${acceptedOrder?.vendor} has been accepted.`,
    });
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' }
        : order
    ));
    const rejectedOrder = orders.find(order => order.id === orderId);
    toast({
      title: "Order Rejected",
      description: `Order ${orderId} from ${rejectedOrder?.vendor} has been rejected.`,
      variant: "destructive"
    });
  };

  const handleMarkDelivered = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'delivered' }
        : order
    ));
    toast({
      title: "Order Delivered",
      description: `Order ${orderId} has been marked as delivered.`,
    });
  };

  const handleTrackOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setShowOrderTracking(true);
  };

  const getOrderCounts = () => {
    return {
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      total: orders.length
    };
  };

  const orderCounts = getOrderCounts();

  // Render JSX
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center shadow-warm">
                <TruckIcon className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">मंडी Mitra</h1>
                <p className="text-sm text-muted-foreground">From Farm to Thela - Together</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={supplierImage} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">{userData.name}</p>
                  <p className="text-xs text-muted-foreground">{userData.businessName}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ... Stats cards JSX ... */}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Input
                    placeholder="Product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                  <Input
                    placeholder="Price per unit"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                  <Input
                    placeholder="Stock quantity"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                  <Input
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                  <Button onClick={handleProductSubmit} variant="supplier">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-warm transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ₹{product.price}/{product.unit}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock:</span>
                        <span className="font-medium">{product.stock} {product.unit}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sold:</span>
                        <span className="font-medium">{product.sold} {product.unit}</span>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(product.sold / (product.stock + product.sold)) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders
                      .filter(order =>
                        (orderStatusFilter === "all" || order.status === orderStatusFilter) &&
                        (
                          order.vendor.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          order.items.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          order.id.toLowerCase().includes(orderSearch.toLowerCase())
                        )
                      )
                      .map((order) => (
                        <Card key={order.id}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{order.vendor}</h3>
                                <p className="text-sm text-muted-foreground">{order.vendorLocation}</p>
                                <p className="text-sm text-muted-foreground">{order.vendorPhone}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">₹{order.amount}</p>
                                <Badge variant={getStatusColor(order.status)} className="mt-2">
                                  {getStatusIcon(order.status)}
                                  <span className="ml-1 capitalize">{order.status}</span>
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2 mb-4">
                              <p><strong>Items:</strong> {order.items}</p>
                              <p><strong>Order Date:</strong> {order.date}</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {order.status === 'pending' && (
                                <>
                                  <Button 
                                    onClick={() => handleAcceptOrder(order.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    size="sm"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Accept Order
                                  </Button>
                                  <Button 
                                    onClick={() => handleRejectOrder(order.id)}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject Order
                                  </Button>
                                </>
                              )}
                              {order.status === 'confirmed' && (
                                <Button 
                                  onClick={() => handleMarkDelivered(order.id)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                  size="sm"
                                >
                                  <TruckIcon className="h-4 w-4 mr-1" />
                                  Mark as Delivered
                                </Button>
                              )}
                              <Button 
                                onClick={() => handleTrackOrder(order.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Package className="h-4 w-4 mr-1" />
                                Track Order
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-bold">₹18,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold">₹65,230</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Product</span>
                      <span className="font-bold">Fresh Tomatoes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Customers</span>
                      <span className="font-bold">127</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Order Acceptance Rate</span>
                      <span className="font-bold text-success">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-time Delivery</span>
                      <span className="font-bold text-success">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Rating</span>
                      <span className="font-bold">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span className="font-bold">&lt; 2 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={supplierImage} 
                      alt="Business" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{userData.name}</h3>
                      <p className="text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p><strong>Business:</strong> {userData.businessName}</p>
                    <p><strong>Location:</strong> {userData.location}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Joined:</strong> January 2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Orders</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Orders</span>
                    <span className="font-bold">148</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <span className="font-bold">₹1,25,670</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Retention</span>
                    <span className="font-bold">87%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Tracking Modal */}
      {showOrderTracking && trackingOrderId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const order = orders.find(o => o.id === trackingOrderId);
                if (!order) return <p>Order not found</p>;
                
                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Status:</strong> <Badge variant={getStatusColor(order.status)}>{order.status}</Badge></p>
                      <p><strong>Vendor:</strong> {order.vendor}</p>
                      <p><strong>Amount:</strong> ₹{order.amount}</p>
                      <p><strong>Items:</strong> {order.items}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Location:</strong> {order.vendorLocation}</p>
                      <p><strong>Contact:</strong> {order.vendorPhone}</p>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowOrderTracking(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
export default SupplierDashboard;
