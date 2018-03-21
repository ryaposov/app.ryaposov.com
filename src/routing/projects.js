import {StackNavigator} from 'react-navigation';
import headerStyle from './headerStyles';

import Projects from '../pages/Projects';
import Project from '../pages/Project';

export default ProjectsStack = (type) => (
	StackNavigator({
	  [type + 'Projects']: {
			screen: Projects,
			path: `/:type`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.params.type.toUpperCase()
			}),
		},
	  [type + 'Project']: {
			screen: Project,
			path: `/:type/:id/`,
			navigationOptions: ({ navigation }) => ({
				title: 'Project'.toUpperCase()
			}),
		}
	},
	{
		initialRouteParams: { type },
		navigationOptions: {
      ...headerStyle
    },
	})
)
