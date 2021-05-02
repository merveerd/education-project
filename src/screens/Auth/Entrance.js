import React, {useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {colors, fonts, appName} from '../../style';
import {isUser} from '../../actions';

const Entrance = props => {
  useEffect(() => {
    props.isUser();
  }, []);

  if (props.loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: colors.purple,
      }}>
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <View style={styles.logoView}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.bodyView}>
        <Text style={appName}>LEARNING CENTER</Text>
        <Text style={styles.mainText}>
          Keep your level up and start immediately{' '}
        </Text>
      </View>
      <View style={styles.footerView}>
        <Text
          style={styles.whiteText}
          onPress={() => {
            props.navigation.navigate('SignIn');
          }}>
          Login
        </Text>
        <Text
          style={styles.whiteText}
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}>
          SignUp
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopWidth: 0,

    borderColor: colors.purple,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: colors.blue,
  },
  logo: {
    width: '68%',
    height: '76%',
  },
  bodyView: {
    flex: 3,
    marginTop: '10%',
    alignItems: 'center',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: fonts.main,
    color: 'white',
    fontStyle: 'italic',
    margin: '7%',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  whiteText: {
    color: 'white',

    fontSize: fonts.medium,
    margin: '10%',
  },
});

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {isUser})(Entrance);
