import React from 'react';
import { Text } from 'react-native';

class TextLoader extends React.Component {
	render () {
		return (
			<Text class="text-loader" style={{backgroundColor: '#ececec', color: 'transparent'}}>{this.props.text}</Text>
		)
	}
}

export default TextLoader
