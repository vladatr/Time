import axios from 'axios'

const server= "http://94.127.6.8/time/api/"

export const dayList = (user, date) => {
    return axios.get(server + 'get.php?name='+user+'&date='+date)
    .then(res => {
        debugger
       return res
    })
}

export const storeTime = (user, date, time, type, values) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
           //'Content-Type': 'application/json'//NOTE: this will send as 'Request payload'
        },
        url: server + 'storeTime.php',
        data: {user, date, time, type, values}
     }
    return axios.post(options)
    .then(res => {
        debugger
       return res
    })
}

export const storeProject = (user, name) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        url: server + 'storeProject.php',
        data: {user, name}
     }
    return axios.post(options)
    .then(res => {
        debugger
       return res
    })
}

export const getProjects = (string) => {
    //query string or all
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        url: server + 'getProjects.php',
        data: {string}
     }
    return axios.post(options)
    .then(res => {
        debugger
       return res
    })
}