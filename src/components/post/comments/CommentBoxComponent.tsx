import {View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import ProfileButton from "../../user/profile/ProfileButton";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector, useTheme} from "../../../state/hooks";
import {submitCommentAction} from "../../../state/song-suggestion.slice";
import {User} from "../../user/user.model";
import {selectCurrentUser} from "../../../state/song-suggestion.selector";

const CommentBoxComponent = ({post}) => {
  const {colours} = useTheme;
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectCurrentUser);

  const styles = StyleSheet.create({
    commentBoxContainer : {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      height: 35,
      width: '80%',
      color: "white",
      margin: 5,
      borderWidth: 0,
      padding: 10,
    }
  });

  const submitComment = () => {
    console.log("submitComment to post ", post.id);
    dispatch(submitCommentAction({comment: { post, user, content: comment }}));
  }

 return (
   <View style={styles.commentBoxContainer}>
     <ProfileButton user={user} onPress={() => {}} />
     <TextInput
       style={styles.input}
       placeholder="Add comment..."
       placeholderTextColor="#7f7f7f"
       value={comment}
       onChangeText={setComment}
     />
     {comment.length > 0 &&
       <TouchableOpacity onPress={submitComment}>
        <FontAwesomeIcon icon={faPaperPlane} size={20} color={colours.primary} />
      </TouchableOpacity>
     }
   </View>
 );
}

export default CommentBoxComponent;