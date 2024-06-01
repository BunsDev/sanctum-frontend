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
import { useEffect, useRef } from "react";
import { EnterEmail } from "../../components/EnterEmail";
import {
  Route,
  RouteComponentProps,
  useHistory,
  useLocation,
} from "react-router";
import {
  useConfirmCodeMutation,
  useCreateCodeConfirmationMutation,
} from "../../app/api/backend";
import { AttrbuteType } from "../Attributes/AddAttribute";
import { EnterConfirmCode } from "../../components/EnterConfirmCode";

const Register: React.FC<RouteComponentProps> = ({ match }) => {
  useEffect(() => {
    console.log("meta", import.meta.env);
  }, []);

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={RegisterStep1} />
        <Route path={`${match.url}/send`} component={RegisterStep2} />
        <Route
          path={`${match.url}/confirm/:uid`}
          exact
          component={RegisterStep3}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Register;

const RegisterStep1: React.FC = () => {
  const history = useHistory();

  const onEnterEmail = (email: string) => {
    history.push(`/register/send`, { email });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>with Sanctum Link</IonCardSubtitle>
            <IonCardTitle>Register</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <EnterEmail ctaTitle="Sign up now" cta={onEnterEmail} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
};

const RegisterStep2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ email: string }>();
  const initializedRef = useRef(false);
  const [createConfirmation, result] = useCreateCodeConfirmationMutation();

  useEffect(() => {
    // work around StrictMode. See: https://react.dev/reference/react/StrictMode
    if (!initializedRef.current) {
      initializedRef.current = true;
      console.log(location);
      createConfirmation({
        type: AttrbuteType.EMAIL,
        value: location.state.email,
        flow: "REGISTER",
      });
    }
  }, [initializedRef, location]);

  useEffect(() => {
    if (result.isSuccess) {
      const { uid } = result.data;
      history.replace(`/register/confirm/${uid}`, { uid });
    }
  }, [result]);

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/register"></IonBackButton>
          </IonButtons>
          <IonTitle>Register</IonTitle>
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
        <pre>
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      </IonContent>
    </>
  );
};

type RegisterStep3MatchParams = {
  uid: string;
};

const RegisterStep3: React.FC<
  RouteComponentProps<RegisterStep3MatchParams>
> = ({ match }) => {
  const history = useHistory();
  const [createCodeConfirmation, result] = useConfirmCodeMutation();

  useEffect(() => {
    if (result.isSuccess) {
      history.replace("/transactions", { result: result.data.result });
    }
  }, [result]);

  const onConfirm = async (code: string) => {
    const result = await createCodeConfirmation({ id: match.params.uid, code });
    console.log(result);
  };

  return (
    <>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/register"></IonBackButton>
          </IonButtons>
          <IonTitle>Register Confirmation</IonTitle>
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
        {/* <pre>
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre> */}
      </IonContent>
    </>
  );
};
