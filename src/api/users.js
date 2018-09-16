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

export const getUsers = (admin) => {
    //query users per admin
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getUsers.php',
        data: {admin}
     }
    return axios(options)
    .then(res => {
       return res.data
    })
    .catch(err => {
        return err
    })
}

export const getUsersCountProjects = (admin) => {
    //query users per admin
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getUsersCountProjects.php',
        data: {admin}
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

export const storeUser = ({admin, ime, opstina, edu, staz,velicina_centra, tip, username, password}) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + "storeUser.php",
        data : {admin, ime, opstina, edu, staz,velicina_centra, tip, username, password}
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

export const checkUser = (username, password) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + "checkUser.php",
        data : {username, password}
    }
    return axios(options)
    .then(res => {
        console.log("checkUser res ", res)
        return res.data
    })
    .catch(err => {
        return err
    })  
}