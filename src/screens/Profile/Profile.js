import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Header} from '../../components';
import {connect} from 'react-redux';
import {fonts, colors} from '../../style';
import {launchImageLibrary} from 'react-native-image-picker';
import {getStudentGroup, updateUserProfile} from '../../actions';

const dummyProfileImage = require('../../assets/dummy.png');
const Profile = props => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (props.user.image) {
      setImage(props.user.image);
    }
  }, [props.user]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topBackground}>
          <Header onPress={props.navigation.goBack} />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            onPress={() => {
              const options = {
                noData: true,
                title: 'Resim Seç',
                quality: 0.2,
                mediaType: 'photo',
              };

              launchImageLibrary(options, response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else {
                  const source = response.uri;
                  setImage(source);
                  let updatedUser = {...props.user, image: response.uri};
                  props.updateUserProfile(updatedUser);
                }
              });
            }}>
            {image ? (
              <Image style={styles.avatar} source={{uri: image}}></Image>
            ) : (
              <Image style={styles.avatar} source={dummyProfileImage} />
            )}
          </TouchableOpacity>
          <View style={styles.info}>
            <Text style={styles.text}>{props.user.username} </Text>
            <Text
              onPress={() => {
                props.navigation.navigate('Reports');
              }}
              style={[styles.text, {color: colors.blue}]}>
              See the report
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBackground: {
    backgroundColor: colors.somon,
    height: 200,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.somon,
    padding: 10,
  },
  wrapper: {
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
  },
  text: {
    fontSize: fonts.medium,
    fontWeight: '600',
  },
  info: {
    padding: 10,
    alignItems: 'center',
  },
});

const mapStateToProps = ({authResponse, studentGroupResponse}) => {
  const {user} = authResponse;
  const {studentGroup} = studentGroupResponse;
  return {user, studentGroup};
};

export default connect(mapStateToProps, {getStudentGroup, updateUserProfile})(
  Profile,
);
