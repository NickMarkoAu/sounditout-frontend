import {StyleSheet, TextInput, View} from "react-native";
import {useTheme} from "../../../state/hooks";

const AddTagsComponent = () => {
  const {colours} = useTheme;
  const styles = StyleSheet.create({
    addTagContainer: {
      borderColor: colours.secondary,
      borderStyle: "solid",
      borderWidth: 2,
      padding: 2,
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 8
    },
    input: {
      height: 35,
      width: '90%',
      color: "white",
      margin: 5,
      borderWidth: 0,
      padding: 10,
    }
  });

  return (
    <View style={styles.addTagContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add tags..."
        placeholderTextColor="#7f7f7f"
      />
    </View>
  )
}

export default AddTagsComponent;