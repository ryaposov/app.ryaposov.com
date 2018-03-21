import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import Post from '../components/post';
import { fetchPosts } from '../store/actions/posts';
import TextLoader from '../components/textLoader';

let postLoading = {
	title: <TextLoader text={'___ _____'.repeat(10)} />,
	introtext: <TextLoader text={'___ _____'.repeat(50)} />,
	date: new Date(),
	_id: false
};

let postsLoading = [postLoading].concat([postLoading]);

class Blog extends React.Component { // eslint-disable-line react-prefer-stateless-function
	posts = () => (this.props.posts.items.length ? this.props.posts.items : postsLoading)

	componentDidMount () {
		fetchPosts();
	}

	render () {
		return (
			<ScrollView>
				{ !this.props.posts.isFetching && !this.props.posts.items.length ? (
					<Text>No Posts Found</Text>
				) : (
					this.posts().map((post, i) => (
						<Post post={post} key={post._id + i} />
					))
				) }
			</ScrollView>
		);
	}
}

const mapStateToProps = (state) => ({ posts: state.posts });

export default connect(mapStateToProps)(Blog);
