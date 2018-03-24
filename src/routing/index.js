import React from 'react';
import { Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import store from '../store';
import { setActiveTabAction } from '../store/actions/activeTab'

import NavigationService from './navigationService';
import StackComponent from './stackComponent';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import tabBarStyle from '../styles/tabBarStyle';

export default TabNavigator({
  Development: { screen: StackComponent('Development', 1) },
  Design: { screen: StackComponent('Design', 2) },
  Blog: { screen: StackComponent('Blog', 3) }
}, {
  navigationOptions: ({navigation}) => ({
		tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
			const { route, index } = scene;
			const id = scene.index + 1 // tab id

			if (route.key == previousScene.key) {
				// TEMP: More elegant solution needed
				let nav = NavigationService.getRef(id)._navigation;

				if (nav.state.routes.length > 1) {
					// Popping back
					nav.pop(1);
				} else {
					// Scrolling top
					nav.state.routes[0].params.scrollTop();
				}
			} else {
				// Setting activeTab to redux state
				store.dispatch(setActiveTabAction({ id, name: scene.route.routeName }))
			}

			return jumpToIndex(scene.index)
		},
		tabBarIcon: ({ focused, tintColor }) => {
			const { routeName } = navigation.state;
			let iconName;

			switch (routeName) {
				case 'Development':
					iconName = `ios-construct${focused ? '' : '-outline'}`
					break;
				case 'Design':
					iconName = `ios-flame${focused ? '' : '-outline'}`
					break;
				case 'Blog':
					iconName = `ios-text${focused ? '' : '-outline'}`
					break;
			}

			return (
				<View>
					<Icon name={iconName} size={25} style={{textAlign: 'center'}}/>
					<Text style={{letterSpacing: 1, fontSize: 10, fontWeight: focused ? '900' : '600'}}>
						{routeName.toUpperCase()}
					</Text>
				</View>
			);
		}
  }),
  tabBarOptions: {
    activeTintColor: '#000',
    inactiveTintColor: 'gray',
		showLabel: false,
    labelStyle: {
      fontSize: 14
    },
    style: tabBarStyle
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
	lazy: true
});
