import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './src/components/App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Mensaje manejado correctamente en background!', remoteMessage);
  });  

registerRootComponent(App);