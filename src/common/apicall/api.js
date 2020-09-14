export const get = (body) => {
  console.log("GET API URL===>", body.url);
  return fetch(body.url, {
    method: "GET",
    headers: body.headers || {},
  });
};

export const post = (body) => {
  console.log("POST API URL===>", body.url);
  return fetch(body.url, {
    method: "POST",
    headers: body.headers || {},
    body: JSON.stringify(body.data),
  });
};

export const put = (body) => {
  return fetch(body.url, {
    method: "PUT",
    headers: body.headers,
    body: JSON.stringify(body.data),
  });
};

export const deleteapi = (body) => {
  return fetch(body.url, {
    method: "DELETE",
    headers: body.headers,
    body: JSON.stringify(body.data),
  });
};
