import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

export default class MYS extends Component {
  static navigationOptions = {
    tabBarLabel: 'MARK SAFE',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons
        name="ios-body-outline"
        size={22}
        color={tintColor}
      />
    ),
  };

  render() {
    return (
      <View style={{ backgroundColor: colors.white }}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>
            Mark Yourself Safe
        </Text>
          <Text style={styles.description}>
            Notify your friends and family members that you are safe
          </Text>
          <Text style={styles.description}>
            This status will disappear after 12 hours unless you mark youself safe again
        </Text>
          <TouchableHighlight
            onPress={() => {
              Alert.alert('Marked "Safe"');
            }}
            style={styles.findHomesButton}>
            <Text style={styles.findHomesButtonText}>
              Mark Yourself Safe
          </Text>
          </TouchableHighlight>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    color: colors.white,
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 40,
    color: colors.gray04,
    marginTop: 110,
    paddingLeft: 20,
    paddingRight: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray04,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.gray05,
    paddingLeft: 20,
    paddingRight: 20,
  },
  findHomesButton: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 16,
    borderRadius: 3,
    backgroundColor: colors.pink,
  },
  findHomesButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: '600',
  },
});