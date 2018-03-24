import {StackNavigator} from 'react-navigation';
import headerStyle from '../styles/HeaderStyles';

import Projects from '../pages/Projects';
import Project from '../pages/Project';

export default ProjectsStack = (type) => (
	StackNavigator({
	  [type + 'Projects']: {
			screen: Projects,
			path: `/:type`,
			navigationOptions: ({ navigation }) => ({
				title: type.toUpperCase(),
				headerBackTitle: null
			})
		},
	  [type + 'Project']: {
			screen: Project,
			path: `/:type/:id/`,
			navigationOptions: ({ navigation }) => ({
				title: 'Project'.toUpperCase(),
				headerBackTitle: null
			}),
		}
	},
	{
		headerTransitionPreset: 'uikit',
		initialRouteParams: { type },
		navigationOptions: {
			// headerTransparent: true,
      ...headerStyle
    },
	})
)
