import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, RouteComponentProps, useHistory, useLocation } from "react-router";
import { EnterConfirmCode } from "../../components/EnterConfirmCode";
import { useEffect, useRef } from "react";
import { useConfirmCodeMutation, useCreateCodeConfirmationMutation } from "../../app/api/backend";
import { AttrbuteType } from "./AddAttribute";
import { EnterPhone } from "../../components/EnterPhone";

export const AddPhoneAttribute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={AddPhoneAttributeStep1} />
        <Route
          path={`${match.url}/send`}
          exact
          component={AddPhoneAttributeStep2}
        />
        <Route
          path={`${match.url}/confirm/:uid`}
          exact
          component={AddPhoneAttributeStep3}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

const AddPhoneAttributeStep1 = () => {
  const history = useHistory();

  const onEnterPhone = (email: string) => {
    history.push(`/add_attribute/PHONE/send`, { email });
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/attributes"></IonBackButton>
          </IonButtons>
          <IonTitle>Add Phone</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add Phone</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <EnterPhone ctaTitle="Add Phone" cta={onEnterPhone} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const AddPhoneAttributeStep2: React.FC<RouteComponentProps> = ({  }) => {
    const history = useHistory();
    const location = useLocation<{ phone: string }>()
    const initializedRef = useRef(false);
    const [ createConfirmation, result ] = useCreateCodeConfirmationMutation()

    useEffect(() => {
        // work around StrictMode. See: https://react.dev/reference/react/StrictMode
        if(!initializedRef.current) {
            initializedRef.current = true;
            console.log(location)
            createConfirmation({
                type: AttrbuteType.PHONE,
                phone: location.state.phone,
            })
        }
    }, [initializedRef, location])

    useEffect(() => {
        if(result.isSuccess) {
            const { uid } = result.data;
            history.replace(`/add_attribute/PHONE/confirm/${uid}`, { uid });
        }
    }, [result])

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/add_attribute/PHONE"></IonBackButton>
          </IonButtons>
          <IonTitle>Add Phone</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Sending Phone</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSpinner name="lines"></IonSpinner>
          </IonCardContent>
        </IonCard>
        <pre><code>{JSON.stringify(result, null, 2)}</code></pre>
      </IonContent>
    </IonPage>
  );
};

type AddPhoneAttributeStep3MatchParams = {
    uid: string;
}

const AddPhoneAttributeStep3: React.FC<RouteComponentProps<AddPhoneAttributeStep3MatchParams>> = ({match}) => {
    const history = useHistory();
    const [ createCodeConfirmation, result ] = useConfirmCodeMutation()

    useEffect(() => {
        if(result.isSuccess) {
            history.replace('/transactions', { payload: result.data })
        }
    }, [result])

    const onConfirm = async (code: string) => {
        const result = await createCodeConfirmation({ id: match.params.uid, code })
    };
  
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/add_attribute/PHONE"></IonBackButton>
            </IonButtons>
            <IonTitle>Add Phone Confirmation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Enter Confirmation</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <EnterConfirmCode cta={onConfirm} />
            </IonCardContent>
          </IonCard>
          <pre><code>{JSON.stringify(result, null, 2)}</code></pre>
        </IonContent>
      </IonPage>
    );
  };
  