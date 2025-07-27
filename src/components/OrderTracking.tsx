import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Search,
  Calendar,
  Phone,
  User
} from "lucide-react";

interface OrderStatus {
  id: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  timestamp: string;
  description: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  orderDate: string;
  deliveryAddress: string;
  currentStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  statusHistory: OrderStatus[];
  estimatedDelivery: string;
}

interface OrderTrackingProps {
  userType: 'vendor' | 'supplier';
  onBack: () => void;
}

const OrderTracking = ({ userType, onBack }: OrderTrackingProps) => {
  const [searchOrderId, setSearchOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: 'MM12345ABC',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 9876543210',
        items: [
          { name: 'Fresh Tomatoes', quantity: 5, price: 40 },
          { name: 'Onions', quantity: 2, price: 30 }
        ],
        totalAmount: 260,
        orderDate: '2024-01-15',
        deliveryAddress: '123 Main Street, Delhi - 110001',
        currentStatus: 'shipped',
        estimatedDelivery: '2024-01-17',
        statusHistory: [
          { id: '1', status: 'confirmed', timestamp: '2024-01-15 10:30', description: 'Order confirmed by vendor' },
          { id: '2', status: 'processing', timestamp: '2024-01-15 14:20', description: 'Items being prepared' },
          { id: '3', status: 'shipped', timestamp: '2024-01-16 09:15', description: 'Out for delivery' }
        ]
      },
      {
        id: 'MM67890XYZ',
        customerName: 'Priya Sharma',
        customerPhone: '+91 8765432109',
        items: [
          { name: 'Basmati Rice', quantity: 10, price: 120 }
        ],
        totalAmount: 1200,
        orderDate: '2024-01-14',
        deliveryAddress: '456 Garden Road, Mumbai - 400001',
        currentStatus: 'delivered',
        estimatedDelivery: '2024-01-16',
        statusHistory: [
          { id: '1', status: 'confirmed', timestamp: '2024-01-14 11:00', description: 'Order confirmed' },
          { id: '2', status: 'processing', timestamp: '2024-01-14 15:30', description: 'Items packed' },
          { id: '3', status: 'shipped', timestamp: '2024-01-15 08:00', description: 'Dispatched from warehouse' },
          { id: '4', status: 'delivered', timestamp: '2024-01-16 16:45', description: 'Successfully delivered' }
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  const handleSearch = () => {
    const order = orders.find(o => o.id.toLowerCase() === searchOrderId.toLowerCase());
    setSelectedOrder(order || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped': return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered': return <Package className="h-5 w-5 text-green-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-mandi bg-clip-text text-transparent">
            Order Tracking
          </h1>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Track Your Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter Order ID (e.g., MM12345ABC)"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="bg-gradient-mandi text-white">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {selectedOrder ? (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{selectedOrder.id}</span>
                  <Badge className={getStatusColor(selectedOrder.currentStatus)}>
                    {selectedOrder.currentStatus.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Details
                    </h3>
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    <p className="flex items-start gap-2 mt-2">
                      <MapPin className="h-4 w-4 mt-1" />
                      <span>{selectedOrder.deliveryAddress}</span>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Order Information
                    </h3>
                    <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
                    <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
                    <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{item.name} (Qty: {item.quantity})</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedOrder.statusHistory.map((status, index) => (
                    <div key={status.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(status.status)}
                        {index < selectedOrder.statusHistory.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold capitalize">{status.status}</h4>
                          <Badge variant="outline" className="text-xs">
                            {status.timestamp}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{status.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : searchOrderId && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Order Not Found</h3>
              <p className="text-gray-500">Please check your order ID and try again.</p>
            </CardContent>
          </Card>
        )}

        {/* Recent Orders for Vendor/Supplier */}
        {!selectedOrder && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.orderDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.totalAmount}</p>
                      <Badge className={getStatusColor(order.currentStatus)}>
                        {order.currentStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
