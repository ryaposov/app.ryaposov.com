// import Markdown from 'preact-markdown';
// import TimeAgo from 'react-timeago';
// import style from './style.scss';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';

class Post extends React.Component { // eslint-disable-line react-prefer-stateless-function
	render () {
		return (
			<View>
				<Text>{this.props.post.title}</Text>
				<Text>{this.props.post.date.toString()}</Text>
				{ this.props.post._id ? (
					<Text>{this.props.post.introtext.substring(0, 200) + '...'}</Text>
				) : (
					<Text>{this.props.post.introtext}</Text>
				) }
				{ this.props.post._id && (<Text href={`/blog/${this.props.post._id}/`}>Read more</Text>) }
			</View>
		);
	}
}

export default Post;
