import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native'

import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import color from '../../value/color/color';

import dimen from '../../value/dimen/dimen';
import Ripple from 'react-native-material-ripple';
import strings from '../../value/strings'
import integer from '../../value/dimen/integer';
import { images } from '../../assets';

class BioauthStartView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        
    }

    render() {
        return <ImageBackground source={images.login_back} style={styles.container}>
            <View style={styles.surfaceview}>
                <View style={styles.cameraContainer}>
                    <Image source = {images.selca_image} style={{width: '100%', height: '100%', resizeMode : 'stretch'}}/>
                </View>
                <View style={styles.description}>
                    <Text style={{fontSize: 25}}>
                        Set up Bio
                    </Text>
                    <Text style={{fontSize: 25, color: 'green'}}>
                        Pass
                    </Text>

                    <Text style={{fontSize: 12}}>
                        TM
                    </Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{width: '80%', fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
                        Any time you use this application, you will use your face and voice for verification
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
})

export default BioauthStartView