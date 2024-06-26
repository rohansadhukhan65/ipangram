import { constants } from "../constants";

export const Apihelper = {
  get: async (url) => {
    return await fetch(constants.BaseUrl + url, { method: "GET" });
  },
  post: async (url, data) => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(data);

    let response = await fetch(constants.BaseUrl + url, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    return response;
  },
};
