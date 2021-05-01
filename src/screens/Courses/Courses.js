import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {fonts, colors} from '../../style';
import * as RootNavigation from '../../RootNavigation';
import {getStudentGroup} from '../../actions';

const Courses = props => {
  useEffect(() => {
    // if (props.friendGroups.length === 0) {
    //   props.getstudentGroup(props.user);
    // }
  }, []);

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
  //         RootNavigation.navigate('FriendGroupDetails', item);
  //       }}>
  //       <Text style={styles.text}>{item.name}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <SafeAreaView>
      <View>
        <Text>Courses</Text>
        {/* <FlatList
          data={props.friendGroups}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center', padding: 20}}>
                <Text>You haven't added any friend group</Text>
              </View>
            );
          }}></FlatList> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;
  return {user};
};

export default connect(mapStateToProps, {getStudentGroup})(Courses);
