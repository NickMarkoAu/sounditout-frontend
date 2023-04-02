import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../../state/hooks";

const TagComponent = ({tag, deleteTag}) => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    tagContainer: {
      borderColor: colours.secondary,
      borderStyle: "solid",
      borderWidth: 2,
      borderRadius: 20,
      flexDirection: "row",
      padding: 4,
    },
    tagText: {
      color: colours.text_primary,
      marginLeft: 2,
      marginRight: 2
    },
    deleteButton: {
      marginLeft: 4
    }
  });

  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>
        #{tag}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteTag}>
        <FontAwesomeIcon icon={faTimesCircle} color={colours.secondary}/>
      </TouchableOpacity>
    </View>
  )
}

export default TagComponent;