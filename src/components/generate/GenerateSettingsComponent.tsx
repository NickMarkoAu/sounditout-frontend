import {Text, TouchableOpacity, View} from "react-native";
import CustomOptionsContainer from "./CustomOptionsContainer";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";

const GenerateSettingsComponent = ({availableFreeTokens, totalFreeTokens, tokenCost, styles}) => {
  return (
    <View>
      <View>
        <CustomOptionsContainer/>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          {availableFreeTokens > 0 ?
            <Text>
              Generate ({availableFreeTokens}/{totalFreeTokens} Free)
            </Text> :
            <View style={styles.iconButtonStyle}><Text>
              Generate {tokenCost}
            </Text><FontAwesomeIcon icon={faCoins} size={15}/></View>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GenerateSettingsComponent;