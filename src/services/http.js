import axios from "axios";
import https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
import {ProxyAgent} from '../services/proxy.js'

export class HttpService {
  constructor(log, proxy = null) {
    this.baseURL = "https://tgapp-api.matchain.io/api/tgapp/v1/";
    this.proxy = proxy;
    this.log = log;
    this.token = null;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "Sec-Fetch-Site": "same-site",
      "Accept-Language": "vi-VN,vi;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Sec-Fetch-Mode": "cors",
      Host: "tgapp-api.matchain.io",
      Origin: "https://tgapp.matchain.io",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      Referer: "https://tgapp.matchain.io/",
      Connection: "keep-alive",
      "Sec-Fetch-Dest": "empty",
    };
  }

  updateToken(token) {
    this.token = token;
  }

  initConfig() {
    const headers = {
      ...this.headers,
    };
    if (this.token) {
      headers["Authorization"] = `${this.token}`;
    }
    const agent = new https.Agent({
      rejectUnauthorized: false, // Bỏ qua xác minh chứng chỉ
    });

    const config = {
      headers,
      httpsAgent: agent
    };

    if (this.proxy && this.proxy !== "skip") {
      config["httpsAgent"] = new ProxyAgent(this.proxy, {rejectUnauthorized: false});
    }
    
    return config;
  }

  get(endPoint) {
    const url = this.baseURL + endPoint;
    const config = this.initConfig();
    return axios.get(url, config);
  }

  post(endPoint, body) {
    const url = this.baseURL + endPoint;
    const config = this.initConfig();
    return axios.post(url, body, config);
  }

  put(endPoint, body) {
    const url = this.baseURL + endPoint;
    const config = this.initConfig();
    return axios.put(url, body, config);
  }

  async checkProxyIP() {
    if (!this.proxy || this.proxy === "skip") {
      this.log.updateIp("🖥️");
      return null;
    }
    try {
      const proxyAgent = new HttpsProxyAgent(this.proxy);
      const response = await axios.get("https://api.ipify.org?format=json", {
        httpsAgent: proxyAgent,
      });
      if (response.status === 200) {
        const ip = response.data.ip;
        this.log.updateIp(ip);
        return ip;
      } else {
        throw new Error("Proxy lỗi, kiểm tra lại kết nối proxy");
      }
    } catch (error) {
      this.log.updateIp("🖥️");
      return -1;
    }
  }
}
