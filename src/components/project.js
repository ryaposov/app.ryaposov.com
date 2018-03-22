import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import NavigationService from '../routing/navigationService';
import { config } from '../api';
import TextLoader from './textLoader';

const block = 'project';

let projectLoading = {
	title: <TextLoader text={'___ _____'.repeat(2)} />,
	category: [<TextLoader text="_____" />],
	colors: { main: '#eaeaea' },
	_id: false,
	thumbnail: false
};

class Project extends React.Component {
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

	route = () => NavigationService.navigate(
		this.props.activeTab.name + 'Project',
		this.props.activeTab.id,
		{
			path: `${this.props.activeTab.name}/${this.project()._id}`,
			id: this.project()._id
		}
	)

	category = () => {
		let cat = this.project().category.reduce((a, b) => (a + ', ' + b))
		if (typeof cat === 'string') cat = cat.toUpperCase()

		return cat
	}

	render () {
		return (
			<TouchableOpacity delayPressIn={40} activeOpacity={0.5} onPress={this.route} style={{ marginBottom: 5 }}>
				<Image style={{width: '100%', height: 250, backgroundColor: this.project().colors.main }} source={this.image()} />
				<View style={{ paddingLeft: 10, paddingRight: 40, paddingVertical: 20}}>
					{ this.project().category.length && (
						<Text style={{ marginBottom: 10, fontWeight: '800', fontSize: 12, letterSpacing: 2 }}>
							{this.category()}
						</Text>
					)}
					<Text style={{ fontWeight: '900', fontSize: 20, lineHeight: 25 }}>{this.project().title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const mapStateToProps = (state) => ({ activeTab: state.activeTab });

export default connect(mapStateToProps)(Project);
