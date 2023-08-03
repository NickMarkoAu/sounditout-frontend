import React, {useState} from "react";
import {User} from "../user/user.model";
import {useAppSelector} from "../../state/hooks";
import {selectCurrentUser} from "../../state/song-suggestion.selector";
import {ImageBackground, PixelRatio, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import {BlurView} from "@react-native-community/blur";
import {UserUploadedImage} from "../../state/song-suggestion.model";
import {shouldDisplayImage} from "../../configurations/adult-content";

export const CoveredImage = ({ image } : {image: UserUploadedImage}) => {
    const [blur, setBlur] = useState(image?.adultContent);
    const user: User = useAppSelector(selectCurrentUser);

    if(shouldDisplayImage(image?.adultContent, user)) {
        //Don't display the image if the user is underage
        return null;
    }

    const styles = StyleSheet.create({
        image: {
            width: '100%',
            height: '100%',
        },
        button: {
            // your button styles...
        },
        buttonText: {
            // your button text styles...
        },
        absolute: {
            position: "absolute",
            top: 0, left: 0, bottom: 0, right: 0
        },
    });

    const handlePress = () => {
        setBlur(!blur);
    };

    const imageElement = (
        <Image
            source={{ uri: image?.presignedUrl }}
            style={styles.image}
            blurRadius={blur ? PixelRatio.get() * 10 : 0} // set a high blur radius when 'blur' is true
        />
    );

    if (blur) {
        return (
            <ImageBackground source={{ uri: image.presignedUrl }} style={styles.image}>
                <BlurView style={styles.absolute} blurType="light" blurAmount={10} reducedTransparencyFallbackColor="white"/>
                <Text>This image was hidden because it shows mature content</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>View Anyway</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    return imageElement;
};

