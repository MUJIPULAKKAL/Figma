import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Check, Star, Shield, Truck, Award, Users, Clock, Ruler, Palette, Settings2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductShowcaseProps {
  onCustomize: () => void;
}

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'High-grade materials built to last a lifetime.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Star,
    title: 'Custom Made',
    description: 'Tailored to your exact measurements for a perfect fit.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $200. Fast & secure delivery.',
    color: 'bg-green-100 text-green-600',
  },
];

const fabricTypes = [
  {
    name: 'Blackout',
    price: 'from $149',
    description: 'Complete privacy and light control',
    image: 'https://images.unsplash.com/photo-1761281946799-484a3d41f692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjBibGluZHMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjEzMTQ5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Most Popular',
  },
  {
    name: 'Light Filtering',
    price: 'from $119',
    description: 'Soft, diffused natural light',
    image: 'https://images.unsplash.com/photo-1760611656047-3bb4cb4da3e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbSUyMHdpbmRvd3xlbnwxfHx8fDE3NjEzNDU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Sheer',
    price: 'from $99',
    description: 'Elegant translucent finish',
    image: 'https://images.unsplash.com/photo-1746934047064-65265e118f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwd2luZG93JTIwdHJlYXRtZW50fGVufDF8fHx8MTc2MTM0NTQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Solar Screen',
    price: 'from $169',
    description: 'UV protection with view-through',
    image: 'https://images.unsplash.com/photo-1675939277940-ef5640af182b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3aW5kb3clMjBibGluZHN8ZW58MXx8fHwxNzYxMzQ1NDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Eco-Friendly',
  },
];

const steps = [
  {
    icon: Ruler,
    title: 'Measure',
    description: 'Enter your window dimensions for a perfect fit.',
  },
  {
    icon: Palette,
    title: 'Customize',
    description: 'Choose your fabric, color, and control options.',
  },
  {
    icon: Truck,
    title: 'Receive',
    description: 'Fast delivery direct to your door.',
  },
];

export function ProductShowcase({ onCustomize }: ProductShowcaseProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-blue-600 text-white border-0 px-4 py-1.5 shadow-lg shadow-blue-900/20 rounded-full">
              Custom Made to Order • Premium Quality
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Perfect Blinds.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Made for You.
              </span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Design the perfect roller blinds for your space. Premium fabrics, 
              custom sizes, and modern control options. Delivered in 7 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                onClick={onCustomize} 
                className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all px-8 py-7 text-lg font-semibold shadow-2xl shadow-white/10 rounded-full"
              >
                Start Customizing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="pt-12 flex items-center justify-center gap-8 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free Shipping Over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>50,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose CustomBlinds?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We combine premium materials with precision manufacturing to deliver the best window treatments for your home.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-10 pb-8 px-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.color} mb-6`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
           <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="space-y-8">
                 <div>
                   <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Seamless Process</h2>
                   <p className="text-slate-600">Get your custom blinds in 3 easy steps.</p>
                 </div>
                 
                 <div className="space-y-6">
                   {steps.map((step, index) => {
                     const Icon = step.icon;
                     return (
                       <div key={index} className="flex gap-4">
                         <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-200">
                           {index + 1}
                         </div>
                         <div>
                           <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                             {step.title}
                           </h3>
                           <p className="text-slate-600">{step.description}</p>
                         </div>
                       </div>
                     )
                   })}
                 </div>
                 
                 <Button onClick={onCustomize} className="mt-4 bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-full text-lg shadow-xl">
                   Start Your Order
                   <ArrowRight className="w-5 h-5 ml-2" />
                 </Button>
               </div>
               
               <div className="relative">
                 <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                   <ImageWithFallback 
                     src="https://images.unsplash.com/photo-1513694203232-719a280e022f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob21lLHdpbmRvd3xlbnwxfHx8fDE2ODQ0OTAxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                     alt="Interior with blinds"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Fabric Collection */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Premium Fabric Collection</h2>
            <p className="text-slate-600 text-lg">Choose from a variety of textures and opacities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {fabricTypes.map((fabric) => (
              <div key={fabric.name} className="group cursor-pointer" onClick={onCustomize}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <ImageWithFallback 
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {fabric.badge && (
                    <Badge className="absolute top-4 right-4 bg-white/90 text-slate-900 backdrop-blur-sm border-0 shadow-sm">
                      {fabric.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button variant="secondary" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-full">
                      Customize This
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{fabric.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{fabric.description}</p>
                <p className="text-blue-600 font-medium">{fabric.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">"Absolutely love our new blinds!"</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Join over 50,000 satisfied customers who have transformed their homes with our custom window treatments.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-800 pt-12">
             <div>
               <div className="text-3xl font-bold text-white mb-1">50k+</div>
               <div className="text-sm text-slate-400">Orders Delivered</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
               <div className="text-sm text-slate-400">Customer Rating</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-white mb-1">2 Year</div>
               <div className="text-sm text-slate-400">Comprehensive Warranty</div>
             </div>
             <div>
               <div className="text-3xl font-bold text-white mb-1">7 Day</div>
               <div className="text-sm text-slate-400">Fast Turnaround</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
