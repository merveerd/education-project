import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {fonts, colors} from '../../style';
import {deleteUser, updateUser} from '../../actions';
import {Input, CheckBox} from '../../components';

const UserDetails = props => {
  const [showInput, setShowInput] = useState(false);
  const [level, setLevel] = useState(props.route.params.language_level);
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

        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            props.deleteUser(props.route.params.id);
          }}>
          <Text style={styles.text}>Delete User</Text>
          <Icon
            style={{color: colors.blue}}
            type="MaterialIcons"
            name="delete"></Icon>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            setShowInput(true);
          }}>
          <Text style={styles.text}>Update User</Text>
          <Icon
            style={{color: colors.blue}}
            type="FontAwesome"
            name="pencil"></Icon>
        </TouchableOpacity>

        {showInput && (
          <>
            <Input
              placeholder={'Enter language level such as A1 or B2'}
              value={level}
              onChangeText={level => setLevel(level)}></Input>
            <CheckBox
              status={showInput}
              onPress={() => {
                setShowInput(false);

                props.updateUser({
                  id: props.route.params.id,
                  updated: {language_level: level},
                });
              }}></CheckBox>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, studentGroupResponse}) => {
  const {user} = authResponse;
  const {studentGroup} = studentGroupResponse;
  return {user, studentGroup};
};

export default connect(mapStateToProps, {deleteUser, updateUser})(UserDetails);

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
    fontSize: fonts.main,
    letterSpacing: 3,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    color: colors.blue,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  text: {
    fontSize: fonts.medium,
    letterSpacing: 3,
  },
});
