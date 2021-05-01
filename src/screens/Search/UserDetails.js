import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {fonts, colors} from '../../style';
import {TextInput} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {
  createStudentGroup,
  getStudentGroup,
  updateStudentGroup,
} from '../../actions';

const UserDetails = props => {
  // const [createGroup, setCreateGroupModal] = useState(false);
  // const [addInGroup, setAddInGroup] = useState(false);
  // const [groupName, setGroupName] = useState('');

  // const [results, setResults] = useState([]);

  // const searchGroup = text => {
  //   //local search
  //   let arr = props.studentGroup.filter(i =>
  //     i.name.toLowerCase().includes(text.toLowerCase()),
  //   );
  //   setResults(arr.slice(0, 5));
  // };

  // const renderItem = ({item}) => (
  //   <View style={styles.item}>
  //     <TouchableOpacity
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         borderBottomWidth: 0.5,
  //         borderColor: colors.somon,
  //       }}
  //       onPress={() => {
  //         if (!item.members.includes(props.route.params.id)) {
  //           item.members.push(props.route.params.id);
  //           props.updateStudentGroup(item); //sending updated Student group
  //         } else {
  //           Alert.alert('warning', 'this person is already in this hub!');
  //         }
  //       }}>
  //       <Text style={styles.text}>{item.name}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <SafeAreaView>
      <View style={styles.header}></View>
      <Text style={styles.text}>User Details</Text>
      {/* <View style={styles.info}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://bootdey.com/img/Content/avatar/avatar3.png'}}
        />

        <Text style={styles.name}>{props.route.params.name}</Text>
        <Text>{props.route.params.username}</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          placeholder="Add in your one of the Student hubs!"
          placeholderTextColor="black"
          style={styles.buttonContainer}
          onChangeText={text => {
            setAddInGroup(text);
            searchGroup(text);
          }}></TextInput>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setCreateGroupModal(true);
          }}>
          <Text>Let's create a new Student group!</Text>
        </TouchableOpacity>
        <Modal
          isVisible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            console.warn('close model');
          }}
          visible={createGroup}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => {
                setCreateGroupModal(false);
              }}>
              <Text>Close</Text>
              <Icon type="FontAwesome" name="close"></Icon>
            </TouchableOpacity>
            <View style={styles.modalItems}>
              <TextInput
                style={styles.customInput}
                onChangeText={text => setGroupName(text)}
                placeholder="Choose a name"
                placeholderTextColor="black"></TextInput>
              <Text
                style={{fontSize: fonts.medium}}
                onPress={() => {
                  if (
                    groupName &&
                    props.studentGroup.every(group => group.name !== groupName)
                  ) {
                    props.createStudentGroup({
                      name: groupName,
                      admin: props.user.id,
                      members: [props.user.id, props.route.params.id],
                    });
                    setCreateGroupModal(false);
                  } else {
                    Alert.alert(
                      'Warning',
                      'Please enter a group name that you are not a member of',
                    );
                  }
                }}>
                Create!
              </Text>
            </View>
          </View>
        </Modal>
        {addInGroup ? (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}`}></FlatList>
        ) : (
          []
        )} */}
      {/* </View> */}
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, StudentGroupResponse}) => {
  const {user} = authResponse;
  const {studentGroup} = StudentGroupResponse;
  return {user, studentGroup};
};

export default connect(mapStateToProps, {
  createStudentGroup,
  updateStudentGroup,
  getStudentGroup,
})(UserDetails);

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
  body: {
    padding: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: colors.somon,
  },
  customInput: {
    width: '60%',
    height: '40%',
    borderRadius: 30,
    textAlign: 'center',

    backgroundColor: colors.blue,
    fontSize: fonts.medium,
  },
  modalView: {
    marginTop: Dimensions.get('window').height / 2,
    maxHeight: Dimensions.get('window').height / 2,
    backgroundColor: colors.somon,
  },
  modalItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeModal: {
    marginRight: 0,
  },
  openModal: {
    padding: 20,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginHorizontal: 16,
  },
  text: {
    padding: 20,
    fontSize: fonts.small,
  },
});
