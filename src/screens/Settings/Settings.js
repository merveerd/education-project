import React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../actions';
import {Button} from '../../components';
const Settings = props => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}>
          <Button
            text="Sign out"
            onPress={() => {
              props.signOut();
            }}
            style={{fontSize: fonts.small}}></Button>
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
