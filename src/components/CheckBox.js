import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {colors} from '../style';
import {Icon} from 'native-base';
const CheckBox = props => (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity onPress={props.onPress}>
      {props.status ? (
        <Icon
          style={{color: colors.somon}}
          type="AntDesign"
          name="checkcircleo"></Icon>
      ) : (
        <Icon
          style={{color: colors.blue}}
          type="AntDesign"
          name="checkcircleo"></Icon>
      )}
    </TouchableOpacity>
  </View>
);

export {CheckBox};
