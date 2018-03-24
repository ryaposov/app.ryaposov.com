import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import Markdown from 'react-native-easy-markdown';
import { config } from '../api';
import * as projects from '../api/crud';
import TextLoader from '../components/textLoader';

import style from '../styles';
import Styles from '../styles/Project';

const markDown = StyleSheet.create({
  text: {
		fontSize: 20,
		lineHeight: 30
	}
});

class Project extends React.Component {
	state = {
		project: {
			title: <TextLoader text={'___ _____'.repeat(10)} />,
			text: <TextLoader text={'___ _____'.repeat(100)} />,
			goal: <TextLoader text={'___ _____'.repeat(10)} />,
			category: [<TextLoader text="__________" />],
			links: [<TextLoader text="__________" />],
			stack: [<TextLoader text="__________" />],
			colors: { main: '#eaeaea' }
		}
	}

	goBack = () => window.history.back();

	image = () => config().base + '/storage/' + this.id() + '/' + this.state.project.image

	imageStyle = () => ({
		backgroundColor: this.project().colors.main
	})

	scrollViewStyle = Object.assign({}, style.ScrollView, { paddingTop: 0 })

	project = () => this.state.project

	id  = () => this.props.navigation.state.params.id

	params = () => ([
		{
			label: 'Project goal',
			value: this.project().goal,
			style: 'goal'
		},
		{
			label: 'Client',
			value: this.project().client
		},
		{
			label: 'Links',
			value: this.project().links.length
				? this.project().links.reduce((a, b) => a + ', ' + b) : ''
		},
		{
			label: 'Type',
			value: this.project().category.length
				? this.project().category.reduce((a, b) => a + ', ' + b) : ''
		},
		{
			label: 'Year',
			value: 2011
		},
		{
			label: 'Stack',
			value: this.project().stack.length
				? this.project().stack.reduce((a, b) => a + ', ' + b) : '',
			if: this.project().stack.length > 0
		}
	])

	init = async () => {
		this.setState({ loading: false });
		let response = await projects.getOne('projects', this.id());
		if (response.body && '_id' in response.body) {
			this.setState({ project: response.body, loading: false });
		}
	}

	componentDidMount () {
		this.init();
	}

  render() {
    return (
      <ScrollView style={this.scrollViewStyle}>
				<View style={{...Styles.image, ...this.imageStyle()}}>
					{this.project().hasOwnProperty('_id') && (
						<Image source={{uri: this.image()}} style={Styles.image} />
					)}
				</View>
				<View style={{ paddingHorizontal: 10 }}>
					<Text style={Styles.title}>{this.project().title}</Text>
					{this.project().hasOwnProperty('_id') ? (
						<Markdown markdownStyles={markDown}>{this.project().text}</Markdown>
					) : (
						<Text>{this.project().text}</Text>
					)}
					<View style={{ marginTop: 20 }}>
						{
							this.params().map(param => (
								('if' in param && param.if) || !('if' in param) &&
									<View key={param.label} style={Styles.param}>
										<Text style={Styles.label}>{param.label.toUpperCase()}</Text>
										<Text style={'style' in param ? Styles[param.style] : Styles.value}>
											{param.value}
										</Text>
									</View>
							))
						}
					</View>
				</View>
      </ScrollView>
    );
  }
}

export default Project
