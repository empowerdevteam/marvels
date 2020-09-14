// import { version } from "react";

let backendHost;
const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

// if(hostname === 'realsite.com') {
//   backendHost = 'https://api.realsite.com';
// } else if(hostname === 'staging.realsite.com') {
//   backendHost = 'https://staging.api.realsite.com';
// } else if(/^qa/.test(hostname)) {
//   backendHost = `https://api.${hostname}`;
// } else {
//   backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
// }https://tjihsq9cz0.execute-api.us-east-1.amazonaws.com/dev/v1

if (hostname === "localhost:3000") {
  backendHost = "https://tjihsq9cz0.execute-api.us-east-1.amazonaws.com/dev/";
} else if (hostname === "staging.realsite.com") {
  backendHost = "https://staging.api.realsite.com";
} else {
  backendHost = "https://tjihsq9cz0.execute-api.us-east-1.amazonaws.com/dev/";
}
// export const API_ROOT = `${backendHost}/api/${apiVersion}`;
export const baseURL = `${backendHost}${apiVersion}`;
