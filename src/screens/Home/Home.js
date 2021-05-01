import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import {getStudentGroup} from '../../actions';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../../style';
import Admin from './Admin';
const Home = props => {
  const isVisible = useIsFocused();
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {props.user.role === 'admin' ? <Admin /> : <Text>Home</Text>}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, studentGroupResponse}) => {
  const {user} = authResponse;
  const {studentGroup} = studentGroupResponse;
  return {user, studentGroup};
};

export default connect(mapStateToProps, {
  getStudentGroup,
})(Home);
