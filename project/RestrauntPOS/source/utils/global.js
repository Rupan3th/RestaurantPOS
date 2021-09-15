// import { AsyncStorage } from 'react-native';

var _token = undefined;
export function getToken() {
    // getData("MyToken");
    return _token;
}

export function setToken(token) {
    _token = token;
    storeData("MyToken", _token);
}

var _transcript = undefined;
export function getTranscript() {
    // getData("VioUp");
    return _transcript;
}

export function setTranscript(transcript) {    
    _transcript = transcript;
    storeData("VioUp", _transcript);
}

var _faceload = undefined;
export function getFaceLoad() {
    // getData("FaceLoad");
    return _faceload;
}

export function setFaceLoad(faceload) {    
    _faceload = faceload;
    storeData("FaceLoad", _faceload);
}


export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Saving data "%s" is Success.', key);
    } catch (error) {
        // console.log('Saving data "%s" is failed.', key);
    }
}

export async function getData(key) {
    try {
        if(key == "MyToken"){
            _token = await AsyncStorage.getItem(key);
        }
        else if(key == "VioUp"){
            _transcript = await AsyncStorage.getItem(key);
        }
        
        
    } catch (error) {
        console.log('Saving data "%s" is failed.', key);
    }
}