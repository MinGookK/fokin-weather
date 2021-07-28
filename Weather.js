import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { weatherData } from './db';

export default class Weather extends Component {
  render() {
    const { temp, condition, description } = this.props;

    return (
      <LinearGradient
        // Button Linear Gradient
        style={styles.container}
        colors={weatherData[condition].gradient}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.halfContainer}>
          <MaterialCommunityIcons color="white" size={100} name={weatherData[condition].iconName} />
          <Text style={styles.temp}>{temp}°</Text>
        </View>
        <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
          <Text style={styles.title}>{condition}</Text>
          <Text style={styles.subTitle}>{description}</Text>
        </View>
      </LinearGradient>
    );
  }
}

Weather.protoTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Atmosphere', 'Clear', 'Clouds']).isRequired,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: 40,
    color: 'white',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
    paddingVertical: 10,
  },
  subTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: '400',
  },
});
