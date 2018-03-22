// import Markdown from 'preact-markdown';
// import TimeAgo from 'react-timeago';
// import style from './style.scss';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import NavigationService from '../routing/navigationService';
// import Markdown from 'react-native-markdown-renderer';
import Markdown from 'react-native-easy-markdown';
import TimeAgo from 'react-native-timeago';
import TextLoader from '../components/textLoader';
import * as post from '../api/crud';
import Styles from '../styles/Post'

import style from '../styles';

const markDown = {
  text: Styles.text,
	h3: {
		fontSize: 25,
		fontWeight: '800',
		marginBottom: 20
	},
	image: {
		width: '100%',
		height: 250
	}
};

const renderImage = (src, alt, title) => {
	return (
		<Image
			key={src}
			style={{ width: '100%', height: 250 }}
			source={{ uri: src }}
		/>
	);
}


class Post extends React.Component { // eslint-disable-line react-prefer-stateless-function
	state = {
		post: {
			title: <TextLoader text={'___ _____'.repeat(10)} />,
			text: <TextLoader text={'___ _____'.repeat(100)} />,
			tags: ['     ', '   '],
			subtitle: ''
		}
	}

	init = async () => {
		let response = await post.getOne('posts', this.id());
		if (response.body && '_id' in response.body) {
			this.setState({ post: response.body });
		}
	}

	id  = () => this.props.navigation.state.params.id

	componentDidMount () {
		this.init();
		// Prism.highlightAll();
	}

	componentDidUpdate () {
		// Prism.highlightAll();
	}

	render () {
		return (
			<ScrollView style={style.ScrollView}>
				<View style={Styles.post}>
					<Text style={Styles.title}>{this.state.post.title}</Text>
					{ this.state.post._id ? (
						<TimeAgo style={Styles.date} time={this.state.post.date} />
					) : (
						this.state.post.date
					) }
					{ this.state.post._id ? (
						<Markdown style={{marginTop: 30}} renderImage={renderImage} markdownStyles={markDown}>{this.state.post.text}</Markdown>
					) : (
						<Text style={Styles.text}>{this.state.post.text}</Text>
					) }
				</View>
			</ScrollView>
		);
	}
}

export default Post;
