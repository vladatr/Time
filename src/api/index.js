import axios from 'axios'

const server= "http://94.127.6.8/time2/api/"

export const dayList = (user, date) => {
    return axios.get(server + 'getTimes.php?name='+user+'&date='+date)
    .then(res => {
       return res
    })
}

export const storeTime = (user, project, date, time, type, values) => {
   // console.log("test", selectedProject, this.formatDateMySQL(date), time, activityType,  values)
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'storeTime.php',
        data: {user, project, date, time, type, values}
     }
    return axios(options)
    .then(res => {
        debugger
        console.log(res)
       return res.data
    })
    .catch(err => {
        return err
    })
}

export const storeProject = (user, name) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'storeProject.php',
        data: {user, name}
     }
    return axios(options)
    .then(res => {
        debugger
       return res
    })
    .catch(err => {
        return err
    })
}

export const getProjects = (string) => {
    //query string or all
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getProjects.php',
        data: {name: string}
     }
    return axios(options)
    .then(res => {
       return res.data
    })
    .catch(err => {
        return err
    })
}