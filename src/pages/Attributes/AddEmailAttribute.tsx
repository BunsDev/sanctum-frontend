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
import { EnterEmail } from "../../components/EnterEmail";
import { EnterConfirmCode } from "../../components/EnterConfirmCode";
import { useEffect, useRef } from "react";
import { useConfirmCodeMutation, useCreateCodeConfirmationMutation } from "../../app/api/backend";
import { AttrbuteType } from "./AddAttribute";

export const AddEmailAttribute: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={AddEmailAttributeStep1} />
        <Route
          path={`${match.url}/send`}
          exact
          component={AddEmailAttributeStep2}
        />
        <Route
          path={`${match.url}/confirm/:uid`}
          exact
          component={AddEmailAttributeStep3}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

const AddEmailAttributeStep1 = () => {
  const history = useHistory();

  const onEnterEmail = (email: string) => {
    history.push(`/add_attribute/EMAIL/send`, { email });
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/attributes"></IonBackButton>
          </IonButtons>
          <IonTitle>Add Email</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Add Email</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <EnterEmail ctaTitle="Add Email" cta={onEnterEmail} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const AddEmailAttributeStep2: React.FC<RouteComponentProps> = ({  }) => {
    const history = useHistory();
    const location = useLocation<{ email: string }>()
    const initializedRef = useRef(false);
    const [ createConfirmation, result ] = useCreateCodeConfirmationMutation()

    useEffect(() => {
        // work around StrictMode. See: https://react.dev/reference/react/StrictMode
        if(!initializedRef.current) {
            initializedRef.current = true;
            console.log(location)
            createConfirmation({
                type: AttrbuteType.EMAIL,
                email: location.state.email,
            })
        }
    }, [initializedRef, location])

    useEffect(() => {
        if(result.isSuccess) {
            const { uid } = result.data;
            history.replace(`/add_attribute/EMAIL/confirm/${uid}`, { uid });
        }
    }, [result])

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/add_attribute/EMAIL"></IonBackButton>
          </IonButtons>
          <IonTitle>Add Email</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Sending Email</IonCardTitle>
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

const AddEmailAttributeStep3: React.FC<RouteComponentProps> = ({match}) => {
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
              <IonBackButton defaultHref="/add_attribute/EMAIL"></IonBackButton>
            </IonButtons>
            <IonTitle>Add Email Confirmation</IonTitle>
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
  