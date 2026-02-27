import { ShoppingCart, Blinds, Phone, Mail, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export function Header({ cartItemCount, onCartClick, onLogoClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-slate-900 text-slate-300 py-2.5 text-xs font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5" /> 1-800-BLINDS-4U
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> support@customblinds.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white bg-blue-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">Free Shipping Over $200</span>
            <span className="hover:text-white cursor-pointer transition-colors">Track Order</span>
            <span className="hover:text-white cursor-pointer transition-colors">Help Center</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a href="#" className="text-lg font-medium hover:text-blue-600 transition-colors">Shop Blinds</a>
                <a href="#" className="text-lg font-medium hover:text-blue-600 transition-colors">How It Works</a>
                <a href="#" className="text-lg font-medium hover:text-blue-600 transition-colors">Inspiration</a>
                <a href="#" className="text-lg font-medium hover:text-blue-600 transition-colors">Support</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
            <Blinds className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">CustomBlinds</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">PREMIUM WINDOW TREATMENTS</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group py-2">
            Shop Blinds
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group py-2">
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative group py-2">
            Inspiration
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCartClick}
            className="relative hover:bg-slate-100 rounded-full w-10 h-10 md:w-12 md:h-12 border border-transparent hover:border-slate-200 transition-all"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-slate-700" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 md:top-1 md:right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in-50">
                {cartItemCount}
              </span>
            )}
          </Button>
          <Button 
            onClick={onLogoClick} 
            className="hidden md:flex bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 shadow-lg shadow-slate-200"
          >
            Start Project
          </Button>
        </div>
      </div>
    </header>
  );
}
