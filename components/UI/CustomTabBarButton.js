import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { GlobalStyles } from '../../constants/styles';
import {Ionicons} from '@expo/vector-icons'

const CustomTabBarButton = props => {
  const {route, children, accessibilityState, onPress} = props;

  if (accessibilityState.selected) {
    return (
      <View style={styles.btnWrapper}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopLeftRadius: route === 'home' ? 10 : 0,
              },
            ]}
          />
          <Svg width={71} height={58} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={GlobalStyles.colors.primary500}
            />
          </Svg>
          <View
            style={[
              styles.svgGapFiller,
              {
                borderTopRightRadius: route === 'settings' ? 10 : 0,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
          style={[styles.activeBtn]}>
          <Ionicons
            name="add"
            size={50}
            color={GlobalStyles.colors.accent500}
          />
          <View>
            <Text>Add Expense</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[
          styles.inactiveBtn,
          {
            borderTopLeftRadius: route === 'home' ? 10 : 0,
            borderTopRightRadius: route === 'settings' ? 10 : 0,
          },
        ]}>
        <Ionicons
            name="add"
            size={50}
            color={GlobalStyles.colors.accent500}
          />
      </TouchableOpacity>
    );
  }
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 1,
    position: 'absolute',
    top: -90,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    elevation:4
  },
  inactiveBtn: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
});