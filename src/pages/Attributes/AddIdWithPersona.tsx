import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useHistory } from "react-router";
import PersonaReact from "persona-react";

type AddIdAttributeWithPersonaStep1Props = {};

export const AddIdAttributeWithPersonaStep1: React.FC<
  AddIdAttributeWithPersonaStep1Props
> = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/attributes"></IonBackButton>
          </IonButtons>
          <IonTitle>Add ID</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="personaContainer">
          <PersonaReact
            // This refers to a production demo template owned by Persona
            templateId="itmpl_QTwKZWTuQLCtVp6xmxTa7u6qXnuT"
            environmentId="env_jbzBYgqT4dm7ubESpPoBta4RTMrq"
            onLoad={() => console.log("onLoad")}
            onReady={() => console.log("onReady")}
            onEvent={(event: any, meta: any) =>
              console.log("onEvent", event, meta)
            }
            onComplete={({ inquiryId, status, fields }) => {
              console.log("onComplete", { inquiryId, status, fields });
              history.replace(`/add_attribute/ID/verify`, { inquiryId })
            }}
            onCancel={({ inquiryId, sessionToken }) =>
              console.log("onCancel", { inquiryId, sessionToken })
            }
            onError={(error) => console.log(error)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
