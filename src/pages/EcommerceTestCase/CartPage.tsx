import React from 'react';
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
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import './CartPage.css';

const CartPage: React.FC = () => {
  const location = useLocation<{ cart: any[] }>();
  const cart = location.state?.cart || [];
  const history = useHistory();

  const checkout = () => {
    // Implement SanctumLink checkout process here
    alert('Checkout using SanctumLink');
    history.push('/ProductPage');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
           <IonButtons slot="start">
            <IonBackButton defaultHref="/ProductPage" />
          </IonButtons>
         <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {cart.map((product, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{product.name}</IonCardTitle>
                <IonCardSubtitle>${product.price.toFixed(2)}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{product.description}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
        <IonButton expand="block" color="primary" onClick={checkout}>
          Checkout using SanctumLink
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
