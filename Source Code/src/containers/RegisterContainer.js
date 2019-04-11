
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NoResults from '../components/saved/NoResults';
import colors from '../styles/colors';
import { SearchBar } from 'react-native-elements'

import Contacts from 'react-native-contacts';
import ContactsWrapper from 'react-native-contacts-wrapper';


export default class RegisterContainer extends Component {
  static navigationOptions = {
    tabBarLabel: 'REGISTER',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons
        name="ios-heart-outline"
        size={22}
        color={tintColor}
      />
    ),
  };

  render() {

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

      <View style={styles.wrapper}>
      

      </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: colors.white,
  },
});