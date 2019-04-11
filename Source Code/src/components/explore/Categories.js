import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,  
  Image,
  ImageBackground,
  
  View,
  Text,
} from 'react-native';
import colors from '../../styles/colors';
import iPhoneSize from '../../helpers/utils';
import { StackNavigator } from "react-navigation";


const size = iPhoneSize();
let cardSize = 100;
let cardMargin = 8;

if (size === 'small') {
  cardSize = 90;
  cardMargin = 4;
} else if (size === 'large') {
  cardSize = 115;
}

export default class Categories extends Component {
  
  get Categories() {
    const { categories } = this.props;
    
    return categories.map((category, index) => {
      function changeButtonColor(status){
        console.log('Status: '+status);
        if(status==='Detected'){
          return "#00e676";
          
      console.log("Color: "+this.buttonColor)
        }
        else if(status==='Not Safe'){
          return colors.red;
        }
        else{
          return colors.gray03;
        }

      console.log("Color: "+this.buttonColor)
      }

      
     console.log(changeButtonColor('Not Detected'));
      return(
        <TouchableOpacity
         style={[styles.button,{backgroundColor: changeButtonColor(category.status)}]}
         
         onPress={this.props.onPress}>

        <TouchableHighlight
          style={styles.card}>
          
          
          <Image
            source={category.photo}
            style={styles.image}

          />
          
        </TouchableHighlight>
        <View>
        <Text style={styles.buttonText}>
          {category.name}
          </Text>
          <Text style={styles.statusText}>
          Status: {category.status}
          </Text>
        </View>
        </TouchableOpacity>

      );
    });
  }

  render() {
  	return (
  	  <ScrollView
        contentContainerStyle={styles.wrapper}
      >
  	    {this.Categories}
  	  </ScrollView>
  	);
  }
}




const styles = StyleSheet.create({
  wrapper: {
  	flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: cardSize,
    height: cardSize,
    margin: cardMargin,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 50
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 350,
    height: null,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: cardMargin,
  },
  statusText: {
    color: 'white',
    fontSize: 20,
    margin: cardMargin,
  },
})