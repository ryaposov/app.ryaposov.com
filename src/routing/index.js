import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import store from '../store';
import { setActiveTabAction } from '../store/actions/activeTab'

import NavigationService from './navigationService';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import tabBarStyle from '../styles/tabBarStyle';
import ProjectsStack from './projects';
import BlogStack from './blog';

function StackComponent (type, id) {
	let NavigatorComponent = id !== 3 ? ProjectsStack(type) : BlogStack

	class Navigator extends React.Component {
	  render () {
	    return (
	      <NavigatorComponent
	        ref={navigatorRef => {
	          NavigationService.setTopLevelNavigator(navigatorRef, id);
	        }}
	      />
	    );
	  }
	}

	return Navigator
}

export default TabNavigator({
  Development: {
    screen: StackComponent('Development', 1)
  },
  Design: {
    screen: StackComponent('Design', 2)
  },
  Blog: {
    screen: StackComponent('Blog', 3)
  }
}, {
  navigationOptions: ({navigation}) => ({
		tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
			const { route, index } = scene;
			const id = scene.index + 1

			if (route.key == previousScene.key) {
				// TEMP: More elegant solution needed
				let nav = NavigationService.getRef(id)._navigation;
				nav.state.routes[0].params.scrollTop();
			} else {
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
					<Ionicons name={iconName} size={25} style={{textAlign: 'center'}}/>
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
