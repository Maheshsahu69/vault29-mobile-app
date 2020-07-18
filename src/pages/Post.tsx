import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonSpinner,
  IonText,
  IonItem,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonLabel,
} from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetail } from "../actions/post";
import { RootState } from "../reducers";
import logoWhite from "../images/logo-white.png";
import logoBlack from "../images/logo-black.png";
import { useParams, useHistory } from "react-router";
import { PostDetail } from "../types";
import { API_ENDPOINT } from "../constants";
import {
  locationOutline,
  timeOutline,
  heartOutline,
  chatbubbleEllipsesOutline,
  starOutline,
  ellipsisVerticalOutline,
} from "ionicons/icons";
import moment from "moment";
import "./Post.css";
import { fetchProfileAction } from "../actions/profile";
import { searchQueryAction } from "../actions/post";
import avatar from "../images/avatar-placeholder.png";
import { imagesJSON } from "../constants";

const Post: React.FC = () => {
  const { id } = useParams();
  const user_id = useSelector<RootState, number>((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const loading = useSelector<RootState, boolean>(
    (state) => state.post.loading
  );
  const post = useSelector<RootState, PostDetail>((state) => state.post.post);
  const history = useHistory();

  var arrayWithHash: any[] = [];
  var renderPlanText;
  var arrayTempEmoji: any[] = [];

  useEffect(() => {
    dispatch(getPostDetail(id, user_id));
    // eslint-disable-next-line
  }, [id]);
  const getComment = () => {
    let varPostComment, varSplitPostComment;
    var tempArrayPostComment = [];
    var convertCommentsToString;
    varPostComment = post.comment;
    if (varPostComment) {
      varSplitPostComment = varPostComment.split(" ");
      tempArrayPostComment = varSplitPostComment;
      tempArrayPostComment.map((e) => {
        let varHash = e.split("")[0];
        if (varHash === "#") {
          return arrayWithHash.push(
            <button
              onClick={() => {
                dispatch(searchQueryAction(e));
                history.push("/search");
              }}
              className="link-decoration"
            >
              <h1>{e}</h1>
            </button>
          );
        } else {
          convertCommentsToString = e.toString();
          renderPlanText = convertCommentsToString.replace(/,/g, " ");
          arrayWithHash.push(renderPlanText + " ");
          return arrayWithHash;
        }
      });
    }
  };
  getComment();

  const getEmojis = () => {
    let convertEmojiStringInArray: any[] = [];
    let a = post.emoji;

    if (a) {
      convertEmojiStringInArray = a.split(",");

      convertEmojiStringInArray.map((e) => {
        return imagesJSON.filter((ele) => {
          if (ele.name === e) {
            arrayTempEmoji.push(ele);
          }
          return arrayTempEmoji;
        });
      });
    }
  };
  getEmojis();
  const onUserClicked = () => {
    dispatch(fetchProfileAction());
    history.push(`/profile/${post.user_id}`);
  };

  const profileUrl =
    post && post.facebook_uid
      ? `//graph.facebook.com/${post.facebook_uid}/picture`
      : post.attributes && post.attributes.photo_url
      ? `${API_ENDPOINT}/${post.attributes.photo_url}`
      : avatar;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/posts"></IonBackButton>
          </IonButtons>
          {isDarkMode ? (
            <img
              className="header-logo"
              alt="White Vault29 Logo"
              src={logoWhite}
            />
          ) : (
            <img
              className="header-logo"
              alt="Black Vault29 Logo"
              src={logoBlack}
            />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonSpinner />
        ) : (
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonAvatar slot="start">
                      <img alt="User Icon" src={profileUrl} />
                    </IonAvatar>

                    <IonLabel>
                      <IonText onClick={() => onUserClicked()}>
                        <h1>{post.name}</h1>
                      </IonText>
                      <IonText>
                        <span className="icon-location">
                          <IonIcon slot="start" src={locationOutline} />
                        </span>
                        {post.venue}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="auto">
                  <IonItem>
                    <IonIcon slot="start" src={timeOutline} />
                    <IonLabel className="ion-text-wrap">
                      {moment(post.created_at).fromNow()}
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <img alt="Post" src={`${API_ENDPOINT}/${post.photo_url}`} />
              </IonRow>
            </IonGrid>

            <IonCardContent>
              <h1>
                {/* {renderPlanText}{" "} */}
                {arrayWithHash.map((e, key) => {
                  return <span key={key}>{e}</span>;
                })}{" "}
              </h1>
            </IonCardContent>
            <div>
              {arrayTempEmoji.map((e, key) => {
                for (var i = 0; i < imagesJSON.length; i++) {
                  if (imagesJSON[i].name === e.name) {
                    return (
                      <img
                        key={key}
                        src={imagesJSON[i].img}
                        className="imgStyle"
                        alt={e.name}
                      />
                    );
                  }
                }
                return imagesJSON;
              })}
            </div>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonItem>
                    <IonIcon slot="start" src={heartOutline} />
                    <p className="pStyle">{post.attributes.like_count} Like </p>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem>
                    <IonIcon slot="start" src={chatbubbleEllipsesOutline} />
                    <p id="commentId" className="pStyle">
                      {post.attributes.comment_count} Comment{" "}
                    </p>
                  </IonItem>
                </IonCol>
                <IonCol size="2">
                  <IonItem>
                    <IonIcon
                      slot="start"
                      className="pStyle"
                      src={starOutline}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="2">
                  <IonItem>
                    <IonIcon slot="end" src={ellipsisVerticalOutline} />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Post;
