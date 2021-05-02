import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {BarChart, PieChart, StackedBarChart} from 'react-native-chart-kit';
import {getPersonalCourses} from '../../actions';
import {colors, fonts} from '../../style';
import {Button} from '../../components';
import * as RootNavigation from '../../RootNavigation';

const Basic = props => {
  const {user, getPersonalCourses} = props;
  const [courseCount, setCourseCount] = useState(0);
  useEffect(() => {
    if (user && !user.courses) {
      getPersonalCourses(user.id);
    } else if (user) {
      setCourseCount(user.courses.length);
    }
  }, [user]);

  const renderItem = ({item}) => {
    console.log('course', item);
    return (
      <>
        <Text style={styles.title}> {item['courses.name']}</Text>
        <Text style={styles.subtitle}> Topic: {item['courses.topic']}</Text>
        <Text style={styles.subtitle}>
          Linguistic Skill: {item['courses.type']}
        </Text>
        <Text style={styles.subtitle}>Type: {item['courses.content']}</Text>
      </>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />

      <View style={styles.infoWrapper}>
        <Text style={styles.title}>{courseCount} Assigned Courses</Text>
        <Text style={styles.subtitle}>
          English Level {user.language_level.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>Average Score {user.score}</Text>
      </View>

      {user.courses && (
        <FlatList
          data={user.courses}
          extraData={true}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          ListFooterComponent={<View style={{height: 350}} />}></FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: '4%',
    fontSize: fonts.main,
    letterSpacing: 3,
    color: colors.somon,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subtitle: {
    marginTop: '1%',
    marginBottom: '1%',
    fontSize: fonts.small,
    letterSpacing: 3,
    color: colors.blue,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  info: {
    fontSize: fonts.small,
    letterSpacing: 3,
    color: colors.blue,
  },

  infoWrapper: {
    marginBottom: '10%',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '50%',
    marginBottom: '10%',
  },
});

const mapStateToProps = ({authResponse}) => {
  const {user} = authResponse;

  return {
    user,
  };
};

export default connect(mapStateToProps, {
  getPersonalCourses,
})(Basic);
