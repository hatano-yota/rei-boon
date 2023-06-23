import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WordDef } from '../../../atom/FlashCardsDataState';
import { SlideButton } from './Components/SlideButton';

interface SlidePreProps {
  handleGoBack: () => void;
  word_list: WordDef[];
  page: number;
  handlePageChange: (page: number) => void;
  isFront: boolean;
  handleFlip: () => void;
  handlePressSadIcon: (word_list: WordDef) => void;
  handlePressHappyIcon: (word_list: WordDef) => void;
  // openIconDescription: (desc: string) => void;
}

const headerColor = '#79BC6E';
export const SlidePre: FC<SlidePreProps> = (props) => {
  const {
    page,
    word_list,
    isFront,
    handleGoBack,
    handlePageChange,
    handleFlip,
    handlePressSadIcon,
    handlePressHappyIcon,
    // openIconDescription,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.headline}>
        {isFront ? (
          <Text style={styles.headline_text}>単語</Text>
        ) : (
          <Text style={styles.headline_text}>意味・例文</Text>
        )}
      </View>

      <View style={styles.slide}>
        <View style={styles.content}>
          {/* 表なら単語、裏なら意味・例文 */}
          {isFront ? (
            <Text style={styles.content_text}>{word_list[page].name}</Text>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.scrollContent}>
                <Text style={styles.content_text}>意味: {word_list[page].mean}</Text>
                <Text style={[styles.content_text, styles.marginTop]}>
                  例文: {word_list[page].example}
                </Text>
              </View>
            </ScrollView>
          )}
          <View style={styles.faceIconsContainer}>
            <TouchableOpacity
              onPress={() => handlePressSadIcon(word_list[page])}
              // onLongPress={() => openIconDescription('にがて')}
            >
              <Ionicons
                name="sad-outline"
                size={28}
                style={word_list[page].status === 'weak' ? styles.sadIcon : styles.faceIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePressHappyIcon(word_list[page])}
              // onLongPress={() => openIconDescription('おぼえた！')}
              style={styles.marginLeft}
            >
              <Ionicons
                name="happy-outline"
                size={28}
                style={word_list[page].status === 'completed' ? styles.happyIcon : styles.faceIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.pagenation}>
        <View>
          <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
            <AntDesign name="caretleft" size={40} color={headerColor} />
          </TouchableOpacity>
        </View>
        <Text style={styles.page_text}>
          {page + 1}/{word_list.length}
        </Text>
        <View>
          <TouchableOpacity onPress={() => handlePageChange(page + 1)}>
            <AntDesign name="caretright" size={40} color={headerColor} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleFlip()}>
        <SlideButton text="切り替え" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGoBack()}>
        <SlideButton text="終了" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  headline_text: {
    fontSize: 30,
  },
  slide: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pagenation: {
    paddingVertical: 15,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  page_text: {
    fontSize: 20,
    lineHeight: 40, // 上下を均等にする
    paddingHorizontal: 10,
  },
  content: {
    width: '80%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: headerColor,
    position: 'relative',
  },
  content_text: {
    fontSize: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  faceIconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  faceIcon: {
    color: 'lightgray',
  },
  sadIcon: {
    color: 'blue',
  },
  happyIcon: {
    color: 'orange',
  },
  marginTop: {
    marginTop: 4,
  },
  marginLeft: {
    marginLeft: 4,
  },
});
