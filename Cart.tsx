import { CartItem } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Package, CheckCircle2, Truck, ShieldCheck, Tag } from 'lucide-react';
import { Link } from 'react-router-dom'; // Note: In this environment we use props for navigation usually, but let's stick to the prop passed

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onContinueShopping, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal >= 200 ? 0 : 25;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const savingsNeeded = subtotal < 200 ? 200 - subtotal : 0;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 py-12">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">
          Looks like you haven't customized any blinds yet. 
          Start by choosing a fabric and entering your dimensions.
        </p>
        <Button size="lg" onClick={onContinueShopping} className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8">
          Start Customizing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Shopping Cart
            <span className="text-sm font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full ml-2">
              {items.length} items
            </span>
          </h1>
          <Button variant="ghost" onClick={onContinueShopping} className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress */}
            {savingsNeeded > 0 ? (
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
                 <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                   <Truck className="w-5 h-5" />
                 </div>
                 <div className="text-sm text-blue-900 flex-1">
                   Add <span className="font-bold">${savingsNeeded.toFixed(2)}</span> more to unlock <span className="font-bold">FREE SHIPPING</span>
                 </div>
                 <Button variant="link" onClick={onContinueShopping} className="text-blue-700 font-semibold p-0 h-auto">
                   Add Items
                 </Button>
               </div>
            ) : (
               <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
                 <div className="p-2 bg-green-100 rounded-full text-green-600">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <div className="text-sm text-green-900 font-medium">
                   You've unlocked FREE SHIPPING!
                 </div>
               </div>
            )}

            {items.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex gap-6 items-start">
                    {/* Item Image */}
                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                       {/* Placeholder or dynamic image if available */}
                       <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-200">
                         <Package className="w-8 h-8" />
                       </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">Custom {item.fabricType} Blind</h3>
                          <p className="text-sm text-slate-500">{item.color} • {item.mountingType}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900 text-lg">${item.totalPrice.toFixed(2)}</div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-slate-500">${item.unitPrice.toFixed(2)} each</div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Size:</span> {item.width}cm × {item.height}cm
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Control:</span> {item.controlType}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="w-10 text-center font-medium text-slate-900">{item.quantity}</div>
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.min(50, item.quantity + 1))}
                            disabled={item.quantity >= 50}
                            className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <Card className="border-0 shadow-lg ring-1 ring-slate-200">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Shipping Estimate</span>
                      <span className="font-medium text-slate-900">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax Estimate</span>
                      <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-end">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100" 
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="pt-4 space-y-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-green-600" />
                       <span>Secure checkout guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Truck className="w-4 h-4 text-green-600" />
                       <span>Fast delivery within 7 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                 <p className="text-sm font-medium text-slate-900 mb-1">Need Help?</p>
                 <p className="text-xs text-slate-500 mb-3">Our experts are available 24/7</p>
                 <Button variant="outline" size="sm" className="w-full text-xs h-8">
                   Contact Support
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
