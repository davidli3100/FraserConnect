//import liraries
import React, { Component, Fragment } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
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


function stringToColor(input_str) {
  var baseRed = 128;
  var baseGreen = 128;
  var baseBlue = 128;

  //lazy seeded random hack to get values from 0 - 256
  //for seed just take bitwise XOR of first two chars
  var seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
  var rand_1 = Math.abs((Math.sin(seed++) * 10000)) % 256;
  var rand_2 = Math.abs((Math.sin(seed++) * 10000)) % 256;
  var rand_3 = Math.abs((Math.sin(seed++) * 10000)) % 256;

  //build colour
  var red = Math.round((rand_1 + baseRed) / 2);
  var green = Math.round((rand_2 + baseGreen) / 2);
  var blue = Math.round((rand_3 + baseBlue) / 2);

  return 'rgb(' + red + ',' + green + ',' + blue + ')'
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        
      }
    };
    this._openDrawer = this._openDrawer.bind(this);
    this._customInitialsHandler = this._customInitialsHandler.bind(this);
    stringToColor = stringToColor.bind(this);
  }

  componentDidMount() {
    this._hydrateUserState();
 }

  _hydrateUserState = async () => {
    AsyncStorage.getItem("userPicture").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userPicture: res
        }
      }));
    });
    AsyncStorage.getItem("userName").then(res => {
      this.setState((prevState, props) => ({
        user: {
          ...prevState.user,
          userName: res,
          userInitials: this._customInitialsHandler(res),
          profileColour: stringToColor(res)
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

  _returnCustomAvatar = () => {
    if(this.state.user.userPicture && this.state.user.userPicture !== undefined) {
      return <Avatar
      containerStyle={styles.avatarStyle}
      // avatar={styles.avatarStyle}
      imageProps={{resizeMode: 'cover'}}
      // overlayContainerStyle={styles.avatarStyle}
      size={heightPercentageToDP("7.5%")}
      source={{ uri: this.state.user.userPicture }}
    />
    } else {
      return <Avatar
      containerStyle={styles.avatarStyle}
      avatar={styles.avatarStyle}
      overlayContainerStyle={{ backgroundColor: this.state.user.profileColour} + styles.avatarStyle}
      size={heightPercentageToDP("7.5%")}
      title={
        this.state.user.userInitials
      }
    />
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
              // Log Out
            }}
            avatar={
              this._returnCustomAvatar()
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
