import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { PopoverState } from '../../../atom/PopoverState';

interface PopoverProps {
  id: number;
  showPopover: boolean;
  setShowPopover: Dispatch<SetStateAction<boolean>>;
  deleteFlashCards: () => void;
}
export const Popover: FC<PopoverProps> = ({
	id,
	showPopover,
	setShowPopover,
	deleteFlashCards,
}) => {
	const popover = useRecoilValue(PopoverState);
	const handleDeleteButton = () => {
		deleteFlashCards();
		handleHidePopover();
	};
	const handleHidePopover = () => setShowPopover(false);
	const checkPopoverHide = () => {
		if ((id !== popover.currentId && popover.currentId > -1) || !popover.visible) {
			handleHidePopover();
		}
	};
	useEffect(checkPopoverHide, [popover]);

	return showPopover && id === popover.currentId ? (
		<TouchableOpacity
			onPress={handleDeleteButton}
			style={styles.popoverContainer}
		>
			<Text style={styles.popoverText}>削除</Text>
		</TouchableOpacity>
	) : (
		<View></View>
	);
};

const styles = StyleSheet.create({
	popoverContainer: {
		position: 'absolute',
		right: -10,
		top: 20,
		backgroundColor: 'red',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
	},
	popoverText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
});
