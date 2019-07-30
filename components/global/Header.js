//import liraries
import React, { Component, Fragment } from "react";
import { View, StyleSheet, AsyncStorage, Button } from "react-native";
import { default as Text } from "../Text";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../constants/Normalize";
import * as theme from "../../constants/theme";
import { Avatar } from "react-native-elements";
import { withNavigation, createDrawerNavigator } from "react-navigation";
import * as GoogleSignIn from "expo-google-sign-in";
import * as firebase from "firebase"
import CustomMenu from "../dropdown/CustomMenu.js";
import Prompt from 'dev3s-react-native-prompt';
import 'firebase/firestore'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i);
  }

  let colour = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return colour;
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      titlePromptVisible: false,
      bodyPromptVisible: false,
      title: "",
      body: ""
    };
    this._openDrawer = this._openDrawer.bind(this);
  }

  
  announcementsRef = this.props.db.collection("announcements");

  componentDidMount() {
    this._hydrateUserState();
    // console.log(this.state)
  }

  _hydrateUserState = async () => {
    AsyncStorage.getItem("userName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userName: res
        }
      }));
    });
    AsyncStorage.getItem("userFirstName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userFirstName: res
        }
      }));
    });
    AsyncStorage.getItem("userLastName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userLastName: res
        }
      }));
    });
    AsyncStorage.getItem("uid").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          uid: res
        }
      }));
    });
    AsyncStorage.getItem("userPicture").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userPicture: res
        }
      }));
    });
    AsyncStorage.getItem("userEmail").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userEmail: res
        }
      }));
    });
  };

  _customInitialsHandler = string => {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  _openDrawer = () => {
    // this.props.navigation.navigate("DrawerOpen");
  };

  syncDeletes = [
    "uid",
    "userName",
    "userFirstName",
    "userLastName",
    "userEmail",
    "userPhoto"
  ];

  _asyncLogOut = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log("Firebase logout err: " + err)
      }
      await AsyncStorage.removeItem('user');
      this.props.navigation.navigate('Auth')
      // console.log('sign out successful')
    } catch ({ error }) {
      console.error('Error in Logging Out: ' + error)
    } finally {
      await AsyncStorage.multiRemove(this.syncDeletes)
    }
  }

  pushFirebaseStuff = () => {
    let data = {
      content: this.state.body,
      datePosted: firebase.firestore.FieldValue.serverTimestamp(),
      poster: this.state.user.userName,
      title: this.state.title
    };
    this.announcementsRef.add(data).then(ref => {
      console.log("Added document with ID: ", ref.id);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.textUpper}>FRASER CONNECT</Text>
          <Text style={styles.textLower}>{this.props.screenName}</Text>
        </View>
        <View>
          <Button
            onPress={() => this.setState({
              titlePromptVisible: true
            })}
            title="test"
          />
          <Prompt
            title="Title"
            placeholder="Add a creative title"
            visible={this.state.titlePromptVisible}
            onCancel={() => this.setState({
              titlePromptVisible: false,
              title: ""
            })}
            onSubmit={(value) => this.setState({
              titlePromptVisible: false,
              title: value,
              bodyPromptVisible: true
            })} />
          <Prompt
            title="Body"
            placeholder="Now add the announcement"
            visible={this.state.bodyPromptVisible}
            onCancel={() => this.setState({
              bodyPromptVisible: false,
              title: "",
              body: ""
            })}
            onSubmit={(value) =>
              this.setState({
                bodyPromptVisible: false,
                body: value
              }, () => this.pushFirebaseStuff())
            } />
          {/* Don't forget to add callback for post! */}
        </View>
        <View>
          <CustomMenu
            menutext="Menu"
            menustyle={{
              marginRight: 16,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            textStyle={{
              color: "white"
            }}
            settingsClick={() => {
              // Open Settings
            }}
            logoutClick={() => {
              this._asyncLogOut();
              // Log Out
            }}
            avatar={
              <Avatar
                overlayContainerStyle={{ backgroundColor: stringToColor(this.props.screenName) }}
                rounded
                size={heightPercentageToDP("5.1%")}
                title={
                  this.state.user["userName"]
                    ? this._customInitialsHandler(this.state.user["userName"])
                    : "John Fraser"
                }
                source={{ uri: this.state.user["userPhoto"] }}
              />
            }
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: heightPercentageToDP("2%"),
    paddingBottom: heightPercentageToDP("2%"),
    paddingLeft: widthPercentageToDP("4%"),
    paddingRight: widthPercentageToDP("4%"),
    // marginBottom: heightPercentageToDP("2%"),
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor: '#ffffff',
  },
  containerLeft: {
    flexDirection: "column"
  },
  textLower: {
    fontFamily: "Rubik-Bold",
    fontSize: heightPercentageToDP("2.8%"),
    paddingTop: heightPercentageToDP("0.3%")
  },
  textUpper: {
    color: theme.colors.gray,
    fontSize: heightPercentageToDP("1.5%")
  }
});

//make this component available to the app
export default withNavigation(Header);
