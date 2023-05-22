import {View, TouchableOpacity, StyleSheet} from "react-native";
import PostHeadlineComponent from "./PostHeadlineComponent";
import TagsContainer from "./tags/TagsContainer";
import AddTagsComponent from "./tags/AddTagsComponent";
import PrivacySelectComponent from "./PrivacySelectComponent";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useTheme} from "../../state/hooks";
import SongPreviewComponent from "../video/preview/SongPreviewComponent";
import {createPostAction} from "../../state/song-suggestion.slice";
import {StackNavigationProp} from "react-navigation-stack/lib/typescript/src/vendor/types";
import {Post} from "../../state/song-suggestion.model";

const CreatePostComponent = ({post, navigation}: { post: Post, navigation: StackNavigationProp }) => {
    const {colours} = useTheme;
    const dispatch = useAppDispatch();

    const styles = StyleSheet.create({
        container: {
            marginTop: 88,
        },
        preview: {
            paddingLeft: 16
        },
        submit: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        submitButton: {
            paddingRight: 16,
        }

    })

    const submitPost = () => {
        dispatch(createPostAction({post}));
        navigation.navigate("Feed");
    }
    const previewSong = () => {

    }

    return (
        post && <View style={styles.container}>
            <PostHeadlineComponent image={post.image}/>
            <View style={styles.preview}>
                <SongPreviewComponent onPress={previewSong} song={post?.song}/>
            </View>
            <TagsContainer post={post}/>
            <AddTagsComponent post={post}/>
            <View style={styles.submit}>
                <PrivacySelectComponent/>
                <TouchableOpacity style={styles.submitButton} onPress={submitPost}>
                    <FontAwesomeIcon icon={faCheckSquare} size={35} color={colours.primary}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CreatePostComponent;