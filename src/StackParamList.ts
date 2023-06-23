import { ParamListBase } from '@react-navigation/native';
import { FlashCardsDef, WordDef } from './atom/FlashCardsDataState';

export interface StackParamList extends ParamListBase {
  FlashCardsView: {
    data: FlashCardsDef;
  };
  Slide: {
    title: string;
    data: WordDef[]
  };
}

export default StackParamList;
