import RNFetchBlob from 'rn-fetch-blob'
import { getToken } from '../utils/global'

export function upload(api, files) {
    return RNFetchBlob.fetch('POST', api, {
        'Content-Type' : 'multipart/form-data'
    }, files)
}

export function convert_audio(api, files) {
    return RNFetchBlob.fetch('POST', api, {
        Authorization: "Bearer " + getToken(),
        'Content-Type' : 'multipart/form-data'
    }, files)
}

export function transcript_audio(api) {
    console.log('Bearer ' + getToken());
    console.log(api);

    // let headers = {"Content-Type": "application/json"};
    // headers["Authorization"] = 'Bearer ' + getToken();

    // return RNFetchBlob.fetch('GET', api, {headers,})

    return RNFetchBlob.fetch('GET', api, {                
            Authorization: 'Bearer ' + getToken(),
    })
}