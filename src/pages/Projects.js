import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { fetchProjects } from '../store/actions/projects';
import ProjectsGrid from '../components/projects';

class Projects extends React.Component {
	constructor (props) {
		super(props);
	}

	state = {

	};

	projects = () => this.props.projects.items.filter(project => (
		project.category.indexOf(this.props.navigation.getParam('type')) > -1
	))

	componentDidMount () {
		fetchProjects();
	}

  render() {
    return (
      <ScrollView>
				<ProjectsGrid
					projects={this.projects()}
					status={this.props.projects.isFetching}
				/>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({ projects: state.projects });

export default connect(mapStateToProps)(Projects);
