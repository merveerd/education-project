import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import csc from 'country-state-city';
import DropDownPicker from 'react-native-dropdown-picker';
import {fonts} from '../../style';
import {SearchList, Header} from '../../components';
import * as RootNavigation from '../../RootNavigation';
import {getUsersByLocation} from '../../actions';
const Search = props => {
  //groups or user search

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [selectedStateCode, setSelectedStateCode] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); //can be suburb too depends on the country.

  const [removeResults, setRemoveResults] = useState(false);
  useEffect(() => {
    //set country
    let formattedCountries = [];
    csc.getAllCountries().forEach(country => {
      formattedCountries.push({
        label: country.name,
        value: country.isoCode,
      });
    });
    setCountries(formattedCountries);
  }, []);

  useEffect(() => {
    //set state
    if (selectedCountryCode) {
      let formattedStates = [];

      csc.getStatesOfCountry(selectedCountryCode).forEach(state => {
        formattedStates.push({
          label: state.name,
          value: state.isoCode,
        });
      });
      setStates(formattedStates);
    }
  }, [selectedCountryCode]);

  useEffect(() => {
    // set city
    if (selectedStateCode) {
      let formattedCities = [];
      csc
        .getCitiesOfState(selectedCountryCode, selectedStateCode)
        .forEach(city => {
          formattedCities.push({
            label: city.name,
            value: city.name,
          });
        });
      setCities(formattedCities);
    }
  }, [selectedStateCode]);

  useEffect(() => {
    if (selectedCity) {
      props.getUsersByLocation(selectedCity);
      setRemoveResults(false);
    }
  }, [selectedCity]);

  const selectUser = item => {
    setRemoveResults(true);
    RootNavigation.navigate('UserDetails', item);
  };

  return (
    <SafeAreaView>
      <Header onPress={props.navigation.goBack} />
      <View style={{marginHorizontal: 20}}>
        <DropDownPicker
          containerProps={{
            margin: 10,
          }}
          searchContainerStyle={{
            border: '1px solid #dfdfdf',
          }}
          customItemContainerStyle={{
            backgroundColor: 'red',
          }}
          searchPlaceholder={'Search'}
          value={selectedCountryCode}
          setValue={setSelectedCountryCode}
          items={countries}
          setItems={setCountries}
          open={openCountry}
          setOpen={setOpenCountry}
          placeholder="Select Country"
          containerStyle={{minWidth: 150}}
        />
        {!openCountry && (
          <DropDownPicker
            containerProps={{
              margin: 10,
            }}
            searchPlaceholder={'Search'}
            value={selectedStateCode}
            setValue={setSelectedStateCode}
            items={states}
            setItems={setStates}
            open={openState}
            setOpen={setOpenState}
            placeholder="Select State"
          />
        )}
        {!openCountry && !openState && (
          <DropDownPicker
            containerProps={{
              margin: 10,
            }}
            searchPlaceholder={'Search'}
            value={selectedCity}
            setValue={setSelectedCity}
            items={cities}
            setItems={setCities}
            open={openCity}
            setOpen={setOpenCity}
            placeholder="Select City/Suburb"
          />
        )}

        {props.users.length > 0 && !removeResults && (
          <SearchList
            searchResults={props.users}
            text="username"
            onPress={selectUser}></SearchList>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({authResponse, usersResponse}) => {
  const {user} = authResponse;
  const {users} = usersResponse;
  return {user, users};
};

export default connect(mapStateToProps, {getUsersByLocation})(Search);
