import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BackButton} from './BackButton';
import {fonts, colors, appName} from '../style';
import {Icon} from 'native-base';
import * as RootNavigation from '../RootNavigation';
const Header = props => {
  return (
    <View style={styles.header}>
      <BackButton onPress={RootNavigation.pop} />
      <View style={{alignItems: 'center'}}>
        <Text style={[appName, {fontSize: fonts.small, color: 'white'}]}>
          Learning Center
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          RootNavigation.navigate('Settings');
        }}>
        <Icon
          style={{color: colors.blue}}
          type="Feather"
          name="settings"></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.somon,
    padding: 10,
  },
});

export {Header};
