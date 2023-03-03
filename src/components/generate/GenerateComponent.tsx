import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCoins, faLock} from "@fortawesome/free-solid-svg-icons";
import CustomOptionsContainer from "./CustomOptionsContainer";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {selectCurrentUser, selectPricingOptions} from "../../state/song-suggestion.selector";
import {PricingOptions, User, UserUploadedImage} from "../../state/song-suggestion.model";
import {generateAction} from "../../state/song-suggestion.slice";

const GenerateComponent = ({navigation, image}) => {
  const pricingOptions: PricingOptions = useAppSelector(selectPricingOptions);
  const currentUser: User = useAppSelector(selectCurrentUser);
  const totalFreeTokens = pricingOptions?.freeTokens;
  const availableFreeTokens = currentUser?.tokens?.freeTokens? currentUser.tokens.freeTokens : 0;
  const availableTokens = currentUser?.tokens?.tokens? currentUser.tokens.tokens : 0;
  const tokenCost = pricingOptions?.generateCost;

  const dispatch = useAppDispatch();

  const styles = StyleSheet.create({
      container: {
        marginTop: 110
      },
      imageContainer: {
        backgroundColor: '#333333',
        width: 350, //TODO make this reactive
        height: 250,
        overflow: 'hidden',
        marginBottom: 8,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#5D2A42'
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12
      },
      text: {
        color: 'white'
      },
      buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
      },
      button: {
        width: "50%",
        height: 35,
        marginBottom: 22,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6BD60",
        borderRadius: 10,
      },
      iconButtonStyle: {
        display: 'flex',
        flexDirection: 'row'
      }
    }
  );

  const generate = () => {
    //TODO validate tokens and adjust balance or trigger in app payment
    dispatch(generateAction({image}));
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../../assets/samples/test-profile.png")}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          What does this moment sound like?
        </Text>
      </View>
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
export default GenerateComponent;