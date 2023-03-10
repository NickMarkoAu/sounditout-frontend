import React, {useState, useCallback, useRef} from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCirclePlay, faCirclePause, faFastForward, faFastBackward} from "@fortawesome/free-solid-svg-icons";
import PreviewComponent from "./PreviewComponent";
import {useTheme} from "../../state/hooks";

const PlayerComponent = ({navigation, song}) => {
  const {colours} = useTheme;

  const [playing, setPlaying] = useState(false);
  const playerRef = useRef();

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#333333',
      width: 300,
      height: 300,
      borderRadius: 150,
      overflow: 'hidden',
      marginBottom: 8,
      alignSelf: 'center'
    },
    hole: {
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'transparent',
      alignSelf: 'center'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      transform: [{rotate: '-15deg'}],
    },
    buttons: {
      width: "100%",
      flexDirection: "row",
      justifyContent: 'space-evenly',
      alignItems: 'center', //Centered vertically
    },
    albumCover: {
      width: "100%",
      justifyContent: 'center',
    },
    previewContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 30
    }
  });

  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/samples/test-profile.png")} //TODO get this from state
        />
      </View>
      <View style={styles.previewContainer}>
        <PreviewComponent song={song}/>
      </View>
      <View style={{height: 0}}>
        <View>
          {/*TODO replace this with whatever player since we are no longer using Youtube*/}
          {/*<YoutubePlayer*/}
          {/*  ref={playerRef}*/}
          {/*  height={1}*/}
          {/*  play={playing}*/}
          {/*  videoId={videoKey}*/}
          {/*  onChangeState={onStateChange}*/}
          {/*/>*/}
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={togglePlaying}>
          <FontAwesomeIcon icon={faFastBackward} color={colours.primary} size={60}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlaying}>
          <FontAwesomeIcon icon={playing ? faCirclePause : faCirclePlay} color={colours.primary} size={100}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlaying}>
          <FontAwesomeIcon icon={faFastForward} color={colours.primary} size={60}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PlayerComponent;