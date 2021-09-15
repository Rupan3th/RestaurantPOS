import * as Service from '../service'
import API from '../value/restapi'
import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { getFaceLoad, getToken } from '../utils/global'

export function voice_authenentication(audio) {
    let files = [
        {
            name: 'file',
            filename: audio.name,
            data: RNFetchBlob.wrap(Platform.OS == 'ios'? audio.path: "file://" + audio.path)
        }
    ]
    return Service.upload(API.bio_voice, files)
}

export function face_authentication(image) {
    let files = [
        {
            name: 'file',
            filename: image.name,
            data: RNFetchBlob.wrap(Platform.OS == 'ios'? image.path: "file://" + image.path)
        }
    ]

    if((getFaceLoad() == undefined) && (getToken() == undefined)) {
        return Service.upload(API.bio_image_upload, files)
    }
    else{
        return Service.upload(API.bio_image, files)
    }
    
}

export function convert_audio(audio) {
    let files = [
        {
            name: 'file',
            filename: audio.name,
            data: RNFetchBlob.wrap(Platform.OS == 'ios'? audio.path: "file://" + audio.path)
        },
        {   name : 'engine',
            data : 'xcel-3'
        },
        {   name :'language',
            data: 'en'
        }
        // {   
        //     name : 'info', 
        //     data : JSON.stringify({
        //         engine: 'xcel-3',
        //         language: 'en'
        //     })
        // }    
    ]

    return Service.convert_audio(API.convert_audio, files)
}

export function transcript(api) {   

    return Service.transcript_audio(api)
}