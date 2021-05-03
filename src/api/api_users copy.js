import {getAxiosInstanceApi} from "./api";



export const getAllUsersApi= (callback) => {
    getAxiosInstanceApi().get("Users")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      console.log(error);
      callback(false, error);
    })
  };