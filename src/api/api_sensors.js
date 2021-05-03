import {getAxiosInstanceApi} from "./api";

export const getSensorsType = (callback) => {
  getAxiosInstanceApi().get("Sensors/sensortypes")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const addSensorsList = (sensorlist,callback) => {
  getAxiosInstanceApi().post("Sensors/addsensorsList", sensorlist)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const addOneSensors = (sensor,callback) => {
  getAxiosInstanceApi().post("Sensors", sensor)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const updateOneSensors = (sensor,callback) => {
  getAxiosInstanceApi().put("Sensors/"+String(sensor.id), sensor)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};


export const updateSensor= (sensor ,callback) => {
  getAxiosInstanceApi().put(`Sensors/${sensor.id}`, sensor)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};


export const updateSensorValue= (sensor ,callback) => {
  getAxiosInstanceApi().post("data", sensor)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const deleteOneSensors = (sensorId,callback) => {
  getAxiosInstanceApi().delete("Sensors/"+String(sensorId))
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const getSensorsList = (siteId,callback) => {
  getAxiosInstanceApi().get(`Sensors/?siteId=${siteId}`)
  .then(response => {
    const data = response.data;
    callback(true, data);
  }).catch(error => {
  console.log(error);
  callback(false, error);
})
};

export const getSensorsBySiteId = (siteId , callback) => {
  let id = siteId ;
  getAxiosInstanceApi().get(`Sensors/?siteId=${id}`)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const getSensorData = (sensorId , callback) => {
  let id = sensorId ;
  getAxiosInstanceApi().get(`data?sensorID=${id}`)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};

export const getSensorDataFilter = (filter, callback) => {
  getAxiosInstanceApi().post("data/FilterData", filter)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    console.log(error);
    callback(false, error);
  })
};


