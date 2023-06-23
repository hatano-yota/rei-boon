import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FlashCardsDataState, FlashCardsDef } from '../../../atom/FlashCardsDataState';
import { SearchPre } from './SearchPre';

export interface FilteredData {
  fileId: number;
  fileName: string;
  isOpen: boolean;
  id: number;
  name: string;
  lang: string;
  mean: string;
  example: string;
}

interface SearchConProps {
  navigation: NativeStackNavigationProp<ParamListBase, 'Search'>;
}

/**
 * 単語検索画面のロジック
 */
export const SearchCon: FC<SearchConProps> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);
  const convertedData = useMemo(() => {
    return data.flatMap((cards) =>
      cards.words.map((word) => ({
        ...word,
        fileId: cards.id,
        fileName: cards.name,
        isOpen: false,
      })),
    );
  }, [data]);
  const [filteredData, setFilteredData] = useState<FilteredData[]>(convertedData);

  const handleToggle = (id: number, fileId: number) => {
    setFilteredData((prevData) =>
      prevData.map((card) =>
        card.fileId === id && card.id === fileId ? { ...card, isOpen: !card.isOpen } : card,
      ),
    );
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
    const lowerCaseText = text.toLowerCase();
    const updatedFilteredData =
      text === ''
        ? convertedData
        : convertedData.filter((card) => card.name.toLowerCase().includes(lowerCaseText));
    setFilteredData(updatedFilteredData);
  };

  const onPressFileName = (fileId: number) => {
    navigation.navigate('FlashCardsView', {
      data: data.find((item) => item.id === fileId),
    });
  };

  // convertedDataの更新に伴いfilteredDataを更新する
  useEffect(() => {
    setFilteredData(convertedData);
  }, [convertedData]);

  return (
    <SearchPre
      searchValue={searchValue}
      filteredData={filteredData}
      handleToggle={handleToggle}
      handleSearch={handleSearch}
      onPressFileName={onPressFileName}
    />
  );
};
