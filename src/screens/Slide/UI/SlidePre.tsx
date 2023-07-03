import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WordDef } from '../../../atom/FlashCardsDataState';
import { PanGesture } from './Components/PanGesture';
import { SlideButton } from './Components/SlideButton';

interface SlidePreProps {
  handleGoBack: () => void;
  word_list: WordDef[];
  page: number;
  handlePageChange: (page: number) => void;
  isFront: boolean;
  handleFlip: () => void;
  isSpeaking: boolean;
  handlePressSpeaker: (example: string) => void;
  handlePressSadIcon: (word_list: WordDef) => void;
  handlePressHappyIcon: (word_list: WordDef) => void;
  openIconDescription: (desc: string) => void;
}

const headerColor = '#79BC6E';
export const SlidePre: FC<SlidePreProps> = (props) => {
  const {
    page,
    word_list,
    handleGoBack,
    handlePageChange,
    isFront,
    handleFlip,
    isSpeaking,
    handlePressSpeaker,
    handlePressSadIcon,
    handlePressHappyIcon,
    openIconDescription,
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
      <PanGesture page={page} handlePageChange={handlePageChange}>
        <View style={styles.slide}>
          <TouchableOpacity onPress={() => handleFlip()} style={styles.content}>
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
            <TouchableOpacity
              onPress={() => handlePressSpeaker(word_list[page].example)}
              style={styles.speakerContainer}
            >
              <Ionicons
                name="volume-medium-outline"
                size={32}
                style={isSpeaking ? styles.green : styles.lightGray}
              />
            </TouchableOpacity>
            <View style={styles.faceIconsContainer}>
              <TouchableOpacity
                onPress={() => handlePressSadIcon(word_list[page])}
                onLongPress={() => openIconDescription('にがて')}
              >
                <Ionicons
                  name="sad-outline"
                  size={28}
                  style={word_list[page].status === 'unfamiliar' ? styles.blue : styles.lightGray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePressHappyIcon(word_list[page])}
                onLongPress={() => openIconDescription('おぼえた！')}
                style={styles.marginLeft}
              >
                <Ionicons
                  name="happy-outline"
                  size={28}
                  style={word_list[page].status === 'mastered' ? styles.orange : styles.lightGray}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </PanGesture>

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
  speakerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  faceIconsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  lightGray: {
    color: 'lightgray',
  },
  blue: {
    color: '#659AD2',
  },
  orange: {
    color: '#ED9E31',
  },
  green: {
    color: headerColor,
  },
  marginTop: {
    marginTop: 4,
  },
  marginLeft: {
    marginLeft: 4,
  },
});
