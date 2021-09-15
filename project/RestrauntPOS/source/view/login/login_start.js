import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
} from 'react-native'
import { images } from '../../assets';

import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import color from '../../value/color/color';

import dimen from '../../value/dimen/dimen';
import Ripple from 'react-native-material-ripple';
import strings from '../../value/strings'
import integer from '../../value/dimen/integer';

export default class LoginStartView extends React.Component {
    constructor(props) {
        super(props);
    }
     
    componentDidMount() {
        console.log("LoginStartView mounted")
    }

    UNSAFE_componentWillUnmount() {
        console.log("LoginStartView unmounted")
    }

    render() {
        return (
            <View>
                <ImageBackground source={images.login_back} style={[styles.backgroundImg, {alignItems: 'center', justifyContent: 'center'}]}>
                    <FontAwesomeIcon name= 'bank' size={80} color={color.whiteText}/>
                    <Text style={styles.title}>
                        {strings.app_name}
                    </Text>
                    <Text style={styles.description}>
                        {strings.app_description}
                    </Text>
                </ImageBackground>
                <View style={styles.bottomButtonGroup}>
                    <Ripple rippleDuration={integer.ripple_duration} rippleColor={color.flatwhite} 
                    style= {[styles.signinbutton, {backgroundColor: color.orange}]}
                    onPress= {() => this._gotoSignin()} >
                        <Text style={styles.signinbuttontitle}>
                            {strings.signin}
                        </Text>
                    </Ripple>

                    <Ripple rippleDuration={integer.ripple_duration} rippleColor={color.flatwhite} 
                    style= {[styles.signinbutton, {backgroundColor: color.darkgray}]} 
                    onPress={this._gotoRegister}>
                        <Text style={styles.signinbuttontitle}>
                            {strings.register}
                        </Text>
                    </Ripple>
                </View>
            </View>
        )
    }

    _gotoSignin = () => {
        this.props.navigation.navigate("Signin");
    }

    _gotoRegister = () => {
        console.log("Register button cliked.")
        this.props.navigation.navigate("Register");
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        width: '100%',
        height: '100%'
    },

    title: {
        fontSize: 35,
        color: color.whiteText,
        fontWeight: 'bold',
        marginTop: 20,
    },

    description: {
        fontSize: 16,
        color: color.whiteText,
        fontWeight: '400',
        marginTop: 20,
        width: '80%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bottomButtonGroup: {
        position: 'absolute',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '8%',
        bottom: 0,
    },

    signinbutton: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    signinbuttontitle: {
        fontSize: dimen.signin_button_text_size,
        color: color.whiteText,
    }
})