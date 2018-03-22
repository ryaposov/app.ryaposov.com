// import Markdown from 'preact-markdown';
// import TimeAgo from 'react-timeago';
// import style from './style.scss';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationService from '../routing/navigationService';
import Markdown from 'react-native-markdown-renderer';
import TimeAgo from 'react-native-timeago';
import Styles from '../styles/PostItem'

const markDown = StyleSheet.create({
  text: Styles.text
});


class Post extends React.Component { // eslint-disable-line react-prefer-stateless-function

	route = () => NavigationService.navigate('Post', 3, {
		path: `Blog/${this.props.post._id}`,
		id: this.props.post._id
	})

	render () {
		return (
			<View style={Styles.post}>
				<TouchableOpacity onPress={this.route}>
					<Text style={Styles.title}>{this.props.post.title}</Text>
				</TouchableOpacity>
				{ this.props.post._id ? (
					<TimeAgo style={Styles.date} time={this.props.post.date} />
				) : (
					this.props.post.date
				) }
				{ this.props.post._id ? (
					<Markdown style={markDown}>{this.props.post.introtext.substring(0, 200)}</Markdown>
				) : (
					<Text style={Styles.text}>{this.props.post.introtext}</Text>
				) }
				{ this.props.post._id &&
					<TouchableOpacity onPress={this.route} style={Styles.button}>
						<Text style={Styles.buttonText}>Read More</Text>
					</TouchableOpacity>
				}
			</View>
		);
	}
}

export default Post;
