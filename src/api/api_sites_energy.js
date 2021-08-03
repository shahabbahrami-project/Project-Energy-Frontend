import { getAxiosInstanceApiSiteEnergy } from "./api";
import { getAxiosInstanceApiEnergy } from "./api";

export const addSite = (site, callback) => {
  let form_data = new FormData();
  // if (site.image != null) {
  //   form_data.append('image', site.image, site.image.name);
  // }
  // else {
  //   form_data.append('image', site.image, null);
  // }

  form_data.append('name', site.name);
  form_data.append('link', site.link);
  site.devices.forEach((item) => form_data.append('devices', item))
  site.sensors.forEach((item) => form_data.append('sensors', item))
  form_data.append('locationX', site.locationX);
  form_data.append('locationY', site.locationY);
  form_data.append('timezone', site.timezone);
  form_data.append('user', site.user);
  form_data.append('created_at', site.created_at);

  console.log('form data', form_data)
  getAxiosInstanceApiSiteEnergy().post("/api/sites/sites/", form_data)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
      callback(false, error);
    })
};


export const updateSite = (site, callback) => {
  const id = site.id
  let form_data = new FormData();
  if (typeof site.image != "string") {
    if (site.image != null) {
      form_data.append('image', site.image, site.image.name);
    }
    else {
      form_data.append('image', site.image, null);
    }

  }
  form_data.append('name', site.name);
  form_data.append('link', site.link);
  site.devices.forEach((item) => form_data.append('devices', item))
  site.sensors.forEach((item) => form_data.append('sensors', item))
  form_data.append('locationX', site.locationX);
  form_data.append('locationY', site.locationY);
  form_data.append('timezone', site.timezone);
  form_data.append('user', site.user);
  form_data.append('created_at', site.created_at);

  getAxiosInstanceApiSiteEnergy().put("/api/sites/sites/"+String(id)+"/", form_data)
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    callback(false, error);
  })
};

export const deleteSite = (site, callback) => {
  const id = site.id
  getAxiosInstanceApiSiteEnergy().delete("/api/sites/sites/"+String(id)+"/")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
    callback(false, error);
  })
};

export const allSites = (callback) => {
  getAxiosInstanceApiEnergy().get("/api/sites/sites/")
    .then(response => {
      const data = response.data;
      callback(true, data);
    }).catch(error => {
      console.log(error);
      callback(false, error);
    })
};

