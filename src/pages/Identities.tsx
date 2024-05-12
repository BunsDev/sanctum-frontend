import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Identities: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page One</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <ExploreContainer name={'Identities'} />
      </IonContent>
    </IonPage>
  );
};

export default Identities;
