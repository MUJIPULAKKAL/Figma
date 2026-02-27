import { useState } from 'react';
import { CartItem, Order } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, CreditCard, Lock, MapPin, User, Package, CheckCircle2, ShieldCheck, ChevronRight, Truck } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onPlaceOrder: (customerInfo: Order['customer']) => void;
}

export function Checkout({ items, onBack, onPlaceOrder }: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shipping = subtotal >= 200 ? 0 : 25;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const isStep1Complete = formData.name && formData.email && formData.phone && 
                          formData.address && formData.city && formData.zipCode;

  const handleContinueToPayment = () => {
    if (!isStep1Complete) {
      toast.error('Please complete all shipping fields', {
        description: 'All fields are required to continue'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email address');
      return;
    }

    setCurrentStep(2);
    toast.success('Shipping information saved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
      toast.error('Please complete payment information', {
        description: 'All payment fields are required'
      });
      return;
    }

    const customerInfo: Order['customer'] = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
    };

    onPlaceOrder(customerInfo);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="hover:bg-white text-slate-600 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Cart
          </Button>
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <Lock className="w-3 h-3" />
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Steps Indicator */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
               <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10" />
                  
                  {/* Step 1 Indicator */}
                  <div className={`flex flex-col items-center gap-2 bg-white px-2 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep > 1 ? 'bg-green-500 text-white' : 'bg-blue-600 text-white ring-4 ring-blue-50'}`}>
                      {currentStep > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
                    </div>
                    <span className="text-xs font-semibold text-slate-900">Shipping</span>
                  </div>

                  {/* Step 2 Indicator */}
                  <div className={`flex flex-col items-center gap-2 bg-white px-2 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep === 2 ? 'bg-blue-600 text-white ring-4 ring-blue-50' : 'bg-slate-200 text-slate-500'}`}>
                      2
                    </div>
                    <span className="text-xs font-semibold text-slate-900">Payment</span>
                  </div>

                  {/* Step 3 Indicator (Ghost) */}
                  <div className="flex flex-col items-center gap-2 bg-white px-2 opacity-50">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-slate-200 text-slate-500">
                      3
                    </div>
                    <span className="text-xs font-semibold text-slate-900">Confirm</span>
                  </div>
               </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Step 1: Shipping Information */}
                <div className={`transition-all duration-500 ${currentStep === 1 ? 'block opacity-100 translate-x-0' : 'hidden opacity-0 -translate-x-full'}`}>
                  <Card className="border-0 shadow-md overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Shipping Address</CardTitle>
                          <CardDescription>Where should we send your order?</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                              id="name"
                              placeholder="John Smith"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="pl-10 h-11"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="h-11"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-11"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="h-11"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="h-11"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                          <Input
                            id="zipCode"
                            placeholder="12345"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="h-11"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 p-6 flex justify-end border-t border-slate-100">
                      <Button 
                        type="button"
                        onClick={handleContinueToPayment}
                        className="w-full md:w-auto min-w-[200px] h-11 bg-blue-600 hover:bg-blue-700 shadow-sm"
                        size="lg"
                      >
                        Continue to Payment
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                  <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                    {/* Summary of Shipping */}
                    <div className="mb-6 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-50 rounded-full text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">Shipping Address</p>
                          <p className="text-xs text-slate-500">{formData.address}, {formData.city} {formData.zipCode}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Edit
                      </Button>
                    </div>

                    <Card className="border-0 shadow-md overflow-hidden">
                      <CardHeader className="bg-white border-b border-slate-100 pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                              <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Payment Details</CardTitle>
                              <CardDescription>Safe & secure encrypted transaction</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs text-slate-500 font-normal">Encrypted</Badge>
                            <Lock className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              maxLength={19}
                              className="pl-10 h-11"
                              required
                            />
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiration Date</Label>
                            <Input
                              id="cardExpiry"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              maxLength={5}
                              className="h-11"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">CVC / CVV</Label>
                            <div className="relative">
                              <Input
                                id="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                                maxLength={4}
                                className="h-11 pr-10"
                                required
                              />
                              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 flex gap-3 items-start">
                          <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div className="text-xs text-slate-600">
                            <p className="font-semibold text-slate-900 mb-1">Payment Security Guaranteed</p>
                            <p>Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-slate-50 p-6 border-t border-slate-100">
                        <Button 
                          type="submit"
                          className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100"
                        >
                          Pay ${total.toFixed(2)}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Sticky Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              <Card className="border-0 shadow-lg ring-1 ring-slate-200 overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-500" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[300px] overflow-y-auto p-4 space-y-3 bg-white">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 text-sm">
                        <div className="w-12 h-12 bg-slate-100 rounded-md flex-shrink-0 flex items-center justify-center text-xs text-slate-400">
                          Img
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{item.fabricType} Blind</p>
                          <p className="text-xs text-slate-500">{item.width}×{item.height}cm • {item.color}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium text-slate-900">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-4 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Shipping</span>
                      <span className="font-medium text-slate-900">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tax</span>
                      <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="bg-slate-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-slate-900">Total</span>
                      <span className="text-xl font-bold text-slate-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                   <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                     <Truck className="w-4 h-4" />
                   </div>
                   <div className="text-xs text-slate-600">
                     <p className="font-semibold text-slate-900">Fast Delivery</p>
                     <p>Usually ships within 5-7 days</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                   <div className="p-2 bg-green-50 rounded-full text-green-600">
                     <ShieldCheck className="w-4 h-4" />
                   </div>
                   <div className="text-xs text-slate-600">
                     <p className="font-semibold text-slate-900">2-Year Warranty</p>
                     <p>Full protection on mechanisms</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
