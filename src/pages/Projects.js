import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image } from 'react-native';
import { fetchProjects } from '../store/actions/projects';
import ProjectsGrid from '../components/projects';

import style from '../styles';

class Projects extends React.Component {
	type = this.props.navigation.getParam('type');

	projects = () => {
		return this.props.projects.items.filter(project => (
			project.category.indexOf(this.type) > -1
		))
	}

	scrollTop = () => this.ScrollView.scrollTo({ x: 0, y: 0, animated: true });

	componentDidMount () {
		fetchProjects();
	}

	componentWillMount() {
	  this.props.navigation.setParams({ scrollTop: this.scrollTop });
	}

  render() {
    return (
      <ScrollView style={style.ScrollView} ref={(ref) => this.ScrollView = ref}>
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
