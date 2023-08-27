import axios from "axios"
import { DOMAIN, TOKEN } from "../util/setting"

const token = localStorage.getItem(TOKEN)

export class BaseService {
  put = (url: string, model: any) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: `Bearer ${token}`,
        token: token
      }
    })
  }

  post = (url: string, model: any) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: `Bearer ${token}`,
        token: token
      }
    })
  }

  get = (url: string, params: any) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "GET",
      params: params,
      headers: {
        Authorization: `Bearer ${token}`,
        token: token
      }
    })
  }

  delete = (url: string, model: any) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: "DELETE",
      data: model,
      headers: {
        Authorization: `Bearer ${token}`,
        token: token
      }
    })
  }
}
