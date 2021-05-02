import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';

import {getStudentGroup} from '../../actions';

import {colors} from '../../style';
import Admin from './Admin';
import Basic from './Basic';
const Home = props => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      {props.user.role === 'admin' ? <Admin /> : <Basic />}
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
