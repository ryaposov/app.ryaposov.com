import {StackNavigator} from 'react-navigation';

import Blog from '../pages/Blog';
import Post from '../pages/Post';

export default BlogStack = StackNavigator({
	Blog: {
		screen: Blog, path: `/blog`,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.routeName
		}),
	},
	Post: {
		screen: Post, path: `/blog/:id/`,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.routeName
		})
	}
})
