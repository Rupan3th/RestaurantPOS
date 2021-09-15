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
} from 'react-native'
import { images } from '../../assets'
import color from '../../value/color/color'
import Ripple from 'react-native-material-ripple'
import dimen from '../../value/dimen/dimen'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'

class BioFaceSubmissionView extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            captureImage : props.captureImage
        }
    }

    componentDidMount() {
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({captureImage: nextProps.captureImage})
    }

    render() {
        // console.log('captured image = ' + this.state.captureImage)
        let capturd = this.state.captureImage? this.state.captureImage.toString() : null
        return <ImageBackground source={images.login_back} style={styles.container}>
            <View style={styles.surfaceview}>
                <View style={styles.cameraContainer}>
                    <Image source = {{isStatic: true, uri: this.state.captureImage}} style={styles.captureImage}/>
                    <View style = {styles.maskview}>
                        <View style= {styles.facerect}>
                        </View>
                    </View>
                </View>

                <View style={styles.submitcheckview}>
                    <View style={styles.subimitcheck}>
                        <FontAwesome name="check-circle" size={50} color={color.flatwhite}/>
                    </View>
                </View>

                <View style={styles.description}>
                    <Text style={{fontSize: 20,}}>
                        Submission successful
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{width: '80%', fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
                        Almost complete. Follow the prompts to create your voice authentication profile
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Ripple rippleOpacity = {0.8} rippleSize = {dimen.ripple_size} rippleColor = {color.flatwhite}
                    style={styles.continue}
                    onPress = {this._onPressContinue}>
                        <Text style={styles.continueTitle}>
                            {strings.continue}
                        </Text>
                    </Ripple>
                </View>
            </View>
        </ImageBackground>
    }

    _onPressContinue = () => {
        this.props.onContinue && this.props.onContinue()
    }

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
        borderColor : color.green,
        flex: 1,
        marginTop: "15%",
        marginStart: "15%",
        marginEnd: "15%",
        marginBottom: "25%"
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

    captureImage : {
        width: '100%', 
        height: '100%', 
        resizeMode : 'contain', 
        borderRadius: 3
    },

    submitcheckview : {
        position: 'absolute',
        left: 0, 
        right: 0,
        top: '60%',
        alignItems: 'center'
    },
    subimitcheck: {
        width : 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: color.green,
        justifyContent: "center",
        alignItems: 'center'
    }
})

export default BioFaceSubmissionView