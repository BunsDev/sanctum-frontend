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

const products = [
  { id: 1, name: 'Product 1', price: 99.99, description: 'Description for Product 1', img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
  { id: 2, name: 'Product 2', price: 79.99, description: 'Description for Product 2', img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
  { id: 3, name: 'Product 3', price: 59.99, description: 'Description for Product 3', img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg' },
];

const ProductPage: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const history = useHistory();

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const viewCart = () => {
    history.push('/CartPage', { cart });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
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
              <IonButton expand="block" color="primary" onClick={() => addToCart(product)}>
                Add to Cart
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
