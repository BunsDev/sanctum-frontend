import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import PersonaReact from "persona-react";
import { useStoreAttributesMutation } from "../../app/api/backend";
import { useEffect, useRef } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

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
              history.replace(`/add_attribute/ID/verify`, { inquiryId, fields })
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

export const AddIdAttributeWithPersonaStep2 = () => {
  const identityId = useSelector(
    (state: RootState) => state.connections.identityId
  );
  const location = useLocation<{ inquiryId: string, fields: any }>();
  const [storeAttributes, result] = useStoreAttributesMutation();
  const history = useHistory();
  const initializedRef = useRef(false);

  const save = async () => {
    // TODO: verify on the backend
    const response = await storeAttributes({
      id: identityId,
      attributes: [
        {
          type: "NameOfUser",
          value: location.state.fields['name-first'].value +' '+ location.state.fields['name-last'].value,
          valueHash: "",
          signature: ""
        },
        {
          type: "DateOfBirth",
          value: new Date(location.state.fields['birthdate'].value).getTime().toFixed(0),
          valueHash: "",
          signature: ""
        },
        {
          type: "CountryOfBirth",
          value: location.state.fields['address-country-code'].value,
          valueHash: "",
          signature: ""
        },
        {
          type: "NationalId",
          value: location.state.fields['identification-number'].value,
          valueHash: "",
          signature: ""
        },
        {
          type: "CurrentCountryOfResidence",
          value: location.state.fields['address-country-code'].value,
          valueHash: "",
          signature: ""
        },
        {
          type: "CurrentStateOfResidence",
          value: location.state.fields['address-subdivision'].value,
          valueHash: "",
          signature: ""
        },
        {
          type: "PrimaryPhysicalAddress",
          value: location.state.fields['address-street-1'].value +', '+ location.state.fields['address-city'].value,
          valueHash: "",
          signature: ""
        },
      ]
    })
  }

  useEffect(() => {
    // work around StrictMode. See: https://react.dev/reference/react/StrictMode
    if(!initializedRef.current) {
      initializedRef.current = true;
      save().then(() => {
        console.log('Done')
        history.replace('/attributes')
      })
      }
  }, [initializedRef])

  return (
    <IonPage>
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/attributes"></IonBackButton>
        </IonButtons>
        <IonTitle>Verify ID</IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>Storing Identity Data</IonText>
        <IonSpinner />
        {/* <hr />
        <IonText>{JSON.stringify(location.state.fields)}</IonText> */}
      </IonContent>
    </IonPage>
  )
}