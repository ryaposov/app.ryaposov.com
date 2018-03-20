import {StackNavigator} from 'react-navigation';

import Projects from '../pages/Projects';
import Project from '../pages/Projects';

export default ProjectsStack = (type) => (
	StackNavigator({
	  Projects: {
			screen: Projects,
			path: `/:type`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.params.type
			}),
		},
	  Project: {
			screen: Project,
			path: `/:type/:id/`,
			navigationOptions: ({ navigation }) => ({
				title: 'Project'
			}),
		}
	},
	{
		initialRouteParams: { type }
	})
)
