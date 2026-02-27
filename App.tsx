import { useState } from 'react';
import { Header } from './components/Header';
import { ProductShowcase } from './components/ProductShowcase';
import { BlindConfigurator } from './components/BlindConfigurator';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Toaster } from './components/ui/sonner';

export interface CartItem {
  id: string;
  width: number;
  height: number;
  fabricType: string;
  fabricPrice: number;
  color: string;
  mountingType: string;
  controlType: string;
  controlPrice: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  totalAmount: number;
  orderDate: string;
}

type View = 'home' | 'configurator' | 'cart' | 'checkout' | 'confirmation';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleAddToCart = (item: CartItem) => {
    setCart([...cart, { ...item, id: `item-${Date.now()}` }]);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart(cart.map(item => 
      item.id === itemId 
        ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
        : item
    ));
  };

  const handleCheckout = (customerInfo: Order['customer']) => {
    const order: Order = {
      orderId: `ORD-${Date.now()}`,
      items: cart,
      customer: customerInfo,
      totalAmount: cart.reduce((sum, item) => sum + item.totalPrice, 0),
      orderDate: new Date().toISOString(),
    };
    setCompletedOrder(order);
    setCart([]);
    setCurrentView('confirmation');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setCurrentView('cart')}
        onLogoClick={() => setCurrentView('home')}
      />
      
      <main>
        {currentView === 'home' && (
          <ProductShowcase onCustomize={() => setCurrentView('configurator')} />
        )}
        
        {currentView === 'configurator' && (
          <BlindConfigurator 
            onAddToCart={(item) => {
              handleAddToCart(item);
              setCurrentView('cart');
            }}
            onBack={() => setCurrentView('home')}
          />
        )}
        
        {currentView === 'cart' && (
          <Cart 
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onContinueShopping={() => setCurrentView('home')}
            onCheckout={() => setCurrentView('checkout')}
          />
        )}
        
        {currentView === 'checkout' && (
          <Checkout 
            items={cart}
            onBack={() => setCurrentView('cart')}
            onPlaceOrder={handleCheckout}
          />
        )}
        
        {currentView === 'confirmation' && completedOrder && (
          <OrderConfirmation 
            order={completedOrder}
            onContinueShopping={() => setCurrentView('home')}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
}

export default App;
