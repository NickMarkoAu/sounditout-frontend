import {Post} from "../../../state/song-suggestion.model";
import {useTheme} from "../../../state/hooks";
import {StyleSheet, View} from "react-native";
import CommentComponent from "./CommentComponent";

const CommentsComponent = ({post}: { post: Post }) => {
  const {comments} = post;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 16
    },
    commentContainer: {
      width: "100%",
      padding: 2,
      marginBottom: 8
    }
  });

  return (
    comments.length > 0 &&
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        {comments.map((comment, key) => {
          return (
            <CommentComponent key={key} comment={comment}/>
          );
        })}
      </View>
    </View>
  );
};

export default CommentsComponent;