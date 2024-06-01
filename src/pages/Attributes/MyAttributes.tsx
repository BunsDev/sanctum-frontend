import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  document,
  mail,
  call,
  home,
  person,
  wallet,
} from "ionicons/icons";
import { AttrbuteType } from "./AddAttribute";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { AttributeItem } from "../../components/AttributeItem";
import { useGetAttributesQuery } from "../../app/api/backend";
import { useEffect, useState } from "react";
import { useProviders } from "../../hooks/useProviders";
import { Web3 } from "web3";
import KYCVerifiedStage0MockContractHelperConfig from "../../abi/KYCVerifiedStage0MockContractHelperConfig.json";
import CreateAndAuthenticateSanctumLinkidentityV2 from "../../abi/CreateAndAuthenticateSanctumLinkidentityV2.json";

const MyAttributes: React.FC = () => {
  const identityId = useSelector(
    (state: RootState) => state.connections.identityId
  );
  const { data: myAttributes, error, isLoading, refetch } = useGetAttributesQuery(
    identityId,
    { refetchOnMountOrArgChange: 10 }
  );
  const selectedProviderName = useSelector(
    (state: RootState) => state.connections.selectedProviderName
  );
  const selectedAccount = useSelector(
    (state: RootState) => state.connections.selectedAccount
  );
  const providers = useProviders();
  console.log(providers);
  const [receipt, setReceipt] = useState("");
  const [isTransactionRunning, setIsTransactionRunning] = useState(false);
  const [contractError, setContractError] = useState("");

  const getAttributeByType = (attrs: any[], type: string) => {
    return attrs.find(a => a.type === type) ?? {}
  }

  const requestKycContract = async () => {
    const metaMask = providers.find(
      (p) => p.info.name === selectedProviderName
    );
    if (!metaMask) return;
    const web3 = new Web3(metaMask.provider);

    try {
      setContractError("")
      setIsTransactionRunning(true)

      // step 1, login at contract
      const sanctumLinkContract = new web3!.eth.Contract(
        CreateAndAuthenticateSanctumLinkidentityV2.abi,
        import.meta.env.VITE_SANCTUM_LINK_IDENTITY_CONTRACT_ADDRESS
      );

      const isAuthenticated = await sanctumLinkContract.methods.isAuthenticated(selectedAccount).call({
        from: selectedAccount,
      });
      console.log({isAuthenticated})

      if(!isAuthenticated) {
        const receipt0 = await sanctumLinkContract.methods
        .authenticate()
        .send({
          from: selectedAccount,
        });
        console.log(receipt0);
      }

      // step 2, send attributes to mock
      const sanctumLinkKycContract = new web3!.eth.Contract(
        KYCVerifiedStage0MockContractHelperConfig.abi,
        import.meta.env.VITE_SANCTUM_LINK_IDENTITY_KYC_MOCK_CONTRACT_ADDRESS
      );

      console.log('updateVerifiedPropertiesMock', {
        _nameOfUser: getAttributeByType(myAttributes, 'NameOfUser').AttributeHash ?? "", // _nameOfUser
        _primaryPhone: getAttributeByType(myAttributes, 'PrimaryPhone').AttributeHash ?? "", // _primaryPhone,
        _dateOfBirth: getAttributeByType(myAttributes, 'DateOfBirth').AttributeValue ?? 0, // _dateOfBirth,
        _countryOfBirth: getAttributeByType(myAttributes, 'CountryOfBirth').AttributeHash ?? "", // _countryOfBirth,
        _nationalIdNumber: getAttributeByType(myAttributes, 'NationalId').AttributeHash ?? "", // _nationalIdNumber,
        _currentCountryOfResidence: getAttributeByType(myAttributes, 'CurrentCountryOfResidence').AttributeHash ?? "", // _currentCountryOfResidence,
        _currentStateOfResidence: getAttributeByType(myAttributes, 'CurrentStateOfResidence').AttributeHash ?? "", // _currentStateOfResidence,
        _primaryPhysicalAddress: getAttributeByType(myAttributes, 'PrimaryPhysicalAddress').AttributeHash ?? "" // _primaryPhysicalAddress

      })

      const _receipt = await sanctumLinkKycContract.methods
        .updateVerifiedPropertiesMock(
          getAttributeByType(myAttributes, 'NameOfUser').AttributeHash ?? "", // _nameOfUser
          getAttributeByType(myAttributes, 'PrimaryPhone').AttributeHash ?? "", // _primaryPhone,
          // TODO: transform to int
          getAttributeByType(myAttributes, 'DateOfBirth').AttributeValue ?? 0, // _dateOfBirth,
          getAttributeByType(myAttributes, 'CountryOfBirth').AttributeHash ?? "", // _countryOfBirth,
          getAttributeByType(myAttributes, 'NationalId').AttributeHash ?? "", // _nationalIdNumber,
          getAttributeByType(myAttributes, 'CurrentCountryOfResidence').AttributeHash ?? "", // _currentCountryOfResidence,
          getAttributeByType(myAttributes, 'CurrentStateOfResidence').AttributeHash ?? "", // _currentStateOfResidence,
          getAttributeByType(myAttributes, 'PrimaryPhysicalAddress').AttributeHash ?? "" // _primaryPhysicalAddress
        )
        .send({
          from: selectedAccount,
        });
      console.log(_receipt);
      // @ts-ignore
      BigInt.prototype.toJSON = function() { return this.toString() }
      setReceipt(JSON.stringify(_receipt));
    } catch(error) {
      console.error(error)
      // @ts-ignore
      setContractError(error.message)
    } finally {
      setIsTransactionRunning(false)
    }
  };

  useEffect(() => {
    console.log("myAttributes", myAttributes);
  }, myAttributes);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>My Attributes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Attributes</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isLoading && <IonSpinner />}

        {myAttributes && (
          <IonList>
            {myAttributes.map((attribute: any, idx: number) => (
              <AttributeItem key={`attr-${idx}`} attribute={attribute} />
            ))}
          </IonList>
        )}

        <hr />
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={() => requestKycContract()}>
                Update Identity
              </IonButton>
            </IonCol>
            <IonCol>
              {isTransactionRunning && <IonSpinner />}
            </IonCol>
          </IonRow>
        </IonGrid>

        <hr />
        <IonText color={'danger'}>{contractError}</IonText>
        <IonText>{receipt}</IonText>

        {/*  */}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            {/* <IonFabButton routerLink={`/add_attribute/${AttrbuteType.EMAIL}`}>
              <IonIcon
                icon={document}
                about="Document"
                title="Document"
              ></IonIcon>
            </IonFabButton> */}
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.EMAIL}`}>
              <IonIcon icon={mail} about="Mail" title="Email"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.PHONE}`}>
              <IonIcon icon={call} about="Phone" title="Phone"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.ADDRESS}`}>
              <IonIcon icon={home} about="Addres" title="Address"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.WALLET}`}>
              <IonIcon icon={wallet} about="Wallet" title="Wallets"></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink={`/add_attribute/${AttrbuteType.ID}`}>
              <IonIcon icon={person} about="ID" title="ID"></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MyAttributes;
