import {View, StyleSheet, TextInput} from "react-native";
import ProfileButton from "../../navigation/ProfileButton";

const CommentBoxComponent = () => {
  const styles = StyleSheet.create({
    commentBoxContainer : {
      flexDirection: "row",
      justifyContent: "space-between"
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
   <View style={styles.commentBoxContainer}>
     <ProfileButton onPress={() => {}} />
     <TextInput
       style={styles.input}
       placeholder="Add comment..."
       placeholderTextColor="#7f7f7f"
     />
   </View>
 );
}

export default CommentBoxComponent;