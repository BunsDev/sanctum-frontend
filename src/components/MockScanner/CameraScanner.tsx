import {
    IonButton
} from "@ionic/react";
import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo
} from "@capacitor/camera";

type CameraScannerProps = {
    onCapture: (result: Photo) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({onCapture}) => {
  const capturePhoto = async () => {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(capturedPhoto);
    onCapture(capturedPhoto);
  };

  return (
    <IonButton onClick={capturePhoto}>Capture</IonButton>
  );
};
