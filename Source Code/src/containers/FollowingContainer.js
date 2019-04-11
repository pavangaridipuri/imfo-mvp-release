import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Categories from '../components/explore/Categories';
import Listings from '../components/explore/Listings';
import colors from '../styles/colors';
import usersList from '../data/categories';
import listings from '../data/listings';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import { StackNavigator } from "react-navigation";
import iPhoneSize from '../helpers/utils';
import ajax from '../../services/FetchData';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PTRView from 'react-native-pull-to-refresh';


const size = iPhoneSize();
let cardSize = 100;
let cardMargin = 8;

if (size === 'small') {
  cardSize = 90;
  cardMargin = 4;
} else if (size === 'large') {
  cardSize = 115;
}


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class Connections extends Component {


  constructor(props) {
    super(props);
    this.state = {
      favouriteListings: [],
      users: [],
      refreshing: false,
    };
    this.handleAddToFav = this.handleAddToFav.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.onCreateListClose = this.onCreateListClose.bind(this);


  }
  _refresh = () => {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  async componentDidMount() {
    const users = await ajax.fetchUsers();
    this.setState({ users });
  }

  handleAddToFav(listing) {
    const { navigate } = this.props.navigation;
    let { favouriteListings } = this.state;

    const index = favouriteListings.indexOf(listing.id);
    if (index > -1) {
      favouriteListings = favouriteListings.filter(item => item !== listing.id);
      this.setState({ favouriteListings });
    } else {
      navigate('CreateList', { listing, onCreateListClose: this.onCreateListClose });
    }
  }

  onCreateListClose(listingId, listCreated) {
    let { favouriteListings } = this.state;
    if (listCreated) {
      favouriteListings.push(listingId);
    } else {
      favouriteListings = favouriteListings.filter(item => item !== listingId);
    }
    this.setState({ favouriteListings });
  }

  renderListings() {
    return listings.map((listing, index) => (
      <View
        key={`listing-${index}`}
      >
        <Listings
          key={`listing-item-${index}`}
          title={listing.title}
          boldTitle={listing.boldTitle}
          listings={listing.listings}
          showAddToFav={listing.showAddToFav}
          handleAddToFav={this.handleAddToFav}
          favouriteListings={this.state.favouriteListings}
        />
      </View>
    ));
  }

  render() {
    function changeButtonColor(status) {
      console.log('Status: ' + status);
      if (status === 'Detected') {
        return colors.blueDetected;
        console.log("Color: " + this.buttonColor)
        var newPerson = {
          emailAddresses: [{
            label: "work",
            email: "mrniet@example.com",
          }],
          familyName: "Nietzsche",
          givenName: "Friedrich",
        }

        Contacts.addContact(newPerson, (err) => {
          if (err) throw err;
          // save successful
        })

      }
      else if (status === 'Not Detected') {
        return colors.grayNotDetected;
      }
      else if (status === 'Safe') {
        return colors.greenSafe;
      }
      else if (status === 'Not Safe') {
        return colors.redNotSafe;
      }
      else {
        return colors.greenSafe;
      }

      console.log("Color: " + this.buttonColor)
    }
    return (
      <View style={styles.wrapper}>
      <PTRView onRefresh={this._refresh} >

        <ScrollView
          showsVerticalScrollIndicator={false}

          style={styles.scrollview}
        >
          <Text style={styles.heading}>
            People You Follow
        </Text>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            data={this.state.users}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: changeButtonColor(item.status) }]}

                onPress={() => this.props.navigation.navigate('Details', {
                  name: item.name,
                  status: item.status,
                })}>
                {<TouchableHighlight
                  style={styles.card}>
                  <Image
                    source={{ uri: 'http://cdn.redalertpolitics.com/files/2016/08/Live-There_Tokyo_Elliott_Artist-Loft_20160222_0153_comp.jpg' }}
                    style={styles.image} />
                </TouchableHighlight>}
                <View>
                  <Text style={styles.buttonText}>
                    {item.name}
                  </Text>
                  <Text style={styles.statusText}>
                    Status: {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item.email}
          />
          <View style={styles.categories}>

          </View>
        </ScrollView>
        </PTRView>
      </View>
    );
  }
}


class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'NO-NAME');
    const status = navigation.getParam('status', 'NO-NAME');



    function changeBackgroundColor(status) {
      console.log('Status: ' + status);
      if (status === 'Detected') {
        return colors.blueDetected;

        console.log("Color: " + this.buttonColor)
      }
      else if (status === 'Not Detected') {
        return colors.grayNotDetected;
      }
      else if (status === 'Safe') {
        return colors.greenSafe;
      }
      else if (status === 'Not Safe') {
        return colors.redNotSafe;
      }
      else {
        return colors.greenSafe;
      }

      console.log("Color: " + this.buttonColor)
    }
    return (

      <ScrollView

        style={[styles.wrapper, { paddingTop: 12, paddingBottom: 12 }]}>

        <View style={[styles.button, { width: '90%', marginLeft: width * 0.05, backgroundColor: changeBackgroundColor(status) }]}>
          {<TouchableHighlight
            style={styles.card}>
            <Image
              source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
              style={styles.image} />
          </TouchableHighlight>}
          <View>
            <Text style={styles.profileHeading}>{JSON.stringify(name).replace(/\"/g, "")}</Text>

            <Text style={[styles.statusText, { marginLeft: 20 }]}>Status: {JSON.stringify(status).replace(/\"/g, "")}</Text>
          </View>
        </View>
        <Text style={[styles.statusText, { color: colors.gray04, marginLeft: 20 }]}>Location: {JSON.stringify(status).replace(/\"/g, "")}</Text>

        {status === 'Detected' ? <MapView
          provider={PROVIDER_GOOGLE}
          style={[styles.map, { width: '90%', marginLeft: width * 0.05 }]}
          showsUserLocation={true}
          region={this.state.region}
        >
          <MapView.Marker
            coordinate={this.state.region}
          />
        </MapView> : <View style={[styles.map, { backgroundColor: colors.gray01 }]} />}


        <Text style={[styles.statusText, { color: colors.gray04, marginLeft: 20 }]}>Sources: {JSON.stringify(status).replace(/\"/g, "")}</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10
        }}>
          <View style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: 'powderblue' }} />
          <View style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: 'skyblue' }} />
          <View style={{ width: 100, height: 100, borderRadius: 10, backgroundColor: 'steelblue' }} />
        </View>
      </ScrollView>
    );
  }
}

const RootStack = StackNavigator(

  {
    Home: Connections,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',

  }
);

export default class FollowingContainer extends Component {
  static navigationOptions = {
    tabBarLabel: 'FOLLOWING',
    tabBarIcon: ({ tintColor }) => (
      <Ionicons
        name="ios-body-outline"
        size={25}
        color={tintColor}
      />
    ),
  };
  render() {

    return <RootStack />;
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollview: {
    paddingTop: 12,

  },
  scrollViewContent: {
    paddingBottom: 80,
    margin: 10
  },
  categories: {
    marginBottom: 40,
  },

  LinearGradientStyle: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 20
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
    width: '100%',
    height: null,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { height: 3, width: 0 },
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    margin: cardMargin,
  },
  map: {
    height: 200,
    marginBottom: 40,
    borderRadius: 10

  },

  heading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 40,
    color: colors.gray04,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileHeading: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.white,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 20,
    margin: cardMargin,
  },
});
