import { get, post,put } from "./api";
import { baseURL } from "./api-config";
import { StoreInstance } from "../centralstore";
export const addPatient = async (patientdetails) => {
  console.log("patientdetails===>", patientdetails);
  const body = {
    url: `${baseURL}/patientdetails`,
    data: patientdetails,
  };
  await post(body).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      var errorMessage = "";
      if ( response.status >= 500) {
        errorMessage = "Error From API Side. Report to Back End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      } else {
        errorMessage = "Error From UI Side. Report to Front End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      }
    }
  });
};

export const getPatientDetails = async (filterRange) => {
  const body = {
    url: `${baseURL}/patientdetails?filterRange=${filterRange}`,
  };
  return await get(body).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      var errorMessage = "";
      if (response.status >= 500) {
        errorMessage = "Error From API Side. Report to Back End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      } else {
        errorMessage = "Error From UI Side. Report to Front End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      }
    }
  });
};



export const updatePatient = async (patientdetails) => {
  console.log("patientdetails===>", patientdetails);
  const body = {
    url: `${baseURL}/updatepatient`,
    data: patientdetails,
  };
  await put(body).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      var errorMessage = "";
      if (response.status >= 500) {
        errorMessage = "Error From API Side. Report to Back End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      } else {
        errorMessage = "Error From UI Side. Report to Front End Developer...!";
        StoreInstance.errorHasOccured(
          errorMessage + " : " + response.statusText
        );
      }
    }
  });
};