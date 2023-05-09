globalThis.IMBA_MANIFEST={}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));

// ../../.nvm/versions/node/v18.10.0/lib/node_modules/imba/src/imba/serve.imba
var import_cluster = require("cluster"), import_fs = __toESM(require("fs")), import_path = __toESM(require("path")), import_events = require("events"), import_http = __toESM(require("http")), import_https = require("https");
function iter$__(a) {
  let v;
  return a && ((v = a.toIterable) ? v.call(a) : a);
}
function defineName$__(cls, name) {
  Object.defineProperty(cls, "name", { value: name, configurable: !0 });
}
function inheritClass$__(cls) {
  var _a2, _b;
  (_b = (_a2 = Object.getPrototypeOf(cls.prototype).constructor) == null ? void 0 : _a2.inherited) == null || _b.call(_a2, cls);
}
var $setup$ = /* @__PURE__ */ Symbol.for("#setup"), $setupΦ$ = /* @__PURE__ */ Symbol.for("#setup?"), $dom$ = /* @__PURE__ */ Symbol.for("#dom"), $server$ = /* @__PURE__ */ Symbol.for("#server"), defaultHeaders = {
  html: { "Content-Type": "text/html; charset=utf-8" },
  js: { "Content-Type": "text/javascript; charset=utf-8" },
  cjs: { "Content-Type": "text/javascript; charset=utf-8" },
  mjs: { "Content-Type": "text/javascript; charset=utf-8" },
  json: { "Content-Type": "application/json; charset=utf-8" },
  css: { "Content-Type": "text/css; charset=utf-8" },
  map: { "Content-Type": "application/json; charset=utf-8" },
  otf: { "Content-Type": "font/otf" },
  ttf: { "Content-Type": "font/ttf" },
  woff: { "Content-Type": "font/woff" },
  woff2: { "Content-Type": "font/woff2" },
  svg: { "Content-Type": "image/svg+xml" },
  avif: { "Content-Type": "image/avif" },
  gif: { "Content-Type": "image/gif" },
  png: { "Content-Type": "image/png" },
  apng: { "Content-Type": "image/apng" },
  webp: { "Content-Type": "image/webp" },
  jpg: { "Content-Type": "image/jpeg" },
  jpeg: { "Content-Type": "image/jpeg" },
  ico: { "Content-Type": "image/x-icon" },
  bmp: { "Content-Type": "image/bmp" },
  webm: { "Content-Type": "video/webm" },
  weba: { "Content-Type": "audio/webm" },
  avi: { "Content-Type": "video/x-msvideo" },
  mp3: { "Content-Type": "audio/mpeg" },
  mp4: { "Content-Type": "video/mp4" },
  m4a: { "Content-Type": "audio/m4a" },
  mov: { "Content-Type": "video/quicktime" },
  wmv: { "Content-Type": "video/x-ms-wmv" },
  mpeg: { "Content-Type": "video/mpeg" },
  wav: { "Content-Type": "audio/wav" },
  ogg: { "Content-Type": "audio/ogg" },
  ogv: { "Content-Type": "video/ogg" },
  oga: { "Content-Type": "audio/ogg" },
  opus: { "Content-Type": "audio/opus" }
}, proc = globalThis.process, _Servers = class extends Set {
  call(name, ...params) {
    var $1;
    $1 = [];
    for (let server of iter$__(this))
      $1.push(server[name](...params));
    return $1;
  }
  close(o = {}) {
    var $2;
    $2 = [];
    for (let server of iter$__(this))
      $2.push(server.close(o));
    return $2;
  }
  reload(o = {}) {
    var $3;
    $3 = [];
    for (let server of iter$__(this))
      $3.push(server.reload(o));
    return $3;
  }
  broadcast(msg, ...rest) {
    var $4;
    $4 = [];
    for (let server of iter$__(this))
      $4.push(server.broadcast(msg, ...rest));
    return $4;
  }
  emit(event, data) {
    var $5;
    $5 = [];
    for (let server of iter$__(this))
      $5.push(server.emit(event, data));
    return $5;
  }
}, Servers = _Servers;
(() => {
  defineName$__(_Servers, "Servers"), inheritClass$__(_Servers);
})();
var servers = new Servers(), _a, process = new (_a = class extends import_events.EventEmitter {
  constructor() {
    var self;
    super(...arguments), self = this, this.autoreload = !1, this.state = {};
  }
  [$setup$]() {
    var self = this;
    if (this[$setupΦ$] != !0 && (this[$setupΦ$] = !0, !0))
      return this.on("rebuild", function(e) {
        let prev = globalThis.IMBA_MANIFEST;
        return globalThis.IMBA_MANIFEST = e, servers.broadcast("rebuild", e);
      }), this.on("reloading", function(e) {
        var $6;
        self.state.reloading = !0, $6 = [];
        for (let server of iter$__(servers))
          $6.push(server.pause());
        return $6;
      }), this.on("reloaded", async function(e) {
        var $7;
        self.state.reloaded = !0, servers.broadcast("reloaded"), await new Promise(function(_0) {
          return setTimeout(_0, 100);
        }), $7 = [];
        for (let server of iter$__(servers))
          $7.push(server.close());
        let promises = $7;
        return setTimeout(function() {
          return proc.exit(0);
        }, 100), await Promise.all(promises), proc.exit(0);
      }), !0;
  }
  send(msg) {
    if (proc.send instanceof Function)
      return proc.send(msg);
  }
  on(name, cb) {
    return super.on(...arguments);
  }
  reload() {
    if (!(this.isReloading != !0 && (this.isReloading = !0, !0)))
      return this;
    if (this.state.reloading = !0, !proc.env.IMBA_SERVE) {
      console.warn("not possible to gracefully reload servers not started via imba start");
      return;
    }
    this.send("reload");
  }
}, (() => {
  defineName$__(_a, "Process"), inheritClass$__(_a);
})(), _a)();
function deepImports(src, links = [], depth = 0) {
  let asset = globalThis.IMBA_MANIFEST[src];
  if (links.indexOf(src) >= 0)
    return links;
  if (asset != null && asset.imports)
    for (let $8 = 0, $9 = iter$__(asset == null ? void 0 : asset.imports), $10 = $9.length; $8 < $10; $8++) {
      let item = $9[$8];
      links.push(item), deepImports(item, links, depth + 1);
    }
  return links;
}
var _AssetResponder = class {
  constructor(server, url, asset = {}) {
    this.server = server, this.url = url, [this.pathname, this.query] = url.split("?"), this.ext = import_path.default.extname(this.pathname), this.headers = {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "cache-control": "public, max-age=31536000"
    }, Object.assign(this.headers, defaultHeaders[this.ext.slice(1)] || {}), this.headers["max-age"] = 864e5, asset.imports && (this.headers.Link = deepImports(url).map(function(_0) {
      return "<" + _0 + ">; rel=modulepreload; as=script";
    }).join(", ")), this.path = server.localPathForUrl(url);
  }
  respond(req, res) {
    var self = this;
    return import_fs.default.access(this.path, import_fs.default.constants.R_OK, function(err) {
      if (err)
        return res.writeHead(404, {}), res.end();
      try {
        if (globalThis.BUN)
          return import_fs.default.readFile(self.path, function(err2, data) {
            return res.writeHead(200, self.headers), res.end(data);
          });
        {
          let stream = import_fs.default.createReadStream(self.path);
          return res.writeHead(200, self.headers), stream.pipe(res);
        }
      } catch {
        return res.writeHead(503, {}), res.end();
      }
    });
  }
  createReadStream() {
    return import_fs.default.createReadStream(this.path);
  }
  pipe(response) {
    return this.createReadStream().pipe(response);
  }
}, AssetResponder = _AssetResponder;
(() => {
  defineName$__(_AssetResponder, "AssetResponder");
})();
var _Server = class {
  static wrap(server, o = {}) {
    return new this(server, o);
  }
  localPathForUrl(url) {
    var _a2;
    let path, res, src = url.replace(/\?.*$/, "");
    return (_a2 = this.urlToLocalPathMap)[src] ?? (_a2[src] = (path = import_path.default.resolve(this.publicPath, "." + src), res = import_fs.default.existsSync(path) && path, !res && this.staticDir && (path = import_path.default.resolve(this.staticDir, "." + src), res = import_fs.default.existsSync(path) && path), res));
  }
  headersForAsset(path) {
    let headers, ext = import_path.default.extname(path);
    return headers = Object.assign({
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "cache-control": "public"
    }, defaultHeaders[ext.slice(1)] || {});
  }
  get manifest() {
    return globalThis.IMBA_MANIFEST || {};
  }
  constructor(srv, options) {
    var self = this;
    servers.add(this), this.id = Math.random(), this.options = options, this.closed = !1, this.paused = !1, this.server = srv, this.clients = /* @__PURE__ */ new Set(), this.stalledResponses = [], this.assetResponders = {}, this.urlToLocalPathMap = {}, this.publicExistsMap = {};
    try {
      this.rootDir = proc.env.IMBA_OUTDIR || import_path.default.dirname(proc.env.pm_exec_path || proc.argv[1]);
    } catch {
    }
    try {
      this.publicPath = import_path.default.resolve(this.rootDir, proc.env.IMBA_PUBDIR || globalThis.IMBA_PUBDIR || "public");
    } catch {
    }
    this.staticDir = globalThis.IMBA_STATICDIR || "", proc.env.IMBA_PATH && (this.devtoolsPath = import_path.default.resolve(proc.env.IMBA_PATH, "dist", "hmr.js")), this.scheme = srv instanceof import_http.default.Server ? "http" : "https";
    let originalHandler = this.server._events.request, dom = globalThis[$dom$];
    srv.off("request", originalHandler), originalHandler[$server$] = this, srv.on("listening", function() {
      let adr = self.server.address(), host = adr.address;
      (host == "::" || host == "0.0.0.0") && (host = "localhost");
      let url = "" + self.scheme + "://" + host + ":" + adr.port + "/";
      if (!proc.env.IMBA_CLUSTER)
        return console.log("listening on " + url);
    }), this.handler = function(req, res) {
      var _a2;
      let path, ishttp2 = req.constructor.name == "Http2ServerRequest", url = req.url;
      if (self.paused || self.closed)
        return res.statusCode = 302, res.setHeader("Location", req.url), ishttp2 || res.setHeader("Connection", "close"), self.closed ? (ishttp2 && req.stream.session.close(), res.end()) : self.stalledResponses.push(res);
      let headers = req.headers, base;
      ishttp2 ? base = headers[":scheme"] + "://" + headers[":authority"] : base = (req.connection.encrypted ? "https" : "http") + "://" + headers.host;
      let asset = self.manifest[url];
      if (asset && self.localPathForUrl(url))
        return ((_a2 = self.assetResponders)[url] || (_a2[url] = new AssetResponder(self, url, asset))).respond(req, res);
      if ((url.match(/\.[A-Z\d]{8}\./) || url.match(/\.\w{1,4}($|\?)/)) && (path = self.localPathForUrl(url)))
        try {
          let headers2 = self.headersForAsset(path);
          if (globalThis.BUN)
            return import_fs.default.readFile(path, function(err, data) {
              return err ? (res.writeHead(500, {}), res.write("Error getting the file: " + err)) : (res.writeHead(200, headers2), res.end(data));
            });
          {
            let stream = import_fs.default.createReadStream(path);
            return res.writeHead(200, headers2), stream.pipe(res);
          }
        } catch {
          return res.writeHead(503, {}), res.end();
        }
      if (dom) {
        let loc = new dom.Location(req.url, base);
        return dom.Document.create({ location: loc }, function() {
          return originalHandler(req, res);
        });
      } else
        return originalHandler(req, res);
    }, srv.on("request", this.handler), srv.on("close", function() {
      return console.log("server is closing!!!");
    });
  }
  broadcast(event, data = {}, clients = this.clients) {
    data = JSON.stringify(data);
    let msg = "data: " + data + `


`;
    for (let client of iter$__(clients))
      client.write("event: " + event + `
`), client.write(`id: imba
`), client.write(msg);
    return this;
  }
  pause() {
    return this.paused != !0 && (this.paused = !0, !0) && this.broadcast("paused"), this;
  }
  resume() {
    if (this.paused != !1 && (this.paused = !1, !0))
      return this.broadcast("resumed"), this.flushStalledResponses();
  }
  flushStalledResponses() {
    for (let $11 = 0, $12 = iter$__(this.stalledResponses), $13 = $12.length; $11 < $13; $11++)
      $12[$11].end();
    return this.stalledResponses = [];
  }
  close() {
    var self = this;
    return this.pause(), new Promise(function(resolve) {
      return self.closed = !0, self.server.close(resolve), self.flushStalledResponses();
    });
  }
}, Server = _Server;
(() => {
  defineName$__(_Server, "Server");
})();
function serve(srv, ...params) {
  return Server.wrap(srv, ...params);
}

// server.imba
var import_fastify = __toESM(require("fastify")), fastify = (0, import_fastify.default)();
fastify.get("/", function() {
  return "Hello World";
});
serve(fastify.listen({ port: 3e3 }, function(err, address) {
  return console.log(address);
}));
//__FOOT__
