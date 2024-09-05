import { HttpsProxyAgent } from "https-proxy-agent";

export class ProxyAgent extends HttpsProxyAgent {
    constructor(proxy, opts) {
        super(proxy, opts);
        this.constructorOpts = opts;
    }

    async connect(req, opts) {
        const combinedOpts = { ...this.constructorOpts, ...opts };
        return super.connect(req, combinedOpts);
    }
}