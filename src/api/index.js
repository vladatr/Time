import axios from 'axios'

export const dayList = (user, date) => {
    return axios.get('http://94.127.6.8/time/api/get.php?name='+user+'&date='+date)
    .then(res => {
        debugger
       return res
    })
}