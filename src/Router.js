import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Icon} from 'native-base';
import {connect} from 'react-redux';

import Entrance from './screens/Auth/Entrance';
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';

import Menu from './screens/Menu/Menu';

import Home from './screens/Home/Home';

import Profile from './screens/Profile/Profile';

import Courses from './screens/Courses/Courses';
import Reports from './screens/Reports/Reports';

import UserDetails from './screens/Search/UserDetails';
import Search from './screens/Search/Search';

import Settings from './screens/Settings/Settings';

import {navigationRef} from './RootNavigation';
import {colors} from './style';

const menu = navigation => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
      style={{
        marginLeft: 20,
      }}>
      <Icon type="Feather" name="menu" style={{fontSize: 30}} />
    </TouchableOpacity>
  );
};

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Entrance">
      <AuthStack.Screen
        name="Entrance"
        component={Entrance}
        options={() => ({
          headerShown: false,
        })}
      />

      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

const ReportsStack = createStackNavigator();
const ReportsStackScreen = () => {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen name="Reports" component={Reports} />
    </ReportsStack.Navigator>
  );
};

const UserDetailsStack = createStackNavigator();
const UserDetailsStackScreen = () => {
  return (
    <UserDetailsStack.Navigator>
      <UserDetailsStack.Screen name="UserDetails" component={UserDetails} />
    </UserDetailsStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          headerLeft: () => menu(navigation),
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Settings');
                }}>
                <Icon
                  style={{color: colors.blue, marginRight: 10}}
                  type="Feather"
                  name="settings"></Icon>
              </TouchableOpacity>
            );
          },
        })}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
    </ProfileStack.Navigator>
  );
};

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
};

const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
      <SearchStack.Screen name="UserDetails" component={UserDetails} />
    </SearchStack.Navigator>
  );
};

const TabStack = createBottomTabNavigator();

const TabStackScreen = props => {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Courses') {
            iconName = 'search-plus';
          } else if (route.name === 'Reports') {
            iconName = 'user-circle';
          }
          //    else if (route.name === 'Tools') {
          //   iconName = 'user-circle';
          // }
          return (
            <Icon
              type="FontAwesome"
              name={iconName}
              style={{color: focused ? colors.somon : color, fontSize: size}}
            />
          );
        },
      })}
      tabBarOptions={{
        inactiveTintColor: colors.blue,
        activeTintColor: colors.somon,
      }}>
      <TabStack.Screen name="Home" component={HomeStackScreen} />
      <TabStack.Screen name="Courses" component={Courses} />
      <TabStack.Screen
        name="Reports"
        component={Reports}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
      />
    </TabStack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = props => {
  let user = props.route.params;
  return (
    <DrawerStack.Navigator
      drawerContent={props => <Menu {...props} user={user} />}
      drawerType="slide"
      drawerStyle={{
        width: '75%',
      }}>
      <DrawerStack.Screen name="Drawer" component={TabStackScreen} />
    </DrawerStack.Navigator>
  );
};

const RootStack = createStackNavigator();
function Router(props) {
  const {user} = props;

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode="none" mode="modal">
        {!user ? (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <>
            <RootStack.Screen
              name="Main"
              component={DrawerStackScreen}
              initialParams={user}
              options={{
                animationEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Profile"
              component={ProfileStackScreen}
              options={{
                animationEnabled: false,
              }}
            />

            <RootStack.Screen
              name="Reports"
              component={ReportsStackScreen}
              options={{
                animationEnabled: false,
              }}
            />

            <RootStack.Screen
              name="Settings"
              component={SettingsStackScreen}
              options={{
                animationEnabled: false,
              }}
            />
            <RootStack.Screen
              name="Search"
              component={SearchStackScreen}
              options={{
                animationEnabled: false,
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = ({authResponse}) => {
  const {loading, user} = authResponse;
  return {loading, user};
};

export default connect(mapStateToProps, {})(Router);
