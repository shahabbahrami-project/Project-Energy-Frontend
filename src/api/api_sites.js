import {getAxiosInstanceApi} from "./api";

export const getAllSites = (callback) => {
  getAxiosInstanceApi().get("Site")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const addNewSite = (site,callback) => {
    getAxiosInstanceApi().post("Site", site)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const updateSite = (site,callback) => {
  getAxiosInstanceApi().put("Site/"+site.id, site)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const deleteSite = (site,callback) => {
  getAxiosInstanceApi().delete("Site/"+site.id)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const filterSites = (filter,callback) => {
  console.log(filter)
    getAxiosInstanceApi().post("Site/Filter", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const groupByCity = (filter,callback) => {
  console.log(filter)
    getAxiosInstanceApi().post("Site/GroupByCity", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

