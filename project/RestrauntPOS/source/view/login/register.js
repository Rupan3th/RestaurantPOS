import React from 'react'
import {
    View, 
    StyleSheet, 
    ImageBackground,
    TouchableOpacity,
    Text,
    Image,
    KeyboardAvoidingView,
    Alert,
    Modal,
    Keyboard,
} from 'react-native'

import AppbarNavigation from '../../components/appbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../assets'
import Ripple from 'react-native-material-ripple'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import integer from '../../value/dimen/integer'
import dimen from '../../value/dimen/dimen'
import color from '../../value/color/color'
import { LoginTextInput } from '../../components/input'
import { LoginPasswordInput } from '../../components/input'
import strings from '../../value/strings'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { DismissKeyboard } from '../../components/dissmiss_keyboard'
import API from '../../value/restapi'
import { ActivityIndicator } from "react-native";

const axios = require('axios').default;

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            isAgreedTerms : false,
            isLoading: true,
            modalVisible: false
        }
        this.firstName = ""
        this.lastName = ""
        this.fullName = ""
        this.email = ""
        this.password = ""
        this.user_type = ""

        this.res_message=""
        this.res_status=""
    }

    componentDidMount() {

    }

    UNSAFE_componentWillMount() {

    }

    render() {
        let userIcon = <Ionicons name="person-circle" size={20} color={color.whiteText}/>
        let emailIcon = <Ionicons name="mail" size={20} color = {color.whiteText} />
        let passwordIcon = <MaterialIcons name="lock" size={20} color = {color.whiteText}/>
        return (
            <DismissKeyboard>
            <ImageBackground source={images.login_back} style={styles.container}>
                <ScrollView scrollEnabled={false} 
                keyboardShouldPersistTaps = "handled"
                keyboardDismissMode = "interactive"
                style={{width: '100%', height: '100%'}}>
                <View style = {[styles.content, {marginTop: '12%'}]}>
                    <FontAwesome name= 'bank' size={80} color={color.whiteText}/>
                    <Text style={styles.title}>
                        {strings.app_name}
                    </Text>
                    <LoginTextInput 
                        ref = {(i) => this.firstnameInput = i}
                        leftIcon = {userIcon}
                        returnKeyType = "next"
                        placeholder = {strings.first_name}
                        placeholderTextColor = {color.flatwhite}
                        containerStyle = {{marginTop: 30, borderColor: color.flatwhite,}}
                        onChangeText = {this._onChangeFirstNameText}
                        onSubmitEditing = {this._onSubmitFirstNameEditing}
                    />

                    <LoginTextInput 
                        ref = {(i) => this.lastnameInput = i}
                        leftIcon = {userIcon}
                        returnKeyType = "next"
                        placeholder = {strings.last_name}
                        placeholderTextColor = {color.flatwhite}
                        containerStyle = {{marginTop: 30, borderColor: color.flatwhite,}}
                        onChangeText = {this._onChangeLastNameText}
                        onSubmitEditing = {this._onSubmitLastNameEditing}
                    />

                    <LoginTextInput 
                        ref = {(i) => this.emailInput = i}
                        leftIcon = {emailIcon}
                        returnKeyType = "next"
                        placeholder = {strings.email}
                        placeholderTextColor = {color.flatwhite}
                        containerStyle = {{marginTop: 30, borderColor: color.flatwhite}}
                        onChangeText = {this._onChangeEmailText}
                        onSubmitEditing = {this._onSubmitEmailEditing}
                    />

                    <LoginPasswordInput 
                        ref = {(i) => this.passwordInput = i}
                        leftIcon = {passwordIcon}
                        returnKeyType = "done"
                        placeholder = {strings.one_time_password}
                        placeholderTextColor = {color.flatwhite}
                        containerStyle = {{marginTop: 30, borderColor: color.flatwhite}}
                        onChangeText = {this._onChangePasswordText}
                        onSubmitEditing = {this._onSubmitPasswordEditing}
                    />

                    <View style={styles.terms}>
                        <TouchableOpacity onPress = {this._onPressTerms} style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                            {this.state.isAgreedTerms?
                                <FontAwesome name = 'check-circle' size={25} color={color.orange}/>
                                :
                                <FontAwesome name = 'check-circle-o' size={25} color={color.whiteText}/>
                            }
                        </TouchableOpacity>
                        
                        <Text style={{marginLeft: 5, color: color.whiteText, fontSize: 15}}>
                            {strings.i_agree_to_the}
                        </Text>
                        <TouchableOpacity onPress={this._onPressTermsAndConditions}>
                            <Text style={{marginLeft: 5, color: color.orange, fontSize: 15}}>
                                {strings.terms_conditions}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Ripple rippleOpacity = {0.8} rippleSize = {dimen.ripple_size} rippleColor = {color.flatwhite}
                    style={styles.register}
                    onPress = {this._onPressRegister}>
                        <Text style={styles.registerTitle}>
                            {strings.register}
                        </Text>
                    </Ripple>

                    <View style={styles.alreadySignin}>
                        <Text style={{color: color.whiteText, fontSize: 16, height: '100%', textAlignVertical: 'center'}}>
                            {strings.already_have_account}
                        </Text>
                        <TouchableOpacity onPress={this._onPressSignin} style={{height: '100%', justifyContent: 'center'}}>
                            <Text style ={{marginLeft: 10, color: color.orange, fontSize: 16}}>
                                {strings.signin2}
                            </Text>
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

                </ScrollView>
                <TouchableOpacity 
                onPress={this._back}
                style={styles.backbutton}>
                    <Ionicons name='md-chevron-back' size={20} color={color.whiteText}/>
                </TouchableOpacity>

            </ImageBackground>
            </DismissKeyboard>
        )
    }

    _back = () => {
        this.props.navigation.goBack()
    }

    _onChangeFirstNameText = (text) => {
        this.firstName = text
    }

    _onChangeLastNameText = (text) => {
        this.lastName = text
    }

    _onChangeEmailText = (text) => {
        this.email = text
    }

    _onChangePasswordText = (text) => {
        this.password = text
    }

    _onSubmitFirstNameEditing = () => {
        this.lastnameInput.onFocus()
    }

    _onSubmitLastNameEditing = () => {
        this.emailInput.onFocus()
    }

    _onSubmitEmailEditing = () => {
        this.passwordInput.onFocus()
    }

    _onSubmitPasswordEditing = () => {
    }

    _onPressRegister = () => {
        if (this.firstName === "" || this.lastName === "" ||this.email === "" || this.password === "") {
            Alert.alert(
                'You have to fill the empty fields.'
            )
        } else if (!this.state.isAgreedTerms){
            Alert.alert(
                'You have to agree the terms and conditions.'
            )
        } else {
            // this.props.navigation.navigate("Bioauth")
            self = this

            self.setState({ modalVisible: true });
            axios.post('https://aws-gpu3.xcellence.tech/vr_api/auth/register', {            
                firstname: this.firstName,
                lastname: this.lastName,
                username: this.firstName + this.lastName,
                email: this.email,
                password: this.password,                        
                user_type: "Client",
                confirmation_url: "https://aws-gpu3.xcellence.tech/confirm-account"
    
                // firstname: "Jamse",
                // lastname: "Lee",
                // username: "jamseLee",
                // password: "luy-test",
                // email: "luys8611@gmail.com",            
                // user_type: "Client"

              })
              .then(function (response) {
                console.log(response);            
                self.res_message = response.data['message'];     
                self.status = response.data['status'];

                console.log("mesege :" + self.res_message);       
                console.log("status :" + self.status);   

                self.setState({ modalVisible: false });
                if(self.status == "success") {
                    self.props.navigation.navigate("Bioauth");
                }
                else {
                    Alert.alert('The user already exists.')
                }
              })
              .catch(function (error) {
                console.log(error);
                self.setState({ modalVisible: false });
                Alert.alert(
                    'Register failed',
                    'Network Error',
                    [                  
                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            });
        }


        // this.props.navigation.navigate("Bioauth")
    }

    _onPressTerms = () => {
        this.setState({isAgreedTerms : !this.state.isAgreedTerms})
    }

    _onPressTermsAndConditions = () => {
        this.props.navigation.navigate("Terms")
    }

    _onPressSignin = () => {
        this.props.navigation.navigate("Signin")
    }
}

const styles = StyleSheet.create({
    appbar : {
        position: 'absolute'
    },
    container : {
        width: '100%',
        height: '100%', 
        alignItems: 'center',
    },

    content : {
        alignItems: 'center',
        paddingHorizontal: '8%'
    },

    backbutton : {
        width: dimen.appbar_height,
        height : dimen.appbar_height,
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        color: color.whiteText,
        fontWeight: 'bold',
        marginTop: 20,
    },
    terms : {
        flexDirection: 'row', 
        width: '100%',
        height: 40,
        marginTop: "7%",
        marginLeft: 5,
        alignItems: 'center'
    },

    register : {
        backgroundColor: color.orange,
        width: '100%',
        height: dimen.login_input_height,
        borderRadius: dimen.login_input_height / 2,
        marginTop: "7%",
        justifyContent: "center",
        alignItems: 'center'
    },
    registerTitle : {
        fontSize: 16,
        color: color.whiteText,
        fontWeight: 'bold',
    }, 
    alreadySignin : {
        flexDirection: 'row',
        height: 40,
        marginTop: '7%',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.5)',
        zIndex: 1000
    }
})

export default RegisterView
