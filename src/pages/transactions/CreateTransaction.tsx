import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import { useHistory, useLocation } from "react-router";

export const CreateTransaction = ({}) => {
    const history = useHistory();
    const location = useLocation();

    const onSendTransaction = async () => {
        // mock transaction
        setTimeout(() => {
            history.replace('/attributes')
        }, 1_000)
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Transaction</IonTitle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent className="ion-padding">
            <h1>Transaction</h1>
            <p>Sample Transaction</p>
            <IonButton item-end color={"primary"} size="small" onClick={onSendTransaction}>Send</IonButton>
            <hr/>
            <pre><code>{JSON.stringify(location.state, null, 2)}</code></pre>
          </IonContent>
        </IonPage>
      );    
}
