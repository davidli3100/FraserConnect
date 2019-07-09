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
import { withNavigation } from "react-navigation";
import * as GoogleSignIn from "expo-google-sign-in";

// create a component
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this._openDrawer = this._openDrawer.bind(this);
  }

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
    this.props.navigation.navigate("DrawerOpen");
  };

  syncDeletes = [
    "uid",
    "userName",
    "userFirstName",
    "userLastName",
    "userEmail",
    "userPhoto"
  ];

    _asyncLogOut = async() => {
        try {
            await GoogleSignIn.signOutAsync();
            await firebase.auth().signOut();
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
          <Text style={styles.textUpper}>FRASER CONNECT</Text>
          <Text style={styles.textLower}>{this.props.screenName}</Text>
        </View>
        <View>
          <Avatar
            overlayContainerStyle={{ backgroundColor: theme.colors.blue }}
            rounded
            onPress={() => {
              this._openDrawer();
              this._asyncLogOut();
            }}
            size={heightPercentageToDP("5.1%")}
            title={
              this.state.user["userName"]
                ? this._customInitialsHandler(this.state.user["userName"])
                : "John Fraser"
            }
            source={{ uri: this.state.user["userPhoto"] }}
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
