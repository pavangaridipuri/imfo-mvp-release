
import React, { Component } from 'react';
import colors from '../styles/colors';
import { transparentHeaderStyle } from '../styles/navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import iPhoneSize from '../helpers/utils';
import { NavigationActions } from 'react-navigation';


const size = iPhoneSize();
let termsTextSize = 13;
let headingTextSize = 30;

if (size === 'small') {
  termsTextSize = 12;
  headingTextSize = 26;
}
const navigateToProfileSetup = NavigationActions.navigate({
  routeName: 'LoggedIn',
});
export default class FaceSetup extends Component {
  

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('LogIn')} location="right" color= '#b61827' text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTintColor: colors.white,
  });

  onFacebookPress() {
    alert('Facebook button pressed');
  }

  onCreateAccountPress() {
  }

  onMoreOptionsPress() {
    alert('More options button pressed');
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
         {/* <Image
            source={require('../img/travelkit-logo.png')}
            style={styles.logo}
          /> */}
          <Text style={styles.loginHeader}>Is My Family Okay?</Text>
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.white}
            background={colors.pink}
            icon={<Ionicons name="facebook" size={20} style={styles.facebookButtonIcon}/>}
            handleOnPress={this.onFacebookPress}
          />
          <RoundedButton
            text="Finish Account Set Up"
            textColor='#b61827'
            handleOnPress={() => this.props.navigation.dispatch(navigateToProfileSetup)}
            background='#ff867c'
          />

          <TouchableHighlight
            style={styles.moreOptionsButton}
            onPress={this.onMoreOptionsPress}
          >
            <Text style={styles.moreOptionsButtonText}>More options</Text>
          </TouchableHighlight>

         <View style={styles.termsAndConditions}>
           <Text style={styles.termsText}>By tapping Continue, Create Account or More</Text>
           <Text style={styles.termsText}>options, </Text>
           <Text style={styles.termsText}>I agree to Is My Family Safe's </Text>
           <TouchableHighlight style={styles.linkButton}>
             <Text style={styles.termsText}>Terms of Service</Text>
           </TouchableHighlight>
           <Text style={styles.termsText}>, </Text>
           <TouchableHighlight style={styles.linkButton}>
             <Text style={styles.termsText}>Payments Terms of Service</Text>
           </TouchableHighlight>
           <Text style={styles.termsText}>, </Text>
           <TouchableHighlight style={styles.linkButton}>
             <Text style={styles.termsText}>Privacy Policy</Text>
           </TouchableHighlight>
           <Text style={styles.termsText}>, and </Text>
           <TouchableHighlight style={styles.linkButton}>
             <Text style={styles.termsText}>Nondiscrimination Policy</Text>
           </TouchableHighlight>
           <Text style={styles.termsText}>.</Text>
         </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.white,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
  },
  
  loginHeader: {
    fontSize: headingTextSize,
    color: '#ba000d',
    fontWeight: '300',
    marginBottom: 40,
  },
  facebookButtonIcon: {
    color: colors.white,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },
  moreOptionsButton: {
    marginTop: 10,
  },
  moreOptionsButtonText: {
    color: '#ba000d',
    fontSize: 16,
  },
  termsAndConditions: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 30,
  },
  termsText: {
    color: '#ba000d',
    fontSize: termsTextSize,
    fontWeight: '600',
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  }
});