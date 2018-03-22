import { combineReducers } from 'redux';
import projects from './reducers/projects';
import posts from './reducers/posts';
import activeTab from './reducers/activeTab';

export default combineReducers({
	projects,
	posts,
	activeTab
});
