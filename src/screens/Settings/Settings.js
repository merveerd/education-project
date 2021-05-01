import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../actions';

const Settings = props => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() => {
            props.signOut();
          }}
          style={{
            marginRight: 20,
          }}>
          <Text style={{fontSize: fonts.small}}> Sign out </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;
  return {user};
};

export default connect(mapStateToProps, {signOut})(Settings);
