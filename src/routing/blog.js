import {StackNavigator} from 'react-navigation';
import headerStyle from './headerStyles';

import Blog from '../pages/Blog';
import Post from '../pages/Post';

export default BlogStack = StackNavigator(
	{
		Blog: {
			screen: Blog, path: `/blog`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.routeName.toUpperCase()
			}),
		},
		Post: {
			screen: Post, path: `/blog/:id/`,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.routeName.toUpperCase()
			})
		}
	},
	{
		navigationOptions: {
			...headerStyle
		},
	}
)
