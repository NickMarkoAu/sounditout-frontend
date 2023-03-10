import {StyleSheet, Text, View} from "react-native";
import TagComponent from "./TagComponent";
import {useTheme} from "../../../state/hooks";

const TagsContainer = ({post}) => {
  const {colours} = useTheme;
  const tags = post?.tags;
  const styles = StyleSheet.create({
    container: {
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 8,
      marginTop: 16
    },
    header: {
      color: colours.text_primary,
      fontWeight: "bold",
      fontSize: 18
    },
    tagsContainer: {
      width: "100%",
      marginTop: 8,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 4,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tags
      </Text>
      <View style={styles.tagsContainer}>
        {tags?.map((tag, index) => {
          const key = tag + index;
          return (<TagComponent key={key} tag={tag} />)
        })}
      </View>
    </View>
  );
}

export default TagsContainer;