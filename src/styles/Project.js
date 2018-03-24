import { Stylesheet } from 'react-native';

export default Stylesheet.create({
	title: {
		fontSize: 30,
		fontWeight: '900',
		marginTop: 30,
		marginBottom: 10
	},
	image: {
		width: '100%',
		height: 320
	},
	param: {
		marginBottom: 30
	},
	label: {
		letterSpacing: 2,
		fontSize: 15,
		marginBottom: 10,
		fontWeight: '800'
	},
	value: {
		fontSize: 20,
		fontWeight: '800'
	},
	goal: {
		fontSize: 25,
		lineHeight: 35,
		fontWeight: '300'
	}
})
