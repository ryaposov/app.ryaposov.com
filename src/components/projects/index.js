import React from 'react';
import { Text, View } from 'react-native';
import Project from '../project';

class Projects extends React.Component { // eslint-disable-line react-prefer-stateless-function
	sizes = ['2-5', '2-5', '1-5', '3-5', '2-5', '5-5', '1-5', '2-5', '2-5', '2-5', '3-5', '5-5'];

	projects = () => (
		this.props.projects.length ? this.props.projects : this.sizes
	)

	render () {
		return (
			<View>
				{
					(this.props.status && !this.props.projects.length) ||
					(!this.props.status && this.props.projects.length) ||
					(this.props.projects.length) ? (
							this.projects().map((project, i) => (
								<Project size={this.sizes[i % this.sizes.length]} project={project} key={i} />
							))
						) : (
							<Text>No Projects Found</Text>
						)
				}
			</View>
		);
	}
}

export default Projects;
