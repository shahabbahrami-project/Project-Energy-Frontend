import axios from "axios";
import { getAxiosInstanceApi,getAxiosInstanceApiPic, getAxiosInstanceAuth } from "./api";

export const loginApi=(user,callback)=> {
  console.log(user)
  getAxiosInstanceAuth().post("api/user/token/", user)
      .then(response => {
          const data = response.data;
          callback(true, data)
      }).catch(error => {
      callback(false, error.response.data.message)
  })
};

export const registerApi=(user,callback)=> {
  getAxiosInstanceAuth().post("register", user)
    .then(response => {
      const data = response.data;
      callback(true, data)
    }).catch(error => {
    callback(false, error.response.data.message)
  })
};

export const emailConfirmApi=(email,callback)=> {
  getAxiosInstanceAuth().post("Users/PasswordRecovery", email)
    .then(response => {
      const data = response.data;
      callback(true, data)
    }).catch(error => {
    callback(false, error.response.data.message)
  })
};

export const changePasswordAPI=(password,callback)=> {
  getAxiosInstanceApi().post("Users/ChangePassword", password)
    .then(response => {
      const data = response.data;
      callback(true, data)
    }).catch(error => {
    callback(false, error.response.data.message)
  })
};


export const passChangeApi=(newpass,callback)=> {
  getAxiosInstanceAuth().post("passchange", newpass)
    .then(response => {
      const data = response.data;
      callback(true, data)
    }).catch(error => {
    callback(false, error.response.data.message)
  })
};


export const uploadUserPhoto = (photo,callback) => {
  getAxiosInstanceApiPic().post("Users/UploadPic",photo)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error.response.data.message);
  })
};