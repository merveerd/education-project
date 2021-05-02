import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {fonts} from '../../style';
import {getStudentGroup} from '../../actions';

const Reports = props => {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text style={styles.text}>Reports</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: fonts.main,
    alignSelf: 'center',
  },
});

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;
  return {user};
};

export default connect(mapStateToProps, {getStudentGroup})(Reports);
