import { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';


interface SlideButtonProps {
  text: string;
}

export const SlideButton: FC<SlideButtonProps> = (props) => {
	return (
		<View style={styles.button}>
			<Text style={styles.buttonText}>
				{props.text}
			</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#79BC6E',
		width: 300,
		height: 50,
		margin: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
	},
});