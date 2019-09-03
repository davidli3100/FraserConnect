//import liraries
import React, { Component, Fragment } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { default as Text } from "../Text";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../../constants/Normalize";
import * as theme from "../../constants/theme";
import { withNavigation, createDrawerNavigator } from "react-navigation";
import * as GoogleSignIn from "expo-google-sign-in";
import * as firebase from "firebase"
import CustomMenu from "../dropdown/CustomMenu.js";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        
      }
    };
    // this._customInitialsHandler = this._customInitialsHandler.bind(this);
    // stringToColor = stringToColor.bind(this);
  }

  componentDidMount() {
    this._hydrateUserState();
 }

  _hydrateUserState = async () => {
    AsyncStorage.getItem("userPicture").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userPicture: JSON.parse(res)
        }
      }));
    });
    AsyncStorage.getItem("userName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userName: res,
          // userInitials: this._customInitialsHandler(res),
          // profileColour: stringToColor(res)
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
    AsyncStorage.getItem("userEmail").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userEmail: res
        }
      }));
    });
  };

  syncDeletes = [
    "uid",
    "userName",
    "userFirstName",
    "userLastName",
    "userEmail",
    "userPicture"
  ];

    _asyncLogOut = async() => {
        try {
            await GoogleSignIn.signOutAsync();
            try {
              await firebase.auth().signOut();
            } catch(err) {
              console.log("Firebase logout err: " + err)
            }
            await AsyncStorage.removeItem('user');
            this.props.navigation.navigate('Auth')
            // console.log('sign out successful')
        } catch ({error}) {
            console.error('Error in Logging Out: ' + error)
        } finally {
            await AsyncStorage.multiRemove(this.syncDeletes)
        }
    }

    
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <Text style={styles.textUpper}>Hi {this.state.user.userFirstName},</Text>
          <Text style={styles.textLower}>{this.props.headerDescription}</Text>
        </View>
        <View>
          <CustomMenu
            menutext="Menu"
            menustyle={{
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            textStyle={{
              color: "white"
            }}
            settingsClick={() => {
              console.log(this.state.user)
            }}
            logoutClick={() => {
              this._asyncLogOut();
            }}
            avatarURI={this.state.user.userPicture}
            userName={this.state.user.userName}
            // avatar={
            //   this._returnCustomAvatar()
            // }
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingTop: heightPercentageToDP("4%"),
    paddingBottom: heightPercentageToDP("4%"),
    paddingLeft: widthPercentageToDP("4.5%"),
    paddingRight: widthPercentageToDP("4.5%"),
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: heightPercentageToDP('10%'),
    backgroundColor: '#ffffff',
  },
  containerLeft: {
    flexDirection: "column"
  },
  textLower: {
    fontFamily: "Poppins-Medium",
    fontSize: heightPercentageToDP("1.9%"),
    color: "#627d98"
  },
  textUpper: {
    height: heightPercentageToDP('5.5%'),
    color: '#102a43',
    fontFamily: "Poppins-Bold",
    fontSize: heightPercentageToDP("3.7%"),
  },
  avatarStyle: {
    borderRadius: 14,
    overflow: 'hidden'
  }
});

//make this component available to the app
export default withNavigation(Header);
