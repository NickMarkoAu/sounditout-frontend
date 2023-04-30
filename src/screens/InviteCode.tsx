import {View, StyleSheet} from "react-native";
import InviteCodeComponent from "../components/signup/InviteCodeComponent";
import {useTheme} from "../state/hooks";

const InviteCode = ({navigation}) => {
  const {colours} = useTheme;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: undefined,
      backgroundColor: colours.background,
    },
  })
  return (
    <View style={styles.container}>
      <InviteCodeComponent navigation={navigation}/>
    </View>
  );
}

export default InviteCode;