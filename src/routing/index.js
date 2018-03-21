import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NavigationService from './navigationService';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import tabBarStyle from './tabBarStyle';
import ProjectsStack from './projects';
import BlogStack from './blog';

const NavigatorDevelopmentComponent = ProjectsStack('Development');

class NavigatorDevelopment extends React.Component {
  render () {
    return (
      <NavigatorDevelopmentComponent
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef, 1);
        }}
      />
    );
  }
}

const NavigatorDesignComponent = ProjectsStack('Design');

class NavigatorDesign extends React.Component {
  render () {
    return (
      <NavigatorDesignComponent
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef, 2);
        }}
      />
    );
  }
}

class NavigatorBlog extends React.Component {
  render () {
    return (
      <BlogStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef, 3);
        }}
      />
    );
  }
}

export default TabNavigator({
  Development: {
    screen: NavigatorDevelopment
  },
  Design: {
    screen: NavigatorDesign
  },
  Blog: {
    screen: NavigatorBlog
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
    style: tabBarStyle
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
});
