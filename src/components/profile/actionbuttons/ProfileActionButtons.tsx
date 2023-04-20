import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useTheme} from "../../../state/hooks";
import DropDownPicker from "react-native-dropdown-picker";
import {ArrowIcon} from "../../post/PrivacySelectComponent";
import {useState} from "react";
import {PostPrivacy} from "../../../state/song-suggestion.model";

const ProfileActionButtons = ({profile}) => {
  const isOwn = profile?.isOwn;
  const isFollowing = profile?.isFollowing;
  const {colours, fonts} = useTheme;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [followingOption, setFollowingOption] = useState();
  const followingOptions = [];

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginLeft: 16,
      marginRight: 16,
    },
    buttonCluster: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    editButton: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 10,
    },
    button: {
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.primary,
      borderRadius: 10,
    },
    followDropdown: {
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colours.grey,

    },
    buttonText: {

    },
    followingText: {

    },
    dropdown: {

    }
  });

  return (
    <View style={styles.container}>
      {isOwn ?
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>
            Edit Profile
          </Text>
        </TouchableOpacity> :
        <View style={styles.buttonCluster}>
        {isFollowing ?
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Follow
            </Text>
          </TouchableOpacity> :
          <TouchableOpacity style={styles.followDropdown}>
            <Text style={styles.buttonText}>
              Following
            </Text>
            <DropDownPicker
              style={styles.dropdown}
              textStyle={styles.buttonText}
              dropDownContainerStyle={styles.dropdown}
              ArrowDownIconComponent={ArrowIcon}
              showArrowIcon={true}
              value={followingOption}
              open={dropdownOpen}
              items={followingOptions}
              setOpen={setDropdownOpen}
              setValue={setFollowingOption}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </TouchableOpacity>}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Message
            </Text>
          </TouchableOpacity>
      </View>}
    </View>
  );
}

export default ProfileActionButtons;