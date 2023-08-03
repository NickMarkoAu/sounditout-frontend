import {UserUploadedImage} from "../state/song-suggestion.model";
import {User} from "../components/user/user.model";

export const shouldDisplayImage = (isAdultContent: boolean,  user: User) : boolean => {
    //calculate users age based on their date of birth
    const userAge = calculateAge(user.dateOfBirth);
    //if user is an adult, display the image
    return userAge >= 18;
}

const calculateAge = (dateOfBirth: Date) : number => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    return age;
}