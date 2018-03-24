import React from 'react';
import { Text } from 'react-native';

function TextLoader () {
	return (
		<Text
			class="text-loader"
			style={{backgroundColor: '#ececec', color: 'transparent'}}
		>
			{this.props.text}
		</Text>
	);
}

export default TextLoader
