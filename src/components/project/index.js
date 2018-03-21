import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import NavigationService from '../../routing/navigationService';
import { config } from '../../api';
import TextLoader from '../textLoader';

const block = 'project';

let projectLoading = {
	title: <TextLoader text={'___ _____'.repeat(2)} />,
	category: [<TextLoader text="_____" />],
	colors: { main: '#eaeaea' },
	_id: false,
	thumbnail: false
};

export default class Project extends React.Component {
	loading = () => (typeof this.props.project === 'string')

	project = () => (this.loading() ? projectLoading : this.props.project)

	image = () => {
		let image = this.size() === '5-5' || this.size() === '3-5' ? 'image' : 'thumbnail';
		return { uri: config().base + '/storage/' + this.project()._id + '/' + this.project()[image] }
	}

	size = () => {
		if (this.loading() || 'size' in this.project()) {
			return this.props.size;
		}
		return this.project().size;
	}

	route = () => {
		NavigationService.navigate('DevelopmentProject', 1, { userName: 'Lucy' });
	}

	render () {
		return (
			<TouchableOpacity delayPressIn={40} activeOpacity={0.8} href={`/project/${this.project()._id}/`} onPress={this.route}>
				<Image style={{width: '100%', height: 250}} source={this.image()} />
				<View style={{ paddingVertical: 20, paddingHorizontal: 10}}>
					<Text>{this.project().category.length && this.project().category.reduce((a, b) => a + ', ' + b)}</Text>
					<Text>{this.project().title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
