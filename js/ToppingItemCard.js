/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';

import StarRating from 'react-native-star-rating';

class ToppingItemCard extends Component {
  render() {
    return (
      <View style={[styles.card, { height: this.props.height, width: this.props.width, backgroundColor: this.props.color }]}>
        <Image
          style={{ height: 125, width: this.props.width, }}
          source={{ uri: this.props.imageUrl }}
          resizeMode="cover"
        />
        <Text
          style={{ textAlign: 'left', fontSize: 14, fontWeight: '500', marginTop: 10, color: 'white', marginLeft: 10, }}
        >
          {this.props.title}
        </Text>
        <View
          style={{ padding: 10, }}
        >
          <Text style={{ fontSize: 12, fontWeight: '200', color: 'white', }} numberOfLines={5}>
            {this.props.text}
          </Text>
        </View>
        <Text style={{ position: 'absolute', bottom: 5, left: 10, fontSize: 14, fontWeight: '400', color: 'white', }}>
          300 m
        </Text>
        <View
          style={{ position: 'absolute', bottom: 5, right: 10, width: 50, }}
        >
          <StarRating
            disabled={true}
            maxStars={5}
            rating={this.props.rating}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starSize={12}
            starColor="white"
            emptyStarColor="white"
            selectedStar={() => {}}

          />
        </View>
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(220,220,220)',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
  },
  text: {
    fontSize: 14,
    fontWeight: '200',
  },
  titleImage: {
    height: 150,
    width: window.width,
  },
  horizontalImageScrollView: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    height: 85,
  },
  horizontalImageScrollViewImage: {
    marginRight: 5,
    width: 150,
    height: 85,
  },
  box: {
    marginBottom: 5,
    backgroundColor: 'white',
  },
  boxHeader: {
    flex: 1,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'lightgrey',
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 10,
  },
  boxBody: {
    padding: 10,
  },
  card: {
    marginRight: 10,
    backgroundColor: 'rgb(71,126,171)',
  },
});

export default ToppingItemCard;
