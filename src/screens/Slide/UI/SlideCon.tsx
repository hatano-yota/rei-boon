import { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { FC, useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSetRecoilState } from 'recoil';
import StackParamList from '../../../StackParamList';
import { FlashCardsDataState, FlashCardsDef, WordDef } from '../../../atom/FlashCardsDataState';
import { SlidePre } from './SlidePre';

type FlashCardsViewRouteProp = RouteProp<StackParamList, 'Slide'>;
interface SlideConProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const SlideCon: FC<SlideConProps> = ({ navigation, route }) => {
  const setCardsData = useSetRecoilState<FlashCardsDef[]>(FlashCardsDataState);
  const [data, setData] = useState(route.params.data);
  const [page, setPage] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageTotal = data.length;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= pageTotal - 1) {
      setPage(page);
    }
  };

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handlePressSpeaker = (example: string) => {
    Speech.speak(example, {
      rate: 1.0,
      pitch: 1.0,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  const handlePressSadIcon = (word_list: WordDef) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === word_list.id
          ? { ...item, status: item.status === 'weak' ? 'normal' : 'weak' }
          : item,
      ),
    );
  };

  const handlePressHappyIcon = (word_list: WordDef) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === word_list.id
          ? { ...item, status: item.status === 'completed' ? 'normal' : 'completed' }
          : item,
      ),
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setCardsData((prev) =>
        // TODO: 変更が保存されない、本当はidで比較したい(titleは重複の可能性あり)
        prev.map((item) => (item.name === route.params.title ? { ...item, words: data } : item)),
      );
    });
    return unsubscribe;
  }, [navigation]);

  const openIconDescription = (desc: string) => {
    Toast.show({
      text1: desc,
      type: desc === 'おぼえた！' ? 'success' : 'error',
      visibilityTime: 1000,
    });
  };

  return (
    <SlidePre
      handleGoBack={handleGoBack}
      word_list={data}
      page={page}
      handlePageChange={handlePageChange}
      isFront={isFront}
      handleFlip={handleFlip}
      isSpeaking={isSpeaking}
      handlePressSpeaker={handlePressSpeaker}
      handlePressSadIcon={handlePressSadIcon}
      handlePressHappyIcon={handlePressHappyIcon}
      openIconDescription={openIconDescription}
    />
  );
};
