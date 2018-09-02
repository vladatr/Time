import axios from 'axios'

import {server} from './common'

export const dayList = (user, date) => {
    debugger
    return axios.get(server + 'getTimes.php?user='+user+'&date='+date)
    .then(res => {
        debugger
       return res
    })
}

export const deleteItem = (id) => {
    return axios.get(server + 'deleteItem.php?id='+id)
    .then(res => {
        debugger
       return res.data
    })
}


export const storeProjectItems = (user, preostalo1, preostalo2, selectedProject, value1, selected) => {
    debugger
     let options = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
         },
         url: server + 'storeProjectItems.php',
         data: {user, preostalo1, preostalo2, selectedProject, value1, selected}
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
 

export const storeTime = (user, project, date, time, type, values) => {
    debugger
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

export const storeProject = (user, name, brojKorisnika) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'storeProject.php',
        data: {user, name, brojKorisnika}
     }
    return axios(options)
    .then(res => {
       return res
    })
    .catch(err => {
        return err
    })
}

export const getProjects = (username) => {
    //query string or all
    debugger
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getProjects.php',
        data: {username}
     }
    return axios(options)
    .then(res => {
        debugger
       return res.data
    })
    .catch(err => {
        debugger
        return err
    })
}

export const getPrograms = (project) => {
    //query string or all
    debugger
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getPrograms.php',
        data: {project}
     }
    return axios(options)
    .then(res => {
        debugger
       return res.data
    })
    .catch(err => {
        debugger
        return err
    })
}

export const getData = (projectID) => {
    //query string or all
    debugger
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: server + 'getData.php',
        data: {projectID}
     }
    return axios(options)
    .then(res => {
        debugger
       return res.data
    })
    .catch(err => {
        debugger
        return err
    })
}