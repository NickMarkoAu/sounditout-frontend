import {StyleSheet, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector, useTheme} from "../../../state/hooks";
import {selectCurrentProfile} from "../../../state/song-suggestion.selector";
import HeadlineSongs from "./HeadlineSongs";
import {UserProfile} from "../../../state/song-suggestion.model";

const SelectHeadlineSongComponent = ({navigation}) => {
  const {colours} = useTheme;
  const profile: UserProfile = useAppSelector(selectCurrentProfile);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 110,
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      zIndex: 1
    },
    backButtonContainer: {
      marginLeft: 8
    },
    backButton: {}
  });

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color={colours.primary}/>
        </TouchableOpacity>
      </View>
        <HeadlineSongs profile={profile} navigation={navigation}/>
    </View>
  )
}

export default SelectHeadlineSongComponent;