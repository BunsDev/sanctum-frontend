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
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Route, RouteComponentProps, useHistory, useParams } from "react-router";
import "./Page.css";
import { EnterEmail } from "../components/EnterEmail";
import { useProviders } from "../hooks/useProviders";
import { EIP6963ProviderDetail } from "web3/lib/commonjs/providers.exports";
import { useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { getIdentityForAccount } from "../app/connections/connectionsSlice";
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
  const [selectedProvider, setSelectedProvider] = useState<EIP6963ProviderDetail | undefined>(undefined);
  const [accounts, setAccounts] = useState<string[]>([]);

  const selectProvider = async (p: EIP6963ProviderDetail) => {
    console.log(p)
    setSelectedProvider(p);
    //
    // try {
    //   const accounts = await p.provider.request({ 
    //     method: "eth_requestAccounts"
    //   })
    //   console.log({accounts})
    //   setAccounts(accounts as string[]);
    // } catch(error) {
    //   console.error(error)
    // }
    try {
      const web3 = new Web3(p.provider)
      const as = await web3.eth.getAccounts()
      setAccounts(as)
    } catch(error) {
      console.log(error)
    }
  }

  const selectAccount = async (account: string) => {
    console.log(account)
    // @ts-ignore
    const resp = await dispatch(getIdentityForAccount({providerInfo: selectedProvider!, account}))
    console.log('after dispatch', resp)
    // @ts-ignore
    if(resp.type === 'identity/get/fulfilled' && resp.payload.length > 0) {
      history.replace("/attributes")
    }
  }

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
      <IonText><h1>Login</h1></IonText>
      <IonText><h4>with SanctumLink</h4></IonText>
      <IonList inset={false}>
          <IonListHeader>Select Wallet Provider</IonListHeader>
          {providers.map((p: EIP6963ProviderDetail) => {
            return <IonItem onClick={() => selectProvider(p)} key={p.info.uuid}><IonLabel>{p.info.name}</IonLabel></IonItem>
          })}
        </IonList>
        <IonList>
        <IonListHeader>Select Account</IonListHeader>
        {accounts.map((a) => {
            return <IonItem onClick={() => selectAccount(a)} key={a}><IonLabel>{a}</IonLabel></IonItem>
          })}
        </IonList>
      </IonContent>
    </>
  );
};
