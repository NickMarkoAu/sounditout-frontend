import {View} from "react-native";
import ProfileSongPost from "./ProfileSongPost";

const ProfileSongPosts = ({posts}) => {
  return (
    <View>
      {posts.map((post, key) => {
        return (
          <ProfileSongPost post={post} key={key}/>
        );
      })}
    </View>
  );
}

export default ProfileSongPosts;