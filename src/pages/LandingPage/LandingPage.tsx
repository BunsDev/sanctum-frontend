import React from 'react';
import { motion } from 'framer-motion';
import { IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonPage, IonToast, IonIcon } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import './LandingPage.css'; // Import your custom CSS file for styling

const LandingPage: React.FC = () => {

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>HOME</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='landing-content ion-padding' fullscreen={true}>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="landing-title">SANCTUM LINK</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="landing-description">Presenting SanctumLink protocol, a web3 KYC product that enhances users' experience with supported ecosystems without the hassle of repetitive authentication.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          <IonCard className="landing-card">
            <IonCardContent>
              <p>Empower Your Identity with SanctumLink</p>
            </IonCardContent>
          </IonCard>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
            <IonCard className="landing-card">
              <img alt="Silhouette of mountains" src="logo.png" />
              <IonCardHeader>
                <IonCardTitle>A new Digital ID for a New Era</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
            <IonCard className="landing-card">
              <img alt="Silhouette of mountains" src="logo.png" />
              <IonCardHeader>
                <IonCardTitle>Making web3 available to general public</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}>
            <IonCard className="landing-card">
              <img alt="Silhouette of mountains" src="logo.png" />
              <IonCardHeader>
                <IonCardTitle>Powered by Chainlink Technology</IonCardTitle>
                <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard>
          </motion.div>
        </IonContent>
        <IonFooter translucent={true}>
          <IonToolbar>
            <div className="footer-content">
              <div className="footer-left">SANCTUM LINK</div>
              <div className="footer-right">
                <IonIcon icon={logoGithub} size="large" />
              </div>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
}

export default LandingPage;
