import {Text, TouchableOpacity, View} from "react-native";
import CustomOptionsContainer from "./CustomOptionsContainer";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCompactDisc} from "@fortawesome/free-solid-svg-icons";
import {generateAction} from "../../state/song-suggestion.slice";
import {useAppDispatch} from "../../state/hooks";

const GenerateSettingsComponent = ({availableFreeTokens, totalFreeTokens, tokenCost, styles, imageUri}) => {
  const dispatch = useAppDispatch();

  const generate = () => {
    //TODO validate tokens and adjust balance or trigger in app payment
    dispatch(generateAction({imageUri}));
  }

  return (
    <View>
      <View>
        <CustomOptionsContainer/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={generate}>
          {availableFreeTokens > 0 ?
            <Text>
              Generate ({availableFreeTokens}/{totalFreeTokens} Free)
            </Text> :
            <View style={styles.iconButtonStyle}><Text>
              Generate {tokenCost}
            </Text><FontAwesomeIcon icon={faCompactDisc} size={15}/></View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GenerateSettingsComponent;