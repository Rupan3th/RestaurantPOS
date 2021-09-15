import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    View,
    Alert,
    ImageBackground,
    TouchableOpacity,
    Platform,
    Modal
} from 'react-native'

import color from '../../value/color/color';

import dimen from '../../value/dimen/dimen';
import Ripple from 'react-native-material-ripple';
import strings from '../../value/strings'
import integer from '../../value/dimen/integer';
import { images } from '../../assets';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import AudioRecordView from '../../components/AudioRecordView';

import { mean, max } from 'd3-array';
import Utils from '../../utils';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { ActivityIndicator } from "react-native";

import * as AuthenticationModel from '../../model/authentication'
import { getTranscript, setTranscript } from '../../utils/global'
import API from '../../value/restapi'


class BioVoiceRecordView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRecording : false,
            audioFile : '',
            samples : [],
            hasPermission : undefined,
            stopped : undefined,
            isLoading: true,
            modalVisible: false
        }

        this.counter = 0
        this.binaryData = ''       

        this.res_status=""
        this.task_id=""
        this.task_url=""
    }

    async componentDidMount() {
        this.maxSampleCount = (Utils.dimensionsWidth * 0.84) / 4
        
        await this.checkPermission();

        const options = {
            sampleRate: 16000,  // default 44100
            channels: 1,        // 1 or 2, default 1
            bitsPerSample: 16,  // 8 or 16, default 16
            audioSource: 6,     // android only (see below)
            wavFile: 'test.wav' // default 'audio.wav'
        };

        AudioRecord.init(options);

        AudioRecord.on('data', data => {
            const chunk = Buffer.from(data, 'base64');
            this.binaryData += data

            var ncount = chunk.byteLength
            ncount = ncount / 2
            let shortArray = []
            var i
            for (i = 0; i < ncount; i++) {
                shortArray.push(chunk.readInt16LE(i * 2))
            }
            let samples = this.state.samples
            if (samples.length > this.maxSampleCount) {
                samples.shift()
            }
            let maxAmplitude = Math.max(...shortArray)
            samples.push(maxAmplitude / 32768.0)
            this.state.isRecording && this.setState({samples})
        });
    }

    render() {
        return <ImageBackground source={images.login_back} style={styles.container}>
            <View style={styles.surfaceview}>
                {this._renderRecordingView()}
                {this._renderDescriptionView()}
                {this._renderRecordingButton()}  
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


    _renderRecordingView() {
        let recordVisualWidth = Utils.dimensionsWidth * 0.84
        let recordVisualHeight = Utils.dimensionsHeight * 0.2

        if (this.state.isRecording || this.state.stopped) {
            return <View style={styles.cameraContainer}>
                <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
                    <Text style={[styles.chirsmichaels,
                        { height : '10%', marginTop: '10%', color: this.state.stopped? color.green : color.black,
                            textShadowColor : this.state.stopped? color.shadow65 : color.shadow85,}
                        ]}>
                        My name is Chris Michaels
                    </Text>

                    <View style={{flexDirection: 'row', marginTop: "6%"}}>
                        <Text style = {[styles.chirsmichaels, 
                            { marginTop: '6%', color: this.state.stopped? color.green : color.black, 
                            textShadowColor : this.state.stopped? color.shadow65 : color.shadow85,}
                            ]}>
                            I use my face and voice for authentication instead of password
                        </Text>
                    </View>
                    <Text style = {[styles.chirsmichaels, 
                        { marginTop: '6%', color: this.state.stopped? color.green : color.black,
                        textShadowColor : this.state.stopped? color.shadow65 : color.shadow85,}
                        ]}>
                        I don't need to remember or type a password for authentication
                    </Text>
                    <AudioRecordView
                        samples = {this.state.samples}
                        width = {recordVisualWidth}
                        height = {recordVisualHeight}
                        chartBackgroundColor = {this.state.stopped? color.flatGreen : color.flatBlack}
                        separatorColor = {this.state.stopped? color.green : color.black}
                        style= {{width : recordVisualWidth, height : recordVisualHeight, }}
                    />
                </View>
                {this.state.stopped?
                    <View style={styles.submitcheckview}>
                        <View style={styles.subimitcheck}>
                            <FontAwesome name="check-circle" size={50} color={color.flatwhite}/>
                        </View>
                    </View>
                    :
                    null
                }
                
            </View>
        } else {
            return <View style={styles.cameraContainer}>
                <Image source = {images.record_image} style={{width: '100%', height: '100%', resizeMode : 'stretch'}}/>
            </View>
        }
        
    }

    _renderDescriptionView() {

        if (this.state.isRecording) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '5 %'}}>
                    <Text style={{width: '80%', fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
                        Read the text above. Tap STOP when you are done recording
                    </Text>
                </View>
            )
        } else if (this.state.stopped) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{width: '80%', fontSize: 25, fontWeight: '200', textAlign: 'center', marginTop: '5%'}}>
                        Submission successful
                    </Text>

                    <Text style={{width: '80%', fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
                        Enrollment in BioPass is complete. Your face and voice will now be your password
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{width: '80%', fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
                        Tap to start recording. Clearly read the text in the window above. Ensure you are in an area with no background noise
                    </Text>
                </View>
            )
        }
                            
    }

    _renderRecordingButton() {
        if (this.state.isRecording) {
            return <View style={{alignItems: 'center', marginTop: '6%',}}>
                <TouchableOpacity onPress = {this._onPressRecord}>
                    <ImageBackground source = {images.circle_button_back} style={{width: 90, height : 90, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: color.whiteText}}>
                            STOP
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        } else if (this.state.stopped) {
            return <View style={{alignItems: 'center', marginTop: '6%'}}>
                <Ripple rippleOpacity = {0.8} rippleSize = {dimen.ripple_size} rippleColor = {color.flatwhite}
                style={styles.continue}
                onPress = {this._onPressContinue}>
                    <Text style={styles.continueTitle}>
                        {strings.continue}
                    </Text>
                </Ripple>
            </View>
        } else {
            return <View style={{alignItems: 'center', marginTop: '6%'}}>
                <TouchableOpacity onPress = {this._onPressRecord}>
                    <ImageBackground source = {images.circle_button_back} style={{width: 90, height : 90, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome5 name="microphone-alt" size={40} color={color.whiteText}/>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        }
    }

    async _stop() {
        var self = this
        if (!this.state.isRecording) return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        console.log('audioFile', audioFile);

        self.setState({ modalVisible: true });

        if(getTranscript() == undefined)
        {
            AuthenticationModel.voice_authenentication({        
                name: 'test.wav',
                path : audioFile
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                var score = JSON.stringify(response['score']);     
                Alert.alert("Score :", score);    

                setTranscript("transcription");     
                
                self.setState({ modalVisible: false });
            })
            .catch((error) => {
                console.log(JSON.stringify(error))

                self.setState({ modalVisible: false });
            })

            this.setState({ audioFile, isRecording: false, stopped: true });  
        }
        else{
            // AuthenticationModel.voice_authenentication({
            AuthenticationModel.convert_audio({
                name: 'test.wav',
                path : audioFile
            })
            .then((response) => response.json())
            .then((response) => {
                self.res_status = response[0]['status'];
                    console.log("status: ", self.res_status);
                self.task_id = response[0]['task_id'];
                    console.log("task_id: ", self.task_id);
                self.task_url = response[0]['task_url'];
                    console.log("task_url: ", self.task_url);

                var run_transcribe = setInterval(function() {
                    AuthenticationModel.transcript(API.convert_audio + "/" + self.task_id)
                    .then((response) => response.json())
                    .then((response) => {
                        if((response['status'] == "SUCCESS") || (response['status'] == "FAILURE")){
                            console.log(JSON.stringify(response));
                            console.log("Transcripts Content: " + response['task_result']['transcripts'][0]['content']);    
                            self.setState({ modalVisible: false });
                            Alert.alert("Contents :", response['task_result']['transcripts'][0]['content']);
                            clearInterval(run_transcribe);
                        }

                        // this.setState({ modalVisible: false });
                    })
                    .catch((error) => {
                        console.log(JSON.stringify(error));
                        self.setState({ modalVisible: false });
                    })
                }, 10000);

                // setTimeout(function() {
                //     AuthenticationModel.transcript(API.convert_audio + "/" + self.task_id)
                //     .then((response) => response.json())
                //     .then((response) => {
                //         console.log(JSON.stringify(response));
                //         console.log(response['task_result']['transcripts'][0]['content']);
                //     })
                //     .catch((error) => {
                //         console.log(JSON.stringify(error))
                //     })
                //   }, 20000);                 
                
                //   this.setState({ audioFile, isRecording: false, stopped: true });
                })
            .catch((error) => {
                console.log(JSON.stringify(error))
                this.setState({ modalVisible: false });
            })
        }        

        this.setState({ audioFile, isRecording: false, stopped: true });
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        console.log(`Finished recording at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    _record(){
        if (this.state.isRecording) {
            console.log('Already recording!')
            return
        }

        console.log('start record');
        this.setState({ audioFile: '', isRecording: true});
        AudioRecord.start();
    }

    _onPressContinue = () => {
        this.props.onContinue && this.props.onContinue()
    }

    _onPressRecord = () => {
        let isRecording = !this.state.isRecording
        this.setState({isRecording})
        if (isRecording) {
            this._record()
        } else {
            this._stop()
        }
    }

    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
          SampleRate: 16000,
          Channels: 1,
          AudioQuality: "Low",
          AudioEncoding: "aac",
          AudioEncodingBitRate: 32000
        });
    }

    checkPermission = async () => {
        const p = await Permissions.check('microphone');
        console.log('permission check', p);
        if (p === 'authorized') return;
        return this.requestPermission();
    };
    
    requestPermission = async () => {
        const p = await Permissions.request('microphone');
        console.log('permission request', p);
    };
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '100%',
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
        marginTop: '10%',
        justifyContent: 'center',
        flexDirection: 'row',
    }, 
    continue : {
        backgroundColor: color.orange,
        width: '60%',
        height: dimen.login_input_height,
        borderRadius: dimen.login_input_height / 2,
        marginTop: "7%",
        justifyContent: "center",
        alignItems: 'center'
    },

    continueTitle : {
        fontSize: 16,
        color: color.whiteText,
        fontWeight: 'bold',
        textAlignVertical : 'center'
    },

    chirsmichaels : {
        textAlign: 'center', 
        fontSize: 22, 
        fontWeight: '400', 
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    },

    submitcheckview : {
        position: 'absolute',
        left: 0, 
        right: 0,
        bottom: -20,
        alignItems: 'center'
    },

    subimitcheck: {
        width : 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: color.green,
        justifyContent: "center",
        alignItems: 'center'
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

export default BioVoiceRecordView