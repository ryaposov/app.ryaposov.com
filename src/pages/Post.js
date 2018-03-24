import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import NavigationService from '../routing/navigationService';
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
		height: 250,
		backgroundColor: '#eaeaea'
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

			this.markdown();
		}
	}

	id  = () => this.props.navigation.state.params.id

	markdown = () => {
		let markdown = this.state.post.text;
		let markdownComponent = <Markdown
			key={0}
			renderImage={renderImage}
			markdownStyles={markDown}>
				{markdown.trim()}
			</Markdown>;

		if (typeof markdown != 'string') {
			return [markdownComponent]
		}

		let findCode = markdown.match(/<\s*pre[^>]*>([^]+?)<\s*\/\s*pre>/ig);
		if (!findCode) {
			return [markdownComponent];
		}

		let markdownArray = [];
		markdown = markdown.replace(/<\s*pre[^>]*>([^]+?)<\s*\/\s*pre>/g, '{code}')

		markdown.split('{code}').forEach((s, i) => {
			markdownArray.push(
				<Markdown key={i} renderImage={renderImage} markdownStyles={markDown}>{s.trim()}</Markdown>
			);
			if (findCode[i]) {
				markdownArray.push(
					<SyntaxHighlighter key={i+'-1'} language='javascript' highlighter={"prism" || "hljs"}>{findCode[i].trim()}</SyntaxHighlighter>
				);
			}
		})

		return markdownArray;
	}

	componentDidMount () {
		this.init();
	}

	render () {
		return (
			<ScrollView style={style.ScrollView}>
				<View style={Styles.post}>
					<View style={{ marginBottom: 20 }}>
						<Text style={Styles.title}>{this.state.post.title}</Text>
						{ this.state.post._id ? (
							<TimeAgo style={Styles.date} time={this.state.post.date} />
						) : (
							this.state.post.date
						) }
					</View>
					{ this.state.post._id ? (
						this.markdown().map(text => text)
					) : (
						<Text style={Styles.text}>{this.state.post.text}</Text>
					) }
				</View>
			</ScrollView>
		);
	}
}

export default Post;
