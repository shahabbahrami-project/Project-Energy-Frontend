import {getAxiosInstanceApiEnergy} from "./api";


export const getSensorsType = (callback) => {
    getAxiosInstanceApiEnergy().get("/api/sites/sensortypes/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const retrieveSensorsList = (callback) => {
    getAxiosInstanceApiEnergy().get("/api/sites/sensors/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const addSensor = (sensor,callback) => {
    getAxiosInstanceApiEnergy().post("/api/sites/sensors/", sensor)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const updateSensor = (sensor,id,callback) => {
    getAxiosInstanceApiEnergy().put("/api/sites/sensors/"+String(id)+"/", sensor)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const deleteSensor = (id,callback) => {
    getAxiosInstanceApiEnergy().delete("/api/sites/sensors/"+String(id)+"/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };