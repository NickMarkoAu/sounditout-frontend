import {StyleSheet, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCaretSquareDown} from "@fortawesome/free-solid-svg-icons";
import {selectCurrentPost} from "../../state/song-suggestion.selector";
import {Post} from "../../state/song-suggestion.model";
import {updatePost} from "../../state/song-suggestion.slice";

const {colours} = useTheme;

export const ArrowIcon = () => {
  return (
    <View>
      <FontAwesomeIcon icon={faCaretSquareDown} color={colours.primary} size={25}/>
    </View>
  );
}
const PrivacySelectComponent = () => {
  const [open, setOpen] = useState(false);
  //TODO set up default privacy in user and use selector here
  const defaultPrivacy = "Public";
  const [privacyValue, setPrivacyValue] = useState(defaultPrivacy);
  //TODO get these options from backend
  const privacyOptions = [{label: "Public", value:"Public", selected: true}, {label: "Friends", value:"Friends"}, {label: "Private", value:"Private"}];
  const post : Post = useAppSelector(selectCurrentPost);
  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
    dropdownContainer: {
      marginLeft: 16,
      marginRight: 16,
      width: "60%"
    },
    dropdown: {
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: colours.secondary,
      backgroundColor: colours.background,
    },
    dropdownText: {
      color: colours.text_primary
    },
    dropdownArrow: {
      color: colours.text_primary
    }
  });

  useEffect(() => {
    console.log("Changing privacy to", privacyValue);
    dispatch(updatePost({...post, postPrivacy: privacyValue}));
  }, [privacyValue]);

  return (
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropDownContainerStyle={styles.dropdown}
        ArrowDownIconComponent={ArrowIcon}
        showArrowIcon={true}
        open={open}
        value={privacyValue}
        items={privacyOptions}
        setOpen={setOpen}
        setValue={setPrivacyValue}
        zIndex={3000}
        zIndexInverse={1000}
      />
    </View>
  );
}

export default PrivacySelectComponent;