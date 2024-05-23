import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonList,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './ProductPage.css';

const initialProducts = [
  { id: 1, name: 'Television', price: 99.99, description: 'Sony Television', img: 'imp1.png', stock: 10 },
  { id: 2, name: 'Wireless Speakers', price: 79.99, description: 'Sony Wireless Speakers for good sound', img: 'imp2.png', stock: 5 },
  { id: 3, name: 'Camera ', price: 59.99, description: 'Sony camera for clear pictures', img: 'imp3.png', stock: 8 },
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState<any[]>([]);
  const history = useHistory();

  const addToCart = (product: any) => {
    if (product.stock > 0) {
      setCart([...cart, product]);
      const updatedProducts = products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      );
      setProducts(updatedProducts);
    }
  };

  const viewCart = () => {
    history.push('/CartPage', { cart });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Ecommerce" />
          </IonButtons>
          <IonTitle>Product Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {products.map((product) => (
          <IonCard key={product.id}>
            <img alt="Product Image" src={product.img} className="product-image" />
            <IonCardHeader>
              <IonCardTitle>{product.name}</IonCardTitle>
              <IonCardSubtitle>${product.price.toFixed(2)}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{product.description}</p>
              <p>Stock: {product.stock}</p>
              <IonButton 
                expand="block" 
                color="primary" 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
        <IonButton expand="block" color="secondary" onClick={viewCart}>
          View Cart
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
