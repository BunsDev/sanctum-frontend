import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRouterOutlet,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Route,
  RouteComponentProps,
  useHistory,
  useParams,
} from "react-router";
import "./Page.css";
import { useProviders } from "../hooks/useProviders";
import { EIP6963ProviderDetail } from "web3/lib/commonjs/providers.exports";
import { useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { getIdentityForAccount, setSelectedAccount, setSelectedProviderName } from "../app/connections/connectionsSlice";
import { Web3 } from "web3";

const Login: React.FC<RouteComponentProps> = ({ match }) => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={`${match.url}`} exact component={LoginStep1} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Login;

const LoginStep1 = () => {
  const providers = useProviders();
  const dispatch: Dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [selectedProvider, setSelectedProvider] = useState<
    EIP6963ProviderDetail | undefined
  >(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [showRegisterButton, setShowRegisterButton] = useState(false)

  const selectProvider = async (p: EIP6963ProviderDetail) => {
    console.log(p);
    setSelectedProvider(p);
    dispatch(setSelectedProviderName(p.info.name));
    try {
      const web3 = new Web3(p.provider);
      await web3.currentProvider?.request({ method: "eth_requestAccounts" });
      const as = await web3.eth.getAccounts();
      setAccounts(as);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAccount = async (account: string) => {
    console.log(account);
    dispatch(setSelectedAccount(account));
    const resp = await dispatch(
      // @ts-ignore
      getIdentityForAccount({ providerInfo: selectedProvider!, account })
    );
    console.log("after dispatch", resp);
    // @ts-ignore
    if (resp.type === "identity/get/fulfilled" && resp.payload.isValidIdentity) {
      history.replace("/attributes");
    } else {
      // alert("Error");
      setShowRegisterButton(true)
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonText>
          <h1>Login</h1>
        </IonText>
        <IonText>
          <h4>with SanctumLink</h4>
        </IonText>
        <IonList inset={false}>
          <IonListHeader>Select Wallet Provider</IonListHeader>
          {providers.map((p: EIP6963ProviderDetail) => {
            return (
              <IonItem onClick={() => selectProvider(p)} key={p.info.uuid}>
                <IonAvatar aria-hidden="true" slot="start">
                  <img alt="" src={p.info.icon} />
                </IonAvatar>
                <IonLabel>{p.info.name}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        <IonList>
          <IonListHeader>Select Account</IonListHeader>
          {accounts.map((a) => {
            return (
              <IonItem onClick={() => selectAccount(a)} key={a}>
                <IonLabel>{a}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        {showRegisterButton && (
          <>
            <hr />
            <p><IonText color={"danger"}>No Identity found!</IonText></p>
            <IonButton expand="block" href="/register">Register</IonButton>
          </>
        )}
      </IonContent>
    </>
  );
};
