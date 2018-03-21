import { NavigationActions } from 'react-navigation';

let _navigators = [];

function setTopLevelNavigator(navigatorRef, tabId = 1) {
  _navigators[tabId] = navigatorRef;
}

function navigate(routeName, tabId = 1, params = {}) {
  let response = _navigators[tabId].dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
