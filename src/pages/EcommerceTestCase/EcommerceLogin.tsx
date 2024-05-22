import React from 'react';
import { IonButton, IonHeader, IonContent, IonNavLink, IonToolbar, IonTitle, IonRouterLink } from '@ionic/react';

import ProductPage from './ProductPage';

function PageOne() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>Login Page</h1>
        <IonRouterLink routerLink='/ProductPage'>
          <IonButton>Login with SanctumLink</IonButton>
          </IonRouterLink>
      </IonContent>
    </>
  );
}

export default PageOne;