import React from 'react';
import { motion } from 'framer-motion';
import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonRouterLink, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please login to your account</p>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          <div className="login-button-container">
            <IonRouterLink routerLink='/ProductPage'>
              <IonButton expand="block">Login with SanctumLink</IonButton>
            </IonRouterLink>
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
