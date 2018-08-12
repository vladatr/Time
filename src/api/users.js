import axios from 'axios'

import {serverv2} from './common'

export const getOpstine = () => {
    //query string or all
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: serverv2 + 'getOpstine.php'
     }
    return axios(options)
    .then(res => {
       return res.data
    })
    .catch(err => {
        return err
    })
}

export const getEducation = () => {
    //query string or all
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: serverv2 + 'getEducation.php'
     }
    return axios(options)
    .then(res => {
        console.log("EDUCATIONS RES", res.data)
       return res.data
    })
    .catch(err => {
        return err
    })
}

export const storeEducation = (education) => {
    
    //query string or all
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: serverv2 + 'storeEducation.php',
        data: {education}
     }
    return axios(options)
    .then(res => {
        console.log("storeEducation RES", res)
       return res.data
    })
    .catch(err => {
        return err
    })
}