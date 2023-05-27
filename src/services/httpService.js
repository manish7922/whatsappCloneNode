import axois from "axios"

const baseURL = "http://localhost:2411";

function get(url) {
  return axois.get(baseURL + url);
}
function post(url, obj) {
  return axois.post(baseURL + url, obj);
}
function put(url, obj) {
  return axois.put(baseURL + url, obj);
}
function deleteApi(url) {
  return axois.delete(baseURL + url);
}

// function get1(url) {
//    return axois.get(baseURL + url);
//   let user=auth.getToken();
//   let token=user.token;
//   return axois.get(baseURL + url,{headers:{Authorization:token}});
// }

// function post1(url, obj) {
//   let user=auth.getToken();
//   let token=user.token;
//   return axois.post(baseURL + url, obj,{headers:{Authorization:token}});
// }

// function put1(url, obj) {
//   let user=auth.getToken();
//   let token=user.token;
//   return axois.put(baseURL + url, obj,{headers:{Authorization:token}});
// }

// function deleteApi1(url) {
//   let user=auth.getToken();
//   let token=user.token;
//   return axois.delete(baseURL + url,{headers:{Authorization:token}});
// }

export default {
  get,
  post,
  put,
  deleteApi,
  // get1,
  // post1,
  // put1,
  // deleteApi1
};
