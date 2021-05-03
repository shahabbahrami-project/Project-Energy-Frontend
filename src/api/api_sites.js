import {getAxiosInstanceApi, getAxiosInstanceApiPic, getAxiosInstanceApiExcel } from "./api";

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

export const getSite= (siteId ,callback) => {
  getAxiosInstanceApi().get("Site/" + siteId )
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const getReports= (filter ,callback) => {
 
  getAxiosInstanceApi().post("reports/getAllToArray", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const getReportsById = (filter ,callback) => {
  
  getAxiosInstanceApi().post("reports/GetAll", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const deleteReport= (Reportid ,callback) => {
  let id = Reportid ;
  getAxiosInstanceApi().get("Reports/" + id)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const getExcel= (filter ,filename, callback) => {
  getAxiosInstanceApiExcel().post("reports/ToExcel", filter)
    .then(response => {
      const data = response.data;
      const type = response.headers['content-type']
      const blob = new Blob([response.data], {type:type});
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob);
      link.download = filename
      link.click()
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};
export const getAlerts= (filter ,callback) => {
  getAxiosInstanceApi().post("alerts", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const setImageForSite= ( image ,callback) => {
  getAxiosInstanceApiPic().post("Site/UploadPicture" , image)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const removeImage= ( id ,callback) => {
  getAxiosInstanceApiPic().get( `Site/removepic/${id}/`)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const addReport= ( report ,callback) => {
  getAxiosInstanceApi().post("reports" , report)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};