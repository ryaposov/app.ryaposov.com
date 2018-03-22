import {StackNavigator} from 'react-navigation';
import headerStyle from '../styles/HeaderStyles';

import Blog from '../pages/Blog';
import Post from '../pages/Post';

export default BlogStack = StackNavigator(
	{
		Blog: {
			screen: Blog, path: `/blog`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.routeName.toUpperCase(),
				headerBackTitle: null
			}),
		},
		Post: {
			screen: Post, path: `/blog/:id/`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.routeName.toUpperCase(),
				headerBackTitle: null
			})
		}
	},
	{
		headerTransitionPreset: 'uikit',
		navigationOptions: {
			...headerStyle
		},
	}
)
