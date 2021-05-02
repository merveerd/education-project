import React from 'react';
import renderer from 'react-test-renderer';
import Entrance from './src/screens/Auth/Entrance';

test('renders correctly', () => {
  const tree = renderer.create(<Entrance />).toJSON();
  expect(tree).toMatchSnapshot();
});
