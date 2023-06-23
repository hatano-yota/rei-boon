import { Ionicons } from '@expo/vector-icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WordDef } from '../../../atom/FlashCardsDataState';
import { WordCard } from './Components/WordCard';

export interface FlashCardsListPreProps {
  flashcardName: string;
  buttonDisable: boolean;
  wordsData: WordDef[];
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
  handleNameChanged: (text: string) => void;
  handleAdd: () => void;
  handleSave: () => void;
  onPressToSlide: () => void;
  OpenCreateExampleErrorMessage: () => void;
}

export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
	const {
		flashcardName,
		buttonDisable,
		wordsData,
		handleNameChanged,
		handleAdd,
		handleSave,
		setWordsData,
		onPressToSlide,
		OpenCreateExampleErrorMessage,
	} = props;
	return (
		<View style={styles.FlashCardsContainer}>
			<View style={styles.FlashCardsTitleContainer}>
				<TextInput
					value={flashcardName}
					onChangeText={handleNameChanged}
					placeholder="単語帳名を入力"
					style={styles.FlashCardsTitleInput}
				/>
			</View>
			<ScrollView style={styles.FlashScrollContainer} showsVerticalScrollIndicator={false}>
				{wordsData.map((item) => (
					<WordCard
						key={item.id}
						item={item}
						setWordsData={setWordsData}
						OpenCreateExampleErrorMessage={OpenCreateExampleErrorMessage}
					/>
				))}
			</ScrollView>
			<View style={styles.FlashCardsBottom}>
				<TouchableOpacity
					style={{ ...styles.SaveButton, ...styles.ButtonCommon }}
					disabled={buttonDisable}
					onPress={handleSave}
				>
					<Text style={styles.SaveButtonText}>保存する</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ ...styles.SlideButton, ...styles.ButtonCommon }}
					onPress={onPressToSlide}
					disabled={wordsData.length === 0 ? true : false}
				>
					<Text style={styles.SlideButtonText}>スライドショー</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.PlusButton} onPress={handleAdd}>
					<Ionicons name="add" size={20} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	FlashCardsContainer: {
		position: 'relative',
		flex: 1,
	},
	FlashCardsTitleContainer: {
		paddingTop: 37,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
	FlashCardsTitleInput: {
		paddingHorizontal: 18,
		height: 38,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#000',
		borderRadius: 5,
		fontSize: 20,
	},
	FlashScrollContainer: {
		flexGrow: 1,
	},

	FlashCardsBottom: {
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 15,
		paddingHorizontal: 30,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	ButtonCommon: {
		width: 130,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	SaveButton: {
		backgroundColor: '#5FA1DE',
	},
	SaveButtonText: {
		color: '#fff',
		fontSize: 15,
	},
	SlideButton: {
		backgroundColor: '#fff',
		borderWidth: 1,
	},
	SlideButtonText: {
		fontSize: 15,
	},
	PlusButton: {
		backgroundColor: '#599D4D',
		justifyContent: 'center',
		alignItems: 'center',
		width: 53,
		height: 53,
		borderRadius: 50,
	},
});
