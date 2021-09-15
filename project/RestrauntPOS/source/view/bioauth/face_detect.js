import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    PermissionsAndroid,
    Platform,
    Modal
} from 'react-native'
import { images } from '../../assets'
import color from '../../value/color/color'
import Ripple from 'react-native-material-ripple'
import dimen from '../../value/dimen/dimen'
import { RNCamera } from 'react-native-camera'
import ImageEditor from "@react-native-community/image-editor";
import CameraRoll from "@react-native-community/cameraroll";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import * as AuthenticationModel from '../../model/authentication'
import { ActivityIndicator } from "react-native";

class BioFaceDetectionView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {            
            isLoading: true,
            modalVisible: false
        }  
    }

    componentDidMount() {
        
    }

    render() {
        

        return <ImageBackground source={images.login_back} style={styles.container}>
            <View style={styles.surfaceview}>
                <View style={styles.cameraContainer}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{width: '100%', height: '100%'}}
                        type="front"
                        //cameraId= 'front'
                        useCamera2Api={true}
                        // onAudioInterrupted={this.onAudioInterrupted}
                        // onAudioConnected={this.onAudioConnected}
                        onPictureTaken={this.onPictureTaken}
                        // onRecordingStart={this.onRecordingStart}
                        // onRecordingEnd={this.onRecordingEnd}
                        //ratio={"16:9"}
                        // flashMode={flashMode}
                        // zoom={zoom}
                        // maxZoom={MAX_ZOOM}
                        // useNativeZoom={true}
                        // onTap={this.onTapToFocus}
                        // whiteBalance={whiteBalance}
                        // autoFocusPointOfInterest={this.state.focusCoords}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        // androidRecordAudioPermissionOptions={{
                        //     title: 'Permission to use audio recording',
                        //     message: 'We need your permission to use your audio',
                        //     buttonPositive: 'Ok',
                        //     buttonNegative: 'Cancel',
                        // }}
                        // onStatusChange={this.onCameraStatusChange}
                        // onCameraReady={this.onCameraReady}
                        // onMountError={this.onCameraMountError}
                        // pendingAuthorizationView={
                        //     <SafeAreaView style={styles.cameraLoading}>
                        //     <Spinner color={style.brandLight}/>
                        //     </SafeAreaView>
                        // }
                        // notAuthorizedView={
                        //     <View>
                        //     {cameraNotAuthorized}
                        //     </View>
                        // }
                        >
                    </RNCamera>
                    <View style = {styles.maskview}>
                        <View style= {styles.facerect}>

                        </View>
                    </View>
                </View>

                <View style={styles.description}>
                    <Text style={{fontSize: 20,}}>
                        Center your face in the box
                    </Text>
                </View>
                
                <View style={{alignItems: 'center', marginTop: '6%',}}>
                    <TouchableOpacity onPress = {this._onPressCamera}>
                        <ImageBackground source = {images.circle_button_back} style={{width: 90, height : 90, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center'}}>
                            <Entypo name="camera" size={40} color={color.whiteText}/>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                </View>              

            </View>           

            <Modal
                    visible={this.state.modalVisible}                  
                    transparent={true}       
                    style={{ zIndex: 1100 }}
                    onRequestClose={() => { }}>
                    <View style={styles.modalBackground}>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
                        {this.state.isLoading && <ActivityIndicator color={"#fff"} />}
                    </View>
                    </View>
                </Modal>        

        </ImageBackground>
        
    }

    _onPressCamera = () => {
        this.takePicture()
    }

    onPictureTaken = () => {

    }

    takePicture = async () => {
        if (this.camera) {

            // if(this.state.takingPic || this.state.recording || !this.state.cameraReady){
            //     return;
            // }
            // if we have a non original quality, skip processing and compression.
            // we will use JPEG compression on resize.
            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
                writeExif: true
            };

            //this.setState({takingPic: true});

            let data = null;

            try{
                data = await this.camera.takePictureAsync(options);

                this.props.onCapture && this.props.onCapture(data.uri)

                //cropping
                let width = data.width
                let height = data.height
                let displayHeight = 800
                let displayWidth = displayHeight * width / height
                let cropData = {
                    offset: {x : width * 0.15, y : height * 0.15},
                    size: {width : width * 0.75, height: height * 0.65},
                    displaySize: {width : displayWidth, height: displayHeight},
                    resizeMode: "contain"
                }

                ImageEditor.cropImage(data.uri, cropData).then(url => {
                    console.log("Cropped image uri", url);
                    
                    //for check
                    savePicture(url)

                    this.setState({ modalVisible: true });

                    AuthenticationModel.face_authentication({
                        name: 'test.jpg',
                        path : url
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                        var score = response['score'];                        
                        console.log(score);                       

                        if(score != undefined){
                            Alert.alert("Score ", score);
                        }
                        else{
                            Alert.alert("Registered files successfully loaded.");
                        }

                        this.setState({ modalVisible: false });
                        this.props.onContinue && this.props.onContinue()
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error))
                        this.setState({ modalVisible: false });
                        Alert.alert("Network error");
                    })
            
                    // this.props.onContinue && this.props.onContinue()
                })
            }
            catch(err){
                Alert.alert("Error", "Failed to take picture: " + (err.message || err));
                return;
            }

            //Alert.alert("Picture Taken!", JSON.stringify(data, null, 2));
        }
    }
}

async function savePicture(tag) {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
  
    CameraRoll.save(tag).then(function(result) {
        console.log('save succeeded ' + result);
    })
};

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    surfaceview : {
        width: '100%',
        height: '100%',
        backgroundColor: color.transparentDD,
        paddingTop: '12%',
    },

    cameraContainer: {
        height: '60%',
        paddingHorizontal: '8%',
        alignItems: 'center',
    },

    description : {
        marginTop: '7%',
        justifyContent: 'center',
        flexDirection: 'row',
    }, 
    maskview : {
        backgroundColor : color.transparent,
        width : '100%',
        position: 'absolute',
        top: 0,
        bottom : 0,
    },

    facerect : {
        backgroundColor : color.transparent,
        borderWidth : 2,
        borderColor : color.orange,
        flex: 1,
        marginTop: "15%",
        marginStart: "15%",
        marginEnd: "15%",
        marginBottom: "25%"
    },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
      },
})

export default BioFaceDetectionView