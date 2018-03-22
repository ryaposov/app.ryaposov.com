import {
	SET_ACTIVE_TAB
} from './../actions/activeTab';

let defaultState = {
	id: 1,
	name: 'Development'
};

function activeTab(state = defaultState, action) {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return Object.assign({}, state, action.tab);
		default:
			return state;
	}
}

export default activeTab;
