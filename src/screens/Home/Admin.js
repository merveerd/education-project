import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {BarChart, PieChart, StackedBarChart} from 'react-native-chart-kit';
import {
  typeRatios,
  contentRatios,
  levelCount,
} from '../../reducers/ActiveCourseReducer';
import {getUserCoursesByType} from '../../actions';
import {colors, fonts} from '../../style';
import {Button} from '../../components';
const Admin = props => {
  useEffect(() => {
    if (props.activeCourses.length === 0) {
      props.getUserCoursesByType();
    }
  }, []);

  const {typeRatios, contentRatios, levelCount} = props;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const typeData = {
    labels: ['Speaking', 'Listening', 'Writing', 'Reading'],
    datasets: [
      {
        data: [
          typeRatios.speaking,
          typeRatios.listening,
          typeRatios.writing,
          typeRatios.reading,
        ],
      },
    ],
  };

  const contentData = [
    {
      name: 'Word',
      content: contentRatios.word || 0,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Grammar',
      content: contentRatios.grammar || 0,
      color: colors.somon,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Spelling',
      content: contentRatios.spelling || 0,
      color: 'pink',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const levelData = {
    labels: ['A', 'B', 'C'],
    legend: ['1', '2'],
    data: [
      [levelCount.A1, levelCount.A2],
      [levelCount.B1, levelCount.B2],
      [levelCount.C1, levelCount.C2],
    ],
    barColors: [colors.blue, colors.somon],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.somon,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(16, 61, 133, ${opacity})`,
    barPercentage: 1,

    decimalPlaces: 0,
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.blue} />
      <View style={styles.container}>
        <Text>Total User Number</Text>
        <Button text="Filter Users" />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>What mostly used</Text>

          <>
            <Text style={styles.subtitle}>Which skill</Text>
            <BarChart
              style={styles.barChart}
              data={typeData}
              width={screenWidth * 0.95}
              height={screenHeight / 3}
              yAxisLabel="%"
              chartConfig={chartConfig}
              fromZero={true}
              showValuesOnTopOfBars={true}
            />
            <Text style={styles.subtitle}>Which content</Text>
            <PieChart
              data={contentData}
              chartConfig={chartConfig}
              width={screenWidth}
              height={screenHeight / 3}
              accessor={'content'}
              center={[20, 10]}
            />
            <Text style={styles.subtitle}>Which language level</Text>
            <StackedBarChart
              style={styles.barChart}
              data={levelData}
              width={screenWidth * 0.95}
              height={420}
              showLegend={false}
              chartConfig={chartConfig}
            />
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.medium,
    letterSpacing: 3,
    color: colors.blue,
  },
  subtitle: {
    marginTop: '5%',
    fontSize: fonts.small,
    letterSpacing: 3,
    color: colors.blue,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barChart: {},
  button: {
    width: '85%',
  },
});

const mapStateToProps = ({
  authResponse,
  studentGroupResponse,
  activeCourseResponse,
}) => {
  const {user} = authResponse;
  const {studentGroup} = studentGroupResponse;
  const {activeCourses} = activeCourseResponse;
  return {
    user,
    studentGroup,
    activeCourses,
    typeRatios: typeRatios(activeCourseResponse),
    contentRatios: contentRatios(activeCourseResponse),
    levelCount: levelCount(activeCourseResponse),
  };
};

export default connect(mapStateToProps, {
  getUserCoursesByType,
})(Admin);
