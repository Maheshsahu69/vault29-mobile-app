import React from "react";
import "./UserType.css";
import { useHistory } from "react-router";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
} from "@ionic/react";
import store from '../store';
import close from "../images/close.png";
import logo from "../images/icon.png";
import consumer from "../images/consumer-inactive.png";
import winary from "../images/winary-inactive.png";
import restaurant from "../images/restaurant-inactive.png";
import userTypeAction from '../actions/userType';
import { UserTypeDetails}  from '../constants';

const UserType: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onClose = () => {
    history.replace("/");
  };
  const getSelectedUserType=(e:any)=>{
    if(UserTypeDetails.Consumer===e.target.title){
        dispatch(userTypeAction(UserTypeDetails.Consumer))
    }

    if(UserTypeDetails.Winery===e.target.title){
      dispatch(userTypeAction(UserTypeDetails.Winery))
    }

    if(UserTypeDetails.Other===e.target.title){
      dispatch(userTypeAction(UserTypeDetails.Other))
    }
   console.log("",store.getState());
  
  }
  return (
    <IonPage>
      <IonContent className="bg-img-user-type">
        <IonRow>
          <IonCol>
            <IonImg
              src={close}
              alt="close button"
              className="close-button"
              onClick={() => {
                onClose();
              }}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonImg src={logo} alt="logo error" className="logo" />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonTitle className="txt-select-user-type">
              {" "}
              SELECT USER TYPE
            </IonTitle>
          </IonCol>
        </IonRow>
        <div onClick={(e)=>{getSelectedUserType(e)}}>
          <IonRow>
            <IonCol>
              <IonImg
                src={consumer}
                alt="consumer error"
                className="consumer-image"
                title="Consumer"
                
              />
            </IonCol>
          </IonRow>
          <IonRow >
            <IonCol>
              <IonTitle className="txt-consumer" title="Consumer">CONSUMER</IonTitle>
            </IonCol>
          </IonRow>
        </div>
        <div onClick={(e)=>{getSelectedUserType(e)}}>
          <IonRow>
            <IonCol>
              <IonImg
                src={winary}
                alt="winery error"
                className="winary-image"
                title="Winery" 
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonTitle className="txt-winery" title="Winery" > WINERY</IonTitle>
            </IonCol>
          </IonRow>
          </div>
          <div onClick={(e)=>{getSelectedUserType(e)}}>
          <IonRow>
            <IonCol>
              <IonImg
                src={restaurant}
                alt="restaurant error"
                className="restaurant-image "
                title="Other" 
              />
            </IonCol>
          </IonRow>
        
        <IonRow>
          <IonCol>
            <IonTitle className="txt-restaurant" title="Other" >
              {" "}
              RESTAURANT/BAR/OTHER
            </IonTitle>
          </IonCol>
        </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserType;
