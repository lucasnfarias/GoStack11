import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cartProducts = await AsyncStorage.getItem('cart-products');

      if (cartProducts) {
        setProducts(JSON.parse(cartProducts));
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const ExistingProduct = products.find(
        productCart => productCart.id === product.id,
      );

      if (ExistingProduct) {
        const productsUpdate = products.map(productCart => {
          if (productCart.id === ExistingProduct.id) {
            productCart.quantity += 1;
          }
          return productCart;
        });

        setProducts(productsUpdate);

        await AsyncStorage.setItem(
          'cart-products',
          JSON.stringify(productsUpdate),
        );
      } else {
        setProducts(oldProds => [...oldProds, { ...product, quantity: 1 }]);

        await AsyncStorage.setItem(
          'cart-products',
          JSON.stringify([...products, { ...product, quantity: 1 }]),
        );
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const productsUpdated = products.map<Product>(product => {
        if (product.id === id) {
          product.quantity += 1;
        }
        return product;
      });

      setProducts(productsUpdated);

      await AsyncStorage.setItem(
        'cart-products',
        JSON.stringify(productsUpdated),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productDecremented = products.map<Product>(product => {
        if (product.id === id) {
          product.quantity -= 1;
        }
        return product;
      });

      const productsUpdated = productDecremented.filter(
        product => product.quantity !== 0,
      );

      setProducts(productsUpdated);

      await AsyncStorage.setItem(
        'cart-products',
        JSON.stringify(productsUpdated),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
