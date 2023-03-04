import {View, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHeart, faComment, faShareAlt, faBookmark} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "../../../state/hooks";

const ActionButtonsComponent = () => {
  const {colours} = useTheme;

  const styles = StyleSheet.create({
    actionButtonsContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 8
    }, actionButton: {
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    }, actionButtonIcon: {
      color: colours.primary
    },
    buttonCluster: {
      flexDirection: "row",
      width: "30%"
    },
    saveButton: {
      width: "70%",
      alignItems: "flex-end"
    }
  });

  return (
    <View style={styles.actionButtonsContainer}>
      <View style={styles.buttonCluster}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={faHeart}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={faComment}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={faShareAlt}/>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButton}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon size={20} style={styles.actionButtonIcon} icon={faBookmark}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActionButtonsComponent;