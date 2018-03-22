import * as posts from '../../api/crud';
import store from '../../store';

export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export function setActiveTabAction(tab) {
	return {
		type: SET_ACTIVE_TAB,
		tab
	};
}

export function setActiveTab(tab) {
  return (dispatch, getState) => {
		return dispatch(setActiveTabAction(tab))
  }
}
