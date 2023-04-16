import {UserComment} from "../../../state/song-suggestion.model";
import {StyleSheet, View, Text} from "react-native";
import ProfileId from "../../user/profile/ProfileId";
import {useTheme} from "../../../state/hooks";

const CommentComponent = ({comment}: { comment: UserComment }) => {
  const {colours, fonts} = useTheme;

  const styles = StyleSheet.create({
    commentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentText: {
      color: colours.text_primary,
      marginLeft: 12
    }
  });
  return (
      <View style={styles.commentContainer}>
        <ProfileId user={comment.user} />
        <Text style={styles.commentText}>
          {comment.content}
        </Text>
      </View>
  );
};

export default CommentComponent;