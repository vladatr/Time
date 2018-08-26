import axios from 'axios'

import {server, serverv2} from './common'

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
        url: server + 'getEducation.php'
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
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'storeEducation.php',
        data: {education}
     }
    return axios(options)
    .then(res => {
       return res.data
    })
    .catch(err => {
        return err
    })
}

export const storeUser = ({ime, opstina, edu, staz,velicina_centra, username, password}) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + "storeUser.php",
        data : {ime, opstina, edu, staz,velicina_centra, username, password}
    }
    return axios(options)
    .then(res => {
        console.log("storeUser res ", res)
        return res.data
    })
    .catch(err => {
        return err
    })
}
