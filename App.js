import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = 'dc86a322ad943c1cfdf17fcb1f31fade';

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    this.setState({ isLoading: false, temp, condition: weather[0].main, description: weather[0].description });
  };

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      // send to API and get weather
    } catch (error) {
      Alert.alert("Can't find you.", 'So sad');
    }
  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition, description } = this.state;
    console.log(temp, condition);
    return isLoading ? <Loading /> : <Weather description={description} condition={condition} temp={Math.round(temp)} />;
  }
}
