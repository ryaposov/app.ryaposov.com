import React from 'react';
import NavigationService from './navigationService';
import BlogStack from './blog';
import ProjectsStack from './projects';

export default (type, id) => {
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
