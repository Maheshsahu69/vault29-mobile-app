import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Nearby.css';

const Nearby: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nearby</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nearby</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Nearby page" />
      </IonContent>
    </IonPage>
  );
};

export default Nearby;
