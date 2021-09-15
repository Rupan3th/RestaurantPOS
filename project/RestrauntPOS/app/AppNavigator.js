import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

import {
    createStackNavigator,
    NavigationStackScreenProps,
    HeaderTitle
} from 'react-navigation-stack';

import {createSwitchNavigator} from 'react-navigation'

import Ripple from 'react-native-material-ripple';

import LoginStartView from '../source/view/login/login_start'
import SigninView from '../source/view/login/signin'
import RegisterView from '../source/view/login/register'
import color from "../source/value/color/color";
import AppbarView from "../source/components/appbar";

import TermsView from '../source/view/login/terms'
import BioauthStartView from "../source/view/bioauth/bioauth_start";
import BioauthPager from "../source/view/bioauth/bioauth";

import HomeView from '../source/view/home/home'

const AuthStack = createStackNavigator({
    Landing: {
        screen : LoginStartView,
        navigationOptions: {
            headerShown : false
        }
    },
    Signin: {
        screen : SigninView,
        navigationOptions: {
            headerShown : false
        }
    },
    Register: {
        screen : RegisterView,
        navigationOptions: {
            headerShown : false
        }
    },
    Terms: {
        screen: TermsView,
        navigationOptions: {
            headerShown : false
        }
    },
    Bioauth : {
        screen: BioauthPager,
        navigationOptions: {
            headerShown : false
        }
    }
})


const BioAuthStack = createStackNavigator({
    BioStart: {
        screen : BioauthStartView,
        navigationOptions: {
            headerShown : false
        }
    },

})

export default AppNavigator = (signedIn = false) => {
    const appNavigator = createSwitchNavigator(
        {
            Auth: AuthStack,
            Home : HomeView,
        },
        {
            // initialRouteName: getSettingValue().is_first
            //     ? "SignedOut"
            //     : "SignedIn" //: signedIn?:"SignedOut",
            initialRouteName: "Auth"
        }
    );
    
    return appNavigator;
};

