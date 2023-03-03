import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Slider from "@react-native-community/slider";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCoins, faLock} from "@fortawesome/free-solid-svg-icons";

const CustomOptionsContainer = ({}) => {
  const styles = StyleSheet.create({
      customOptionsContainer: {
        backgroundColor: '#333333',
        width: 350, //TODO make this reactive
        height: 150,
        overflow: 'hidden',
        marginBottom: 8,
        borderRadius: 15,
        justifyContent: "center"
      },
      overlay: {
        backgroundColor: '#333333',
        position: "absolute",
        zIndex: 1,
        opacity: 0.75,
        width: 350, //TODO make this reactive
        height: 150,
        overflow: 'hidden',
        marginBottom: 8,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        display: 'flex',
        flexDirection: 'row'
      },
      button: {
        width: "30%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6BD60",
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 8,
        opacity: 1
      },
      slider: {
        marginBottom: 8
      },
      sliderLabel: {
        marginLeft: 12,
        color: 'white',
        fontSize: 10
      },
      iconStyle: {
      }
    }
  );

  const [energyValue, setEnergyValue] = useState(0);
  const [tempoValue, setTempoValue] = useState(0);
  const [warmthValue, setWarmthValue] = useState(0); //TODO store these values in global state

  const [isLocked, setLocked] = useState(true);

  const unlockCost = 1; //TODO make this data driven

  const unlock = () => {
    setLocked(false);
  }

  return (
    <View>
      {isLocked &&
        <View style={styles.overlay}>
          <FontAwesomeIcon icon={faLock} color="#CDCACA" size={22}/>
          <TouchableOpacity style={styles.button} onPress={unlock}>
              <Text>
                {unlockCost} Token
              </Text>
            <FontAwesomeIcon style={styles.iconStyle} icon={faCoins} size={15}/>
          </TouchableOpacity>
        </View>
      }
      <View style={styles.customOptionsContainer}>
        <Text style={styles.sliderLabel}>
          ENERGY
        </Text>
        <Slider
          style={styles.slider}
          disabled={isLocked}
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#F6BD60"
          thumbTintColor="#F6BD60"
          maximumTrackTintColor="#F6BD60"
          step={10}
          value={energyValue}
          onValueChange={(sliderValue) => setEnergyValue(sliderValue)}
        />
        <Text style={styles.sliderLabel}>
          WARMTH
        </Text>
        <Slider
          style={styles.slider}
          disabled={isLocked}
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#F6BD60"
          thumbTintColor="#F6BD60"
          maximumTrackTintColor="#F6BD60"
          step={10}
          value={warmthValue}
          onValueChange={(sliderValue) => setWarmthValue(sliderValue)}
        />
        <Text style={styles.sliderLabel}>
          TEMPO
        </Text>
        <Slider
          disabled={isLocked}
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#F6BD60"
          thumbTintColor="#F6BD60"
          maximumTrackTintColor="#F6BD60"
          step={10}
          value={tempoValue}
          onValueChange={(sliderValue) => setTempoValue(sliderValue)}
        />
      </View>
    </View>
  );
}

export default CustomOptionsContainer;