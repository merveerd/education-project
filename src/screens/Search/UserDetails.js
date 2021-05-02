import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {fonts, colors} from '../../style';

const UserDetails = props => {
  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.header}></View>
      <View style={styles.info}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}
        />

        <Text style={styles.name}>{props.route.params.name}</Text>
        <Text>{props.route.params.username}</Text>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, studentGroupResponse}) => {
  const {user} = authResponse;
  const {studentGroup} = studentGroupResponse;
  return {user, studentGroup};
};

export default connect(mapStateToProps, {})(UserDetails);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.somon,
    height: 200,
  },
  info: {
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: -60,
  },
  name: {
    fontSize: fonts.small,
  },
});
