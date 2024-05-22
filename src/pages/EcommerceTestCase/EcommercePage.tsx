import React from 'react';
import { IonButton, IonContent, IonHeader, IonNav, IonTitle, IonToolbar } from '@ionic/react';
import PageOne from './EcommerceLogin';

function EcommercePage() {
    return(
        <>
        <IonNav root={() => <PageOne />}></IonNav>;
        </>

    ); 
  }
  export default EcommercePage;