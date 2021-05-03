import {getAxiosInstanceApiEnergy} from "./api";


export const getUserID= (callback) => {
    getAxiosInstanceApiEnergy().get("api/user/meuser/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      console.log(error);
      callback(false, error);
    })
  };