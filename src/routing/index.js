import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {TabNavigator, TabBarBottom} from 'react-navigation';
import ProjectsStack from './projects'
import BlogStack from './blog'

export default TabNavigator({
  Development: {
    screen: ProjectsStack('Development')
  },
  Design: {
    screen: ProjectsStack('Design')
  },
  Blog: {
    screen: BlogStack
  }
}, {
  navigationOptions: ({navigation}) => ({
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
					<Text style={{letterSpacing: 1, fontSize: 10, fontWeight: focused ? '900' : '600'}}>{routeName.toUpperCase()}</Text>
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
    style: {
      backgroundColor: '#fff'
    }
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
});
