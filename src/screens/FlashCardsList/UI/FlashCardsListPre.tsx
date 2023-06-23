import { FC } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { RenderItem } from '../Components/RenderItem';
import { FlashCardsDef } from '../../../atom/FlashCardsDataState';

interface FlashCardsListPreProps {
  rows: FlashCardsDef[][];
  onPressCard: (id: number) => void;
  onPressButton: () => void;
}

/**
 * 単語帳一覧のUI
 */
export const FlashCardsListPre: FC<FlashCardsListPreProps> = ({
	rows,
	onPressCard,
	onPressButton,
}) => {
	return rows.length > 0 ? (
		<ScrollView
			contentContainerStyle={styles.ScrollContainer}
			showsVerticalScrollIndicator={false}
		>
			{rows.map((row, index) => (
				<View key={index} style={styles.row}>
					{row.map((item) => (
						<RenderItem
							key={item.id}
							id={item.id}
							name={item.name}
							onPressCard={onPressCard}
						/>
					))}
					{
						// 1の場合は空のやつを表示
						row.length === 1 && <RenderItem id={-1} name="" />
					}
				</View>
			))}
		</ScrollView>
	) : (
		<View style={styles.container}>
			<Text style={styles.heading}>単語帳はありません</Text>
			<TouchableOpacity style={styles.button} onPress={onPressButton}>
				<Text style={styles.buttonText}>単語帳を作成する</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
	heading: {
		fontSize: 20,
		fontWeight: '700',
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 5,
		backgroundColor: '#79BC6E',
	},
	buttonText: {
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
	},
	ScrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
	},
});
