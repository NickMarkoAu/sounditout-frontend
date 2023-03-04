import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser, selectGenerate, selectPricingOptions} from "../../state/song-suggestion.selector";
import {PricingOptions, User, UserUploadedImage} from "../../state/song-suggestion.model";
import {generateAction, GenerateState} from "../../state/song-suggestion.slice";
import GenerateSettingsComponent from "./GenerateSettingsComponent";
import ResultComponent from "./result/ResultComponent";

const GenerateComponent = ({navigation, image}) => {
  const {colours} = useTheme;

  const pricingOptions: PricingOptions = useAppSelector(selectPricingOptions);
  const currentUser: User = useAppSelector(selectCurrentUser);
  const generateState: GenerateState = useAppSelector(selectGenerate);

  const totalFreeTokens = pricingOptions?.freeTokens;
  const availableFreeTokens = currentUser?.tokens?.freeTokens? currentUser.tokens.freeTokens : 0;
  const availableTokens = currentUser?.tokens?.tokens? currentUser.tokens.tokens : 0;
  const tokenCost = pricingOptions?.generateCost;

  const generating = generateState?.isLoading;
  const generateResult = generateState?.generateResult;

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
        borderColor: colours.secondary
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
        backgroundColor: colours.primary,
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
      { (generating || generateResult) &&
        <ResultComponent navigation={navigation} generating={generating} generateResult={generateResult}/>
      }
      { (!generating && !generateResult) &&
        <GenerateSettingsComponent availableFreeTokens={availableFreeTokens} tokenCost={tokenCost} totalFreeTokens={totalFreeTokens} styles={styles}/>
      }
    </View>
  );
}
export default GenerateComponent;