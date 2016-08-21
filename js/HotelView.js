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
  MapView,
} from 'react-native';

import ToppingItemCard from './ToppingItemCard';

class HotelView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };

    fetch('https://trvapi2.herokuapp.com/hotels/2177910')
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data,
      });
    });
  }

  render() {

    if (!this.state.data) {
      return null;
    }

    const flickrImages = [];
    this.state.data.toppings.picturesNearby.photos.photo.forEach((image) => {
      flickrImages.push(
        <Image
          style={styles.horizontalImageScrollViewImage}
          source={{ uri: image.url_z }}
          resizeMode="cover"
          key={'flickrImage_' + image.url_z}
        />
      );
    });

    const barsRestaurants = [];
    this.state.data.toppings.food.businesses.forEach((bar) => {
      barsRestaurants.push(
        <ToppingItemCard
          key={bar.name}
          height={280}
          width={200}
          title={bar.name}
          text={bar.snippet_text}
          rating={bar.rating}
          imageUrl={bar.image_url}
          color="rgb(71,126,171)"
        />
      );
    });

    const pokestops = [];
    this.state.data.toppings.pokestop.businesses.forEach((pokestop) => {
      const { latitude, longitude } = pokestop.location.coordinate;
      const imageUrl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=16&scale=false&size=250x150&maptype=terrain&format=jpg&visual_refresh=true&center=' + latitude + ',' + longitude + '&markers=' + latitude + ',' + longitude;
      console.log(imageUrl);
      pokestops.push(
        <ToppingItemCard
          key={'pokestop_' + pokestop.name}
          height={190}
          width={200}
          title={pokestop.name}
          text=""
          rating={pokestop.rating}
          imageUrl={imageUrl}
          color="rgb(187,83,64)"
        />
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.titleImage}
          source={{ uri: this.state.data.hotel.main_image.retina.replace('//', 'https://') }}
          resizeMode="cover"
        />
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>About {this.state.data.hotel.name}</Text>
          </View>
          <View style={styles.boxBody}>
            <Text
              numberOfLines={5}
              style={styles.text}>
              {this.state.data.hotel.description}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Ort</Text>
          </View>
          <View style={styles.boxBody}>
            <MapView
              style={{ height: 200, }}
              scrollEnabled={false}
              zoomEnabled={false}
              annotations={[
                {
                  latitude: Number(this.state.data.hotel.geo_coordinates.latitude),
                  longitude: Number(this.state.data.hotel.geo_coordinates.longitude),
                  title: 'Hotel',
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>Around {this.state.data.hotel.name}</Text>
          </View>
          <View style={styles.boxBody}>
            <Text style={styles.title}>Surrounding</Text>
            <View style={[{ height: 95 }]}>
              <ScrollView
                style={styles.horizontalImageScrollView}
                horizontal={true}
              >
                {flickrImages}
              </ScrollView>
            </View>
            <Text style={styles.title}>
              Bars & Restaurants
            </Text>
            <ScrollView
              style={{ height: 300 }}
              horizontal={true}
            >
              {barsRestaurants}
            </ScrollView>
            <Text style={styles.title}>
              Pokémon Go - Arenas and PokéStops
            </Text>
            <ScrollView
              style={{ height: 210 }}
              horizontal={true}
            >
              {pokestops}
            </ScrollView>
          </View>
        </View>
        <View style={styles.box}>
        </View>
      </ScrollView>
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
    marginBottom: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 20,
  },
  titleImage: {
    height: 150,
    width: window.width,
  },
  horizontalImageScrollView: {
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
    backgroundColor: 'rgb(71,126,171)',
    borderRadius: 10,
    paddingTop: 10,
  },
});

export default HotelView;
