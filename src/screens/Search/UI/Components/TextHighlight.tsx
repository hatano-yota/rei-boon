import { FC } from "react";
import { StyleSheet, Text } from "react-native";

interface TextHighlightProps {
  cardName: string;
  searchValue: string;
}

export const TextHighlight: FC<TextHighlightProps> = ({ cardName, searchValue }) => {
  if (cardName.toLocaleLowerCase() === searchValue.toLowerCase()) {
    // cardNameとsearchValueが完全に一致した場合
    return (
      <Text style={styles.itemText}>
        <Text style={styles.highlight}>{cardName}</Text>
      </Text>
    );
  }

  const pattern = new RegExp(`(${searchValue})`, "gi");
  const resultArr = cardName.split(pattern).filter(Boolean);
  const resultEle = resultArr.map((item, index) => {
    if (item.toLocaleLowerCase() === searchValue.toLocaleLowerCase()) {
      // cardNameとsearchValueが部分的に一致した場合
      return (
        <Text key={index} style={styles.highlight}>
          {item}
        </Text>
      );
    } else {
      return <Text key={index}>{item}</Text>;
    }
  });

  return <Text style={styles.itemText}>{resultEle}</Text>;
};

const styles = StyleSheet.create({
  itemText: {
    paddingLeft: 8,
    width: "40%",
    fontSize: 16,
  },
  highlight: {
    color: "red",
  },
});
