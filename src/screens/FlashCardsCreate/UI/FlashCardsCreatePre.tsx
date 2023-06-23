import type { FC } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

interface FlashCardsCreatePreProps {
  flashcardName: string;
  buttonDisable: boolean;
  handleNameChanged: (text: string) => void;
  handleCreateFlashcard: () => void;
}

/**
 * 単語帳作成画面のUI
 */
export const FlashCardsCreatePre: FC<FlashCardsCreatePreProps> = (props) => {
	const {
		flashcardName,
		buttonDisable,
		handleCreateFlashcard,
		handleNameChanged,
	} = props;

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: 80,
			}}
		>
			<TextInput
				placeholder="単語帳名を入力"
				value={flashcardName}
				onChangeText={handleNameChanged}
				style={styles.input}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={handleCreateFlashcard}
				disabled={buttonDisable}
			>
				<Text style={styles.buttonText}>単語帳作成</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		marginBottom: 100,
		paddingLeft: 15,
		height: 40,
		width: '80%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
	},
	button: {
		backgroundColor: '#5FA1DE',
		height: 40,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
	},
});
