import React from 'react'

import {
    View,
    TextInput,
    StyleSheet,
    Image,
} from 'react-native'
import dimen from '../value/dimen/dimen'

import Ionicons from 'react-native-vector-icons/Ionicons'
import color from '../value/color/color'

export class LoginTextInput extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            text : ""
        }
    }


    componentDidMount() {

    }

    render() {
        let props = this.props
        return <>
            <View style= {[loginTextInputStyles.container, props.containerStyle]}>
                {props.leftIcon?
                    <View style={loginTextInputStyles.leftIcon}>
                        {props.leftIcon}
                    </View> : null
                }
                
                <TextInput
                    onChangeText={text => this._onChangeText(text)}
                    placeholder={ props.placeholder }
                    placeholderTextColor={props.placeholderTextColor}
                    returnKeyType={
                        props.returnKeyType
                            ? props.returnKeyType
                            : "done"
                    }
                    blurOnSubmit={true}
                    onSubmitEditing={this._onSubmitEditing}
                    onBlur={() => {this.textInput.blur()}}
                    onFocus={this.onFocus}
                    spellCheck={false}
                    autoCorrect={false}
                    ref={textInput => {
                        this.textInput = textInput;
                    }}
                    value = {this.state.text}
                    style={[
                        loginTextInputStyles.textInput,
                        props.inputStyle,
                        {
                            color: color.whiteText,
                            flex: 1,
                            textAlignVertical: "center",
                            padding: 0
                        }
                    ]}
                    
                />
            </View>
        </>
    }

    _onSubmitEditing = () => {
        this.textInput.blur()
        this.props.onSubmitEditing? this.props.onSubmitEditing() : null
    }

    _onChangeText = (text) => {
        this.setState({text})
        this.props.onChangeText? this.props.onChangeText(text) : null
    }

    onFocus = () => {
        this.textInput.focus()
    }

}

export class LoginPasswordInput extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            text : ""
        }
    }


    componentDidMount() {

    }

    render() {
        let props = this.props
        return <>
            <View style= {[loginTextInputStyles.container, props.containerStyle]}>
                {props.leftIcon?
                    <View style={loginTextInputStyles.leftIcon}>
                        {props.leftIcon}
                    </View> : null
                }
                
                <TextInput
                    onChangeText={text => this._onChangeText(text)}
                    placeholder={ props.placeholder }
                    placeholderTextColor={props.placeholderTextColor}
                    returnKeyType={
                        props.returnKeyType
                            ? props.returnKeyType
                            : "done"
                    }
                    blurOnSubmit={true}
                    onSubmitEditing={this._onSubmitEditing}
                    onBlur={() => {this.textInput.blur()}}
                    onFocus={this.onFocus}
                    spellCheck={false}
                    autoCorrect={false}
                    ref={textInput => {
                        this.textInput = textInput;
                    }}
                    value = {this.state.text}
                    style={[
                        loginTextInputStyles.textInput,
                        props.inputStyle,
                        {
                            color: color.whiteText,
                            flex: 1,
                            textAlignVertical: "center",
                            padding: 0
                        }
                    ]}
                    secureTextEntry={true}
                />
            </View>
        </>
    }

    _onSubmitEditing = () => {
        this.textInput.blur()
        this.props.onSubmitEditing? this.props.onSubmitEditing() : null
    }

    _onChangeText = (text) => {
        this.setState({text})
        this.props.onChangeText? this.props.onChangeText(text) : null
    }

    onFocus = () => {
        this.textInput.focus()
    }

}


const loginTextInputStyles = StyleSheet.create({
    container: {
        width : '100%',
        height: dimen.login_input_height,
        borderWidth: 1,
        borderRadius: dimen.login_input_height / 2.0,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF45'
    },

    leftIcon : {
        width: dimen.login_input_height,
        height: dimen.login_input_height,
        alignItems: 'center',
        justifyContent: 'center',
    }, 

    textInput : {
        fontSize: 14,
    }
})

