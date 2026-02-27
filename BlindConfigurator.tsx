import { useState } from 'react';
import { CartItem } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, ShoppingCart, Ruler, Palette, Settings2, Info, CheckCircle2, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlindConfiguratorProps {
  onAddToCart: (item: CartItem) => void;
  onBack: () => void;
}

const fabricTypes = [
  { 
    value: 'Blackout', 
    price: 15, 
    description: 'Complete light blocking for bedrooms', 
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1761281946799-484a3d41f692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjBibGluZHMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTQ5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    value: 'Light Filtering', 
    price: 12, 
    description: 'Soft diffused light for living spaces', 
    badge: '',
    image: 'https://images.unsplash.com/photo-1760611656047-3bb4cb4da3e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbSUyMHdpbmRvd3xlbnwxfHx8fDE3NjEzNDU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    value: 'Sheer', 
    price: 10, 
    description: 'Elegant translucent finish', 
    badge: '',
    image: 'https://images.unsplash.com/photo-1746934047064-65265e118f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwd2luZG93JTIwdHJlYXRtZW50fGVufDF8fHx8MTc2MTM0NTQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    value: 'Solar Screen', 
    price: 18, 
    description: 'UV protection with outdoor view', 
    badge: 'Eco',
    image: 'https://images.unsplash.com/photo-1675939277940-ef5640af182b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3aW5kb3clMjBibGluZHN8ZW58MXx8fHwxNzYxMzQ1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

const colors = [
  { name: 'White', hex: '#FFFFFF', class: 'bg-white border-slate-200' },
  { name: 'Ivory', hex: '#FFFFF0', class: 'bg-[#FFFFF0] border-slate-200' },
  { name: 'Beige', hex: '#F5F5DC', class: 'bg-[#F5F5DC] border-slate-200' },
  { name: 'Light Grey', hex: '#D3D3D3', class: 'bg-[#D3D3D3] border-slate-200' },
  { name: 'Grey', hex: '#808080', class: 'bg-gray-500 border-gray-600' },
  { name: 'Charcoal', hex: '#36454F', class: 'bg-slate-700 border-slate-800' },
  { name: 'Black', hex: '#1a1a1a', class: 'bg-black border-black' },
  { name: 'Navy', hex: '#000080', class: 'bg-blue-900 border-blue-950' },
  { name: 'Sky Blue', hex: '#87CEEB', class: 'bg-sky-300 border-sky-400' },
  { name: 'Sage', hex: '#9CAF88', class: 'bg-[#9CAF88] border-[#8B9E78]' },
];

const mountingTypes = [
  { value: 'Inside Mount', description: 'Fits inside window frame - Clean, modern look' },
  { value: 'Outside Mount', description: 'Mounts on wall above window - Maximum coverage' },
];

const controlTypes = [
  { value: 'Chain', price: 0, description: 'Classic chain pull - Reliable & affordable', badge: 'Value' },
  { value: 'Cordless', price: 25, description: 'Safe spring-assisted lift - Child-safe', badge: 'Safe' },
  { value: 'Motorized', price: 150, description: 'Remote controlled - Ultimate convenience', badge: 'Premium' },
];

export function BlindConfigurator({ onAddToCart, onBack }: BlindConfiguratorProps) {
  const [config, setConfig] = useState({
    width: '',
    height: '',
    fabricType: '',
    color: '',
    mountingType: '',
    controlType: '',
    quantity: 1,
  });

  const calculateProgress = () => {
    let progress = 0;
    if (config.width && config.height) progress += 25;
    if (config.fabricType) progress += 25;
    if (config.color) progress += 25;
    if (config.mountingType && config.controlType) progress += 25;
    return progress;
  };

  const calculatePrice = () => {
    const width = parseFloat(config.width) || 0;
    const height = parseFloat(config.height) || 0;

    if (width === 0 || height === 0) return 0;

    const area = (width * height) / 10000;
    const basePrice = area * 80;

    const fabricPrice = fabricTypes.find(f => f.value === config.fabricType)?.price || 0;
    const fabricCost = fabricPrice * area;

    const controlPrice = controlTypes.find(c => c.value === config.controlType)?.price || 0;

    return basePrice + fabricCost + controlPrice;
  };

  const handleAddToCart = () => {
    const width = parseFloat(config.width);
    const height = parseFloat(config.height);

    if (!config.width || !config.height) {
      toast.error('Please enter dimensions', {
        description: 'Width and height are required to continue'
      });
      return;
    }

    if (width < 30 || width > 300 || height < 30 || height > 300) {
      toast.error('Invalid dimensions', {
        description: 'Dimensions must be between 30cm and 300cm'
      });
      return;
    }

    if (!config.fabricType || !config.color || !config.mountingType || !config.controlType) {
      toast.error('Complete all selections', {
        description: 'Please fill in all required fields'
      });
      return;
    }

    const unitPrice = calculatePrice();
    const fabricTypeData = fabricTypes.find(f => f.value === config.fabricType)!;
    const controlTypeData = controlTypes.find(c => c.value === config.controlType)!;

    const item: CartItem = {
      id: '',
      width,
      height,
      fabricType: config.fabricType,
      fabricPrice: fabricTypeData.price,
      color: config.color,
      mountingType: config.mountingType,
      controlType: config.controlType,
      controlPrice: controlTypeData.price,
      quantity: config.quantity,
      unitPrice,
      totalPrice: unitPrice * config.quantity,
    };

    onAddToCart(item);
    toast.success('Added to cart!', {
      description: `${config.quantity} custom roller blind(s) added successfully`
    });
  };

  const unitPrice = calculatePrice();
  const totalPrice = unitPrice * config.quantity;
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="hover:bg-white text-slate-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4" />
            <span>2-Year Warranty Included</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Configuration Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Progress Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">Configure Your Blind</h1>
                  <p className="text-sm text-slate-500">Custom made to your exact specifications</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-wide">
                <span className={progress >= 25 ? 'text-blue-600' : ''}>Dimensions</span>
                <span className={progress >= 50 ? 'text-blue-600' : ''}>Fabric</span>
                <span className={progress >= 75 ? 'text-blue-600' : ''}>Color</span>
                <span className={progress >= 100 ? 'text-blue-600' : ''}>Options</span>
              </div>
            </div>

            {/* Step 1: Dimensions */}
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                  <CardTitle className="text-lg">Dimensions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="width" className="text-base">Width (cm)</Label>
                    <div className="relative">
                      <Input
                        id="width"
                        type="number"
                        placeholder="e.g. 120"
                        min="30"
                        max="300"
                        value={config.width}
                        onChange={(e) => setConfig({ ...config, width: e.target.value })}
                        className="h-12 text-lg pl-4 pr-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
                    </div>
                    <p className="text-xs text-slate-500">Min: 30cm • Max: 300cm</p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="height" className="text-base">Height (cm)</Label>
                    <div className="relative">
                      <Input
                        id="height"
                        type="number"
                        placeholder="e.g. 180"
                        min="30"
                        max="300"
                        value={config.height}
                        onChange={(e) => setConfig({ ...config, height: e.target.value })}
                        className="h-12 text-lg pl-4 pr-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
                    </div>
                    <p className="text-xs text-slate-500">Min: 30cm • Max: 300cm</p>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 rounded-lg p-4 flex gap-3 border border-blue-100">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Measuring Tip</p>
                    <p>For inside mount, measure the exact window opening width. For outside mount, we recommend adding 10-15cm to the width for better light control.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Fabric */}
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
                  <CardTitle className="text-lg">Fabric Selection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fabricTypes.map((fabric) => (
                    <div 
                      key={fabric.value}
                      onClick={() => setConfig({ ...config, fabricType: fabric.value })}
                      className={`
                        cursor-pointer group relative rounded-xl border-2 overflow-hidden transition-all duration-200
                        ${config.fabricType === fabric.value 
                          ? 'border-blue-600 ring-2 ring-blue-100 ring-offset-2' 
                          : 'border-slate-200 hover:border-slate-300'
                        }
                      `}
                    >
                      <div className="flex h-full">
                        <div className="w-1/3 relative bg-slate-100">
                           <ImageWithFallback 
                            src={fabric.image} 
                            alt={fabric.value}
                            className="w-full h-full object-cover"
                           />
                        </div>
                        <div className="w-2/3 p-4 bg-white flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-slate-900">{fabric.value}</span>
                            {config.fabricType === fabric.value && (
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mb-2">{fabric.description}</p>
                          <div className="flex items-center gap-2 mt-auto">
                            <Badge variant="secondary" className="text-xs font-normal bg-slate-100 text-slate-700">
                              +${fabric.price}/m²
                            </Badge>
                            {fabric.badge && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 text-xs">
                                {fabric.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Color */}
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</div>
                  <CardTitle className="text-lg">Color</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
                  {colors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setConfig({ ...config, color: color.name })}
                        className={`
                          w-12 h-12 rounded-full border shadow-sm transition-all duration-200 relative
                          ${color.class}
                          ${config.color === color.name 
                            ? 'ring-2 ring-blue-600 ring-offset-2 scale-110' 
                            : 'hover:scale-105'
                          }
                        `}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      >
                        {config.color === color.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 className={`w-6 h-6 ${['White', 'Ivory', 'Beige', 'Light Grey'].includes(color.name) ? 'text-slate-900' : 'text-white'} drop-shadow-md`} />
                          </div>
                        )}
                      </button>
                      <span className={`text-[10px] font-medium text-center ${config.color === color.name ? 'text-blue-600' : 'text-slate-500'}`}>
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Options */}
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">4</div>
                  <CardTitle className="text-lg">Customization Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div>
                  <Label className="text-base mb-3 block">Mounting Type</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mountingTypes.map((type) => (
                      <div
                        key={type.value}
                        onClick={() => setConfig({ ...config, mountingType: type.value })}
                        className={`
                          cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3
                          ${config.mountingType === type.value 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${config.mountingType === type.value ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`}>
                          {config.mountingType === type.value && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{type.value}</p>
                          <p className="text-sm text-slate-500">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-base mb-3 block">Control Mechanism</Label>
                  <div className="space-y-3">
                    {controlTypes.map((type) => (
                      <div
                        key={type.value}
                        onClick={() => setConfig({ ...config, controlType: type.value })}
                        className={`
                          cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                          ${config.controlType === type.value 
                            ? 'border-blue-600 bg-blue-50/50' 
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${config.controlType === type.value ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`}>
                            {config.controlType === type.value && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">{type.value}</span>
                              {type.badge && <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700">{type.badge}</Badge>}
                            </div>
                            <p className="text-sm text-slate-500">{type.description}</p>
                          </div>
                        </div>
                        <div className="font-medium text-slate-900">
                          {type.price === 0 ? 'Included' : `+$${type.price}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <Label htmlFor="quantity" className="text-base font-medium text-slate-900">Quantity</Label>
                    <p className="text-sm text-slate-500">Number of blinds with these exact specs</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white rounded-lg border border-slate-200 p-1">
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfig({ ...config, quantity: Math.max(1, config.quantity - 1) })}
                        disabled={config.quantity <= 1}
                        className="h-8 w-8 rounded-md"
                      >
                        <span className="text-lg font-medium">-</span>
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="50"
                        value={config.quantity}
                        onChange={(e) => setConfig({ ...config, quantity: parseInt(e.target.value) || 1 })}
                        className="w-12 h-8 text-center border-0 p-0 focus-visible:ring-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfig({ ...config, quantity: Math.min(50, config.quantity + 1) })}
                        disabled={config.quantity >= 50}
                        className="h-8 w-8 rounded-md"
                      >
                        <span className="text-lg font-medium">+</span>
                      </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <Card className="border-0 shadow-lg ring-1 ring-slate-200 overflow-hidden">
                <CardHeader className="bg-slate-900 text-white p-6">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                  <CardDescription className="text-slate-300">Review your custom configuration</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 space-y-4">
                    {config.width && config.height ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-slate-500">Dimensions</span>
                            <div className="text-base font-semibold text-slate-900">{config.width} × {config.height} cm</div>
                            <div className="text-xs text-slate-500">{(parseFloat(config.width) * parseFloat(config.height) / 10000).toFixed(2)} m²</div>
                          </div>
                          <Ruler className="w-5 h-5 text-slate-300" />
                        </div>
                        
                        {config.fabricType && (
                          <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                            <div className="space-y-1">
                              <span className="text-sm font-medium text-slate-500">Fabric</span>
                              <div className="text-base font-semibold text-slate-900">{config.fabricType}</div>
                              {config.color && <div className="text-sm text-slate-600 flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200" style={{ backgroundColor: colors.find(c => c.name === config.color)?.hex }}></div> {config.color}</div>}
                            </div>
                            <Palette className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                        
                        {(config.mountingType || config.controlType) && (
                          <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                            <div className="space-y-1">
                              <span className="text-sm font-medium text-slate-500">Options</span>
                              {config.mountingType && <div className="text-sm text-slate-900">{config.mountingType}</div>}
                              {config.controlType && <div className="text-sm text-slate-900">{config.controlType}</div>}
                            </div>
                            <Settings2 className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Ruler className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Enter dimensions to see pricing</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-slate-50 p-6 border-t border-slate-200">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Unit Price</span>
                        <span className="font-medium text-slate-900">${unitPrice.toFixed(2)}</span>
                      </div>
                      {config.quantity > 1 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Quantity</span>
                          <span className="font-medium text-slate-900">× {config.quantity}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-end">
                        <span className="text-base font-bold text-slate-900">Total</span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
                          <p className="text-xs text-slate-500 font-normal">Free shipping over $200</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-14 text-lg font-semibold shadow-blue-200 shadow-lg hover:shadow-xl transition-all"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={totalPrice === 0 || progress < 100}
                    >
                      {totalPrice > 0 ? 'Add to Cart' : 'Configure to Buy'}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white p-3 rounded-lg border border-slate-100 text-center shadow-sm">
                   <div className="text-xs font-semibold text-slate-900">Free Shipping</div>
                   <div className="text-[10px] text-slate-500">On orders $200+</div>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-slate-100 text-center shadow-sm">
                   <div className="text-xs font-semibold text-slate-900">Best Price</div>
                   <div className="text-[10px] text-slate-500">Guaranteed</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
