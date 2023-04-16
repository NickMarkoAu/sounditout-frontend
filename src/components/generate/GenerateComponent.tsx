import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useAppSelector, useTheme} from "../../state/hooks";
import {selectCurrentUser, selectGenerate, selectPricingOptions} from "../../state/song-suggestion.selector";
import {PricingOptions, UserUploadedImage} from "../../state/song-suggestion.model";
import { GenerateState} from "../../state/song-suggestion.slice";
import GenerateSettingsComponent from "./GenerateSettingsComponent";
import ResultComponent from "./result/ResultComponent";
import {User} from "../user/user.model";
import AnimatedLoader from "react-native-animated-loader";

const GenerateComponent = ({navigation, imageUri}) => {
  const {colours, fonts} = useTheme;

  const pricingOptions: PricingOptions = useAppSelector(selectPricingOptions);
  const currentUser: User = useAppSelector(selectCurrentUser);
  const generateState: GenerateState = useAppSelector(selectGenerate);

  const totalFreeTokens = pricingOptions?.freeTokens;
  const availableFreeTokens = currentUser?.tokens?.freeTokens? currentUser.tokens.freeTokens : 0;
  const availableTokens = currentUser?.tokens?.tokens? currentUser.tokens.tokens : 0;
  const tokenCost = pricingOptions?.generateCost;

  const generating = generateState?.isLoading;
  const generateResult = generateState?.generateResult;
  const error = generateResult?.error;

  const styles = StyleSheet.create({
      container: {
        marginTop: 110,
        alignItems: "center"
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
        fontFamily: fonts.primary,
        color: colours.text_primary
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
      },
      loadingContainer: {
        height: "55%",
        marginTop: 16
      },
      loadingAnimation: {
        marginTop: 25,
        height: 30
      }
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageUri}}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          What does this moment sound like?
        </Text>
      </View>
      {
        generating &&
        <View style={styles.loadingContainer}>
          <AnimatedLoader
            visible={true}
            source={require("../../../assets/animation/loading.json")}
            animationStyle={styles.loadingAnimation}
            speed={1}
          />
        </View>
      }
      { (!generating && error === null && generateResult !== null) &&
          <ResultComponent navigation={navigation} generateResult={generateResult}/>
      }
      { (!generating && !generateResult) &&
        <GenerateSettingsComponent imageUri={imageUri} availableFreeTokens={availableFreeTokens} tokenCost={tokenCost} totalFreeTokens={totalFreeTokens} styles={styles}/>
          }
    </View>
  );
}
export default GenerateComponent;