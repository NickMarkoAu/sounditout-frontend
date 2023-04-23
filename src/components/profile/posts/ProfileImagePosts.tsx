import {View, StyleSheet} from "react-native";
import ProfileImagePost from "./ProfileImagePost";

const ProfileImagePosts = ({posts = []}) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingLeft: 8,
      paddingRight: 8,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 2,
    }
  })
  return (
    <View style={styles.container}>
      {posts.map((post, key) => {
        return (
          <ProfileImagePost post={post} key={key}/>
        );
      })}
    </View>
  );
}

export default ProfileImagePosts;