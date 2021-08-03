import {getAxiosInstanceApiEnergy} from "./api";


export const getDevicesType = (callback) => {
    getAxiosInstanceApiEnergy().get("/api/sites/devicetypes/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const retrieveDevicesList = (callback) => {
    getAxiosInstanceApiEnergy().get("/api/sites/devices/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const addDevice = (device,callback) => {
    getAxiosInstanceApiEnergy().post("/api/sites/devices/", device)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const updateDevice = (device,id,callback) => {
    getAxiosInstanceApiEnergy().put("/api/sites/devices/"+String(id)+"/", device)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const deleteDevice = (id,callback) => {
    getAxiosInstanceApiEnergy().delete("/api/sites/devices/"+String(id)+"/")
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const sensorsdata = (historyGraph,callback) => {
    getAxiosInstanceApiEnergy().post("/api/sites/historydata/", historyGraph)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };

  export const sensorsonlinedata = (onlineGraph,callback) => {
    getAxiosInstanceApiEnergy().post("/api/sites/onlinedata/", onlineGraph)
      .then(response => {
        const data = response.data;
        callback(true, data);
      }).catch(error => {
      callback(false, error);
    })
  };