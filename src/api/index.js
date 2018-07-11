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
        method: 'POST',//method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
           //'Content-Type': 'application/json'//NOTE: this will send as 'Request payload'
        },
        url: 'Service.aspx?savePersonalPages=true&saveType=pageList',
        data: {user, date, time, type, values}
     }
    return axios.post(server + 'store.php')
    .then(res => {
        debugger
       return res
    })
}