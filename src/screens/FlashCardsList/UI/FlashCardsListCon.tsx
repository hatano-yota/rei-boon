import { FC, useEffect } from 'react';
import { FlashCardsListPre } from './FlashCardsListPre';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
	FlashCardsDataState,
	FlashCardsDef,
} from '../../../atom/FlashCardsDataState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { PopoverState } from '../../../atom/PopoverState';
export interface FlashCardListProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
/**
 * 単語帳一覧のロジック
 */
export const FlashCardsListCon: FC<FlashCardListProps> = ({ navigation }) => {
	const data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);
	const setPopover = useSetRecoilState(PopoverState);

	const rows: FlashCardsDef[][] = Array.from(
		{ length: Math.ceil(data.length / 2) },
		(_, index) => data.slice(index * 2, index * 2 + 2)
	);

	const onPressCard = (id: number) => {
		navigation.navigate('FlashCardsView', {
			data: data.find((item) => item.id === id),
		});
	};
	const onPressButton = () => {
		navigation.navigate('Create');
	};

	useEffect(()=>{
		const unsubscribe = navigation.addListener('blur', () => {
			setPopover(prev => ({currentId: prev.currentId, visible: false}));
		});      
		return unsubscribe;
	}, [navigation]);
	return (
		<FlashCardsListPre
			rows={rows}
			onPressCard={onPressCard}
			onPressButton={onPressButton}
		/>
	);
};
