import {getAxiosInstanceEnergy, getAxiosInstanceEnergyLocal} from "./api";

export const filterSensors = (filter,callback) => {
    console.log(filter)
    getAxiosInstanceEnergy().get("search-sensor", {
        params: {
          name: filter.name,
          building:filter.building,
          sensorOrmeter:filter.sensorOrmeter
        }
      })
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      console.log(error);
      callback(false, error);
    })
  };

  export const getAllSensors = (callback) => {
        getAxiosInstanceEnergy().get("get-all-sensors")
          .then(response => {
            const data = response.data;
            callback(true, data);
          }).catch(error => {
          console.log(error);
          callback(false, error);
        })
      };
      

  export const addNewSensor = (site,callback) => {
      console.log(site)
    getAxiosInstanceEnergy().post("post-sensor/", site)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const updateSensor = (site,callback) => {
  getAxiosInstanceEnergy().put("update-sensor/"+site.id+"/", site)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const deleteSensor = (site,callback) => {
  getAxiosInstanceEnergy().delete("delete-sensor/"+site.id+"/")
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const getAllDepartments = (callback) => {
  getAxiosInstanceEnergy().get("all_departments/")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const filterDepts = (filter,callback) => {
  const filter1={department:"CIRS_633",  startdate:"2020-01-06", enddate:"2020-01-07"};
  console.log(filter1)
  getAxiosInstanceEnergy().post("filter/", filter1)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};


export const occupancy = (callback) => {
  getAxiosInstanceEnergy().get("occupancy/")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const occupancyLocal = (callback) => {
  getAxiosInstanceEnergyLocal().get("occupancy/")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};