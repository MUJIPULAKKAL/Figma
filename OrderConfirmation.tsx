import { Order } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { CheckCircle, Package, Mail, MapPin, Home, Phone, Calendar, Download, Printer, ArrowRight } from 'lucide-react';

interface OrderConfirmationProps {
  order: Order;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ order, onContinueShopping }: OrderConfirmationProps) {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const orderDate = new Date(order.orderDate);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 shadow-green-200 shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-slate-600 text-lg mb-2">
            Thank you for your purchase, <span className="font-semibold text-slate-900">{order.customer.name}</span>.
          </p>
          <p className="text-slate-500 max-w-md mx-auto">
            We've sent a detailed confirmation email to <span className="text-blue-600 font-medium">{order.customer.email}</span>.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="outline" size="lg" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50">
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
            <Button variant="outline" size="lg" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50">
              <Printer className="w-4 h-4" />
              Print Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Details - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">Order Details</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
                    Order #{order.orderId}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">Custom {item.fabricType} Blind</h3>
                          <p className="text-sm text-slate-500 mt-1">{item.color} • {item.mountingType} • {item.controlType}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                             <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium text-xs">
                               {item.width}cm × {item.height}cm
                             </span>
                             <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right font-medium text-slate-900">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-6 border-t border-slate-200 space-y-3">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Subtotal</span>
                     <span className="font-medium text-slate-900">${(order.totalAmount / 1.1).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Shipping</span>
                     <span className="font-medium text-slate-900">Free</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-600">Tax</span>
                     <span className="font-medium text-slate-900">${(order.totalAmount - (order.totalAmount / 1.1)).toFixed(2)}</span>
                   </div>
                   <Separator className="bg-slate-200 my-2" />
                   <div className="flex justify-between items-end">
                     <span className="text-lg font-bold text-slate-900">Total Paid</span>
                     <span className="text-2xl font-bold text-green-600">${order.totalAmount.toFixed(2)}</span>
                   </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Timeline */}
            <Card className="border-0 shadow-lg ring-1 ring-slate-200 overflow-hidden">
               <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                 <div className="flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-purple-600" />
                   <CardTitle className="text-lg">Delivery Timeline</CardTitle>
                 </div>
               </CardHeader>
               <CardContent className="p-8">
                 <div className="relative pl-8 space-y-8 border-l-2 border-slate-100">
                    <div className="relative">
                       <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm box-content"></div>
                       <h4 className="font-semibold text-slate-900 text-lg">Order Placed</h4>
                       <p className="text-sm text-slate-500 mb-1">{orderDate.toLocaleDateString()}</p>
                       <p className="text-slate-600 text-sm">We've received your order and are preparing it for production.</p>
                    </div>
                    <div className="relative opacity-50">
                       <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm box-content"></div>
                       <h4 className="font-semibold text-slate-900 text-lg">In Production</h4>
                       <p className="text-sm text-slate-500 mb-1">Estimated: Tomorrow</p>
                       <p className="text-slate-600 text-sm">Your custom blinds are being manufactured.</p>
                    </div>
                    <div className="relative opacity-50">
                       <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm box-content"></div>
                       <h4 className="font-semibold text-slate-900 text-lg">Shipped</h4>
                       <p className="text-sm text-slate-500 mb-1">Estimated: {new Date(Date.now() + 5 * 86400000).toLocaleDateString()}</p>
                       <p className="text-slate-600 text-sm">Your order is on its way to you.</p>
                    </div>
                    <div className="relative opacity-50">
                       <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm box-content"></div>
                       <h4 className="font-semibold text-slate-900 text-lg">Delivery</h4>
                       <p className="text-sm text-slate-500 mb-1">Estimated: {estimatedDelivery.toLocaleDateString()}</p>
                       <p className="text-slate-600 text-sm">Expected arrival date.</p>
                    </div>
                 </div>
               </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <CardTitle className="text-lg">Shipping Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="font-semibold text-slate-900 text-lg mb-2">{order.customer.name}</p>
                <div className="text-slate-600 space-y-1">
                  <p>{order.customer.address}</p>
                  <p>{order.customer.city}, {order.customer.zipCode}</p>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
                    <Phone className="w-4 h-4" />
                    {order.customer.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-600 text-white border-0 shadow-lg shadow-blue-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <CardContent className="p-8 text-center relative z-10">
                <h3 className="font-bold text-2xl mb-2">What's Next?</h3>
                <p className="text-blue-100 mb-6">
                  You'll receive an email with your tracking number as soon as your order ships.
                </p>
                <Button variant="secondary" onClick={onContinueShopping} className="w-full bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-lg font-semibold h-12">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
