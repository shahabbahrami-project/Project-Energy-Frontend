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

  export const getOneUserApi= (id, callback) => {
    getAxiosInstanceApi().get("Users/"+String(id))
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      console.log(error);
      callback(false, error);
    })
  };

  export const AddNewUser= (user,callback) => {
    getAxiosInstanceApi().post("Users", user)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const deleteUser = (user,callback) => {
  getAxiosInstanceApi().delete("Users/"+user.id)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const updateUser = (user,callback) => {
  getAxiosInstanceApi().put("Users/"+user.id, user)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};