import { atom, selector } from 'recoil';

export type WordStatus = 'learning' | 'unfamiliar' | 'mastered';
export interface FlashCardsDef {
  id: number;
  name: string;
  words: WordDef[];
}
export interface WordDef {
  id: number;
  name: string;
  mean: string;
  lang: string;
  example: string;
  status: WordStatus;
}

export const FlashCardsDataState = atom<FlashCardsDef[]>({
  key: 'FlashCardsDataState',
  default: [
    {
      id: 0,
      name: '単語帳1',
      words: [
        {
          id: 0,
          name: 'hello',
          lang: '英語',
          mean: 'こんにちは',
          example: '',
          status: 'learning',
        },
      ],
    },
  ],
});

export const NextAvailableIdSelector = selector<number>({
  key: 'NextAvailableIdSelector',
  get: ({ get }) => {
    const flashCardsData = get(FlashCardsDataState);

    if (flashCardsData.length === 0) {
      return 0;
    }

    const maxId = flashCardsData.reduce((max, card) => {
      return Math.max(max, card.id);
    }, -1);

    return maxId + 1;
  },
});

export const getWordObj = (prev: WordDef[]): WordDef => {
  return {
    id: (() => {
      if (prev.length === 0) {
        return 0;
      }

      const maxId = prev.reduce((max, card) => {
        return Math.max(max, card.id);
      }, -1);

      return maxId + 1;
    })(),
    name: '',
    lang: '',
    mean: '',
    example: '',
    status: 'learning',
  };
};
