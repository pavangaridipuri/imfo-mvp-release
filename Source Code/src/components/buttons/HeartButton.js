
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class HeartButton extends Component {
  constructor(props) {
  	super(props);
  	this.state = { addedToFavorite: false };

    this.addToFavorite = this.addToFavorite.bind(this);
  }

  addToFavorite() {
    this.setState({
      addedToFavorite: !this.state.addedToFavorite
    });
  }

  render() {
  	const { addedToFavorite } = this.state;
  	const { color, selectedColor } = this.props;
    return (
      <TouchableOpacity
        onPress={this.addToFavorite}
      >
        <View>
          <Ionicons
            name={addedToFavorite ? 'heart' : 'heart-o'}
            color={addedToFavorite ? selectedColor : color}
            size={18}
          />

          <Ionicons
            name='heart-o'
            size={18}
            color={color}
            style={[
              { display: addedToFavorite ? 'flex' : 'none' },
              styles.selectedColor,
            ]}
         />
        </View>
      </TouchableOpacity>
    );
  }
}

HeartButton.propTypes = {
  color: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  selectedColor: {
    position: 'absolute',
    left: 0,
    top: 0,
  }
});