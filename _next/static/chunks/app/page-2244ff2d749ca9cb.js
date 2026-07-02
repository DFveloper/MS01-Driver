(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    471: function (e, t, n) {
      var a = {
        "./cn/common.json": [2234, 234],
        "./en/common.json": [1249, 249],
      };
      function o(e) {
        if (!n.o(a, e))
          return Promise.resolve().then(function () {
            var t = Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          });
        var t = a[e],
          o = t[0];
        return n.e(t[1]).then(function () {
          return n.t(o, 19);
        });
      }
      ((o.keys = function () {
        return Object.keys(a);
      }),
        (o.id = 471),
        (e.exports = o));
    },
    6946: function (e, t, n) {
      Promise.resolve().then(n.bind(n, 8536));
    },
    8536: function (e, t, n) {
      "use strict";
      (n.r(t),
        n.d(t, {
          default: function () {
            return e$;
          },
        }));
      var a = n(7437),
        o = n(2265);
      let c = {},
        s = {},
        d = (e) => () =>
          Promise.race([
            new Promise((t, n) => {
              e((e, a) => {
                e ? n(e) : t(a);
              });
            }),
            new Promise((e, t) => {
              setTimeout(() => {
                e([]);
              }, 500);
            }),
          ]),
        l = (e) =>
          e.filter((e) => {
            var t;
            return null === (t = e.collections) || void 0 === t
              ? void 0
              : t.some((e) => 16 === e.usage && 65281 === e.usagePage);
          }),
        i = () =>
          (self.crypto && self.crypto.randomUUID && self.crypto.randomUUID()) ||
          "path:".concat(Math.random()),
        r = (e) => {
          var t, n;
          let a = e._address || i();
          e._address = a;
          let o = {
            _device: e,
            interface: 1,
            vendorId: null !== (t = e.vendorId) && void 0 !== t ? t : -1,
            productId: null !== (n = e.productId) && void 0 !== n ? n : -1,
            address: a,
            productName: e.productName,
          };
          return (m.hid_cache[a] = o);
        },
        m = {
          hid_cache: {},
          requestDevice: async function () {
            let e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : [],
              t = await navigator.hid.requestDevice({ filters: e });
            return (t.forEach(r), t.sort((e, t) => e.vendorId - t.vendorId)[0]);
          },
          getFilteredDevices: async () => {
            try {
              return l(await navigator.hid.getDevices());
            } catch (e) {
              return [];
            }
          },
          devices: async function () {
            let e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : [],
              n = await m.getFilteredDevices();
            if (0 === n.length || e) {
              try {
                await m.requestDevice(t);
              } catch (e) {
                return [];
              }
              n = await m.getFilteredDevices();
            }
            return n.map(r);
          },
        };
      class u {
        async open() {
          if (this._hidDevice && !this._hidDevice._device.opened) {
            ((this.openPromise = this._hidDevice._device.open()),
              this.setupListeners());
            try {
              await this.openPromise;
            } catch (e) {
              console.log(e);
            }
          }
          return Promise.resolve();
        }
        addListeners(e) {
          this._hidDevice && (this._hidDevice._device.oninputreport = e);
        }
        setupListeners() {
          this._hidDevice &&
            this._hidDevice._device.addEventListener("inputreport", (e) => {
              0 !== s[this.address].length
                ? s[this.address].shift()(new Uint8Array(e.data.buffer))
                : c[this.address].push({
                    currTime: Date.now(),
                    message: new Uint8Array(e.data.buffer),
                  });
            });
        }
        read(e) {
          if (
            ((s[this.address] = []),
            this.fastForwardGlobalBuffer(Date.now()),
            c[this.address].length > 0)
          ) {
            var t;
            e(
              void 0,
              null === (t = c[this.address].shift()) || void 0 === t
                ? void 0
                : t.message,
            );
          } else s[this.address].push((t) => e(void 0, t));
        }
        fastForwardGlobalBuffer(e) {
          let t = c[this.address].length;
          for (; t; )
            if ((t--, c[this.address][0].currTime < e)) c[this.address].shift();
            else break;
        }
        async hid_write(e) {
          var t;
          await this.openPromise;
          let n = new Uint8Array(e.slice(1));
          await (null === (t = this._hidDevice) || void 0 === t
            ? void 0
            : t._device.sendReport(e[0], n));
        }
        async hid_send_feature_report(e, t) {
          var n, a;
          await this.openPromise;
          let o = new Uint8Array(t.slice(1));
          return (
            await (null === (n = this._hidDevice) || void 0 === n
              ? void 0
              : n._device.sendFeatureReport(e, o)),
            await (null === (a = this._hidDevice) || void 0 === a
              ? void 0
              : a._device.receiveFeatureReport(e))
          );
        }
        async hid_get_feature_report(e, t) {
          var n;
          return (
            await this.openPromise,
            new Uint8Array(t.slice(1)),
            await (null === (n = this._hidDevice) || void 0 === n
              ? void 0
              : n._device.receiveFeatureReport(e))
          );
        }
        constructor(e) {
          if (
            ((this.interface = -1),
            (this.vendorId = -1),
            (this.productId = -1),
            (this.productName = ""),
            (this.address = ""),
            (this.openPromise = Promise.resolve()),
            (this.readP = d((e) => this.read(e))),
            "demo" == e)
          ) {
            ((this.vendorId = 39578),
              (this.productId = 47802),
              (this.productName = "Test"));
            return;
          }
          ((this._hidDevice = m.hid_cache[e]),
            this._hidDevice &&
              ((this.vendorId = this._hidDevice.vendorId),
              (this.productId = this._hidDevice.productId),
              (this.address = this._hidDevice.address),
              (this.interface = this._hidDevice.interface),
              (this.productName = this._hidDevice.productName),
              (c[this.address] = c[this.address] || []),
              (s[this.address] = s[this.address] || []),
              this._hidDevice._device.opened || this.open()));
        }
      }
      let h = {},
        p = {},
        x = (e) => {
          let [t, n] = e;
          return (n << 8) | t;
        },
        C = (e) => [255 & e, e >> 8],
        _ = (e) => 255 & e,
        g = (e) => e >> 8,
        v = (e) => new u(e);
      class f {
        getVendorIdId() {
          return this.getHID().vendorId;
        }
        getProductId() {
          return this.getHID().productId;
        }
        getConnectMode() {
          return 43172 == this.getVendorIdId() ? "USB" : "2.4G";
        }
        refresh(e) {
          ((this.address = e), (h[e] = { hid: v(e) }));
        }
        get commandQueueWrapper() {
          return (
            p[this.address] ||
              (p[this.address] = { isFlushing: !1, commandQueue: [] }),
            p[this.address]
          );
        }
        async timeout(e) {
          return new Promise((t, n) => {
            (this.commandQueueWrapper.commandQueue.push({
              res: t,
              rej: n,
              args: () =>
                new Promise((n) =>
                  setTimeout(() => {
                    (n(), t(void 0));
                  }, e),
                ),
            }),
              this.commandQueueWrapper.isFlushing || this.flushQueue());
          });
        }
        async getDeviceData() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return new Promise((t, n) => {
            (this.commandQueueWrapper.commandQueue.push({
              res: t,
              rej: n,
              args: ["get", e],
            }),
              this.commandQueueWrapper.isFlushing || this.flushQueue());
          });
        }
        async sendDeviceData() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return new Promise((t, n) => {
            (this.commandQueueWrapper.commandQueue.push({
              res: t,
              rej: n,
              args: ["get", e],
            }),
              this.commandQueueWrapper.isFlushing || this.flushQueue());
          });
        }
        async flushQueue() {
          if (!0 !== this.commandQueueWrapper.isFlushing) {
            for (
              this.commandQueueWrapper.isFlushing = !0;
              0 !== this.commandQueueWrapper.commandQueue.length;
            ) {
              let {
                res: e,
                rej: t,
                args: n,
              } = this.commandQueueWrapper.commandQueue.shift();
              if ("function" == typeof n) (await n(), e());
              else if ("send_report" == n[0])
                try {
                  let [t, ...a] = n,
                    o = await this.webhid_send_report(...a);
                  e(o);
                } catch (e) {
                  t(e);
                }
              else
                try {
                  let [t, ...a] = n,
                    o = await this.webhid_write_command(...a);
                  e(o);
                } catch (e) {
                  t(e);
                }
            }
            this.commandQueueWrapper.isFlushing = !1;
          }
        }
        getHID() {
          return h[this.address].hid;
        }
        async webhid_read_command() {
          return this.getHID().readP();
        }
        async webhid_write_command() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t = [...e],
            n = Array(65).fill(0);
          t.forEach((e, t) => {
            n[t] = e;
          });
          try {
            await this.getHID().hid_write(n);
          } catch (e) {
            console.log(e);
          }
          let a = Array.from(await this.webhid_read_command());
          return (
            console.debug(
              "Command for ".concat(this.address),
              t,
              "Correct Resp:",
              a,
            ),
            a
          );
        }
        async webhid_send_command() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t = [...e],
            n = Array(65).fill(0);
          return (
            t.forEach((e, t) => {
              n[t] = e;
            }),
            await this.getHID().hid_write(n),
            "success"
          );
        }
        async webhid_send_report() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t = e[0],
            n = 1e3;
          (82 == t && (n = 64), 81 == t && (n = 20));
          let a = [...e],
            o = Array(n).fill(0);
          a.forEach((e, t) => {
            o[t] = e;
          });
          let c = await this.getHID().send(t, o);
          return (console.debug("Command for ".concat(this.address), a, c), c);
        }
        async sendReport() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return new Promise((t, n) => {
            (this.commandQueueWrapper.commandQueue.push({
              res: t,
              rej: n,
              args: ["send_report", e],
            }),
              this.commandQueueWrapper.isFlushing || this.flushQueue());
          });
        }
        constructor(e) {
          if (((this.test = !1), (this.address = e), "demo" == e))
            ((this.test = !0), (h[e] = { hid: new u(e) }));
          else if (!h[e]) {
            let t = v(e);
            h[e] = { hid: t };
          }
        }
      }
      let y = async function () {
        let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t = await m.devices(!1, e);
        if ((console.log("devices", t), t.length > 0))
          return new K(new f(t[0].address));
      };
      class K {
        addListeners() {
          this.api.getHID().addListeners((e) => {
            let t = {},
              n = new Uint8Array(e.data.buffer);
            if (170 == n[0] && 250 == n[1]) {
              if (208 == n[8]) {
                t = { battery: n[9], charge_flag: n[10] };
                let e = this.onListeners.find((e) => "battery" == e.name);
                e && e.fb(t);
              } else {
                t = { dpi: n[9] - 1, reportRate: n[10] - 1 };
                let e = this.onListeners.find((e) => "statu" == e.name);
                e && e.fb(t);
              }
            }
            if (19 == n[0] && 226 == n[1]) {
              let e = this.onListeners.find((e) => "match" == e.name);
              e && e.fb(t);
            }
          });
        }
        async loadDefaultConfig() {
          return await n.e(968).then(n.t.bind(n, 3968, 19));
        }
        async getConnectMode() {
          return this.api.getConnectMode();
        }
        async getBatteryInfo() {
          let e = Array(65).fill(0);
          ((e[0] = 0),
            (e[1] = 85),
            (e[2] = 48),
            (e[3] = 165),
            (e[4] = 11),
            (e[5] = 46),
            (e[6] = 1),
            (e[7] = 1),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 0));
          let t = await this.api.sendDeviceData(e);
          return { battery_value: t[8], charge_flag: t[9] };
        }
        async setLightMode(e) {
          let t = Array(65).fill(0);
          ((t[0] = 0),
            (t[1] = 85),
            (t[2] = 33),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 3),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 0),
            (t[11] = e),
            await this.api.sendDeviceData(t));
        }
        async getMouseKeys() {
          let e = Array(65).fill(0);
          ((e[0] = 0),
            (e[1] = 85),
            (e[2] = 8),
            (e[3] = 165),
            (e[4] = 11),
            (e[5] = 32),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 0));
          let t = (await this.api.sendDeviceData(e)).slice(8),
            n = [];
          for (let e = 0; e < 8; e++)
            n.push({
              type: t[4 * e],
              code1: t[4 * e + 1],
              code2: t[4 * e + 2],
              code3: t[4 * e + 3],
            });
          return n;
        }
        async getMouseConfigInfo() {
          let e = Array(65).fill(0);
          ((e[0] = 0),
            (e[1] = 85),
            (e[2] = 14),
            (e[3] = 165),
            (e[4] = 11),
            (e[5] = 47),
            (e[6] = 1),
            (e[7] = 1),
            (e[8] = 0),
            (e[9] = 0),
            (e[10] = 0));
          let t = await this.api.sendDeviceData(e);
          return (0 == t[13] && 0 == t[14] && 0 == t[15]) ||
            (255 == t[13] && 255 == t[14] && 255 == t[15])
            ? {
                light_mode: 2,
                report_rate: 3,
                dpi_index: 2,
                dpi_flag: 5,
                dpi_count: 5,
                dpi1_value: 1200,
                dpi2_value: 1600,
                dpi3_value: 2400,
                dpi4_value: 3200,
                dpi5_value: 6400,
                dpi6_value: 24000,
                scroll_flag: 0,
                lod_value: 1,
                sensor_flag: 53,
                key_respond: 2,
                sleep_light: 10,
                highspeed_mode: 0,
                wakeup_flag: 1,
                move_light_flag: 1,
              }
            : {
                light_mode: t[9],
                report_rate: t[10] - 1,
                dpi_index: t[12] - 1,
                dpi_flag: t[11],
                dpi_count: t[11],
                dpi1_value: x([t[13], t[14]]),
                dpi2_value: x([t[15], t[16]]),
                dpi3_value: x([t[17], t[18]]),
                dpi4_value: x([t[19], t[20]]),
                dpi5_value: x([t[21], t[22]]),
                dpi6_value: x([t[23], t[24]]),
                scroll_flag: t[48],
                lod_value: t[49],
                sensor_flag: t[50],
                key_respond: t[51],
                sleep_light: t[52],
                highspeed_mode: t[53],
                wakeup_flag: 15 & t[55],
                move_light_flag: (t[55] >> 4) & 15,
              };
        }
        async setMouseKeys(e) {
          let t = Array(64).fill(0);
          ((t[0] = 0),
            (t[1] = 85),
            (t[2] = 9),
            (t[3] = 165),
            (t[4] = 34),
            (t[5] = 32),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 32),
            (t[10] = 1),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 32),
            (t[14] = 2),
            (t[15] = 0),
            (t[16] = 0),
            (t[17] = 32),
            (t[18] = 4),
            (t[19] = 0),
            (t[20] = 0),
            (t[21] = 32),
            (t[22] = 8),
            (t[23] = 0),
            (t[24] = 0),
            (t[25] = 32),
            (t[26] = 16),
            (t[27] = 0),
            (t[28] = 0),
            (t[29] = 33),
            (t[30] = 85),
            (t[31] = 0),
            (t[32] = 0),
            (t[33] = 33),
            (t[34] = 56),
            (t[35] = 1),
            (t[36] = 0),
            (t[37] = 33),
            (t[38] = 56),
            (t[39] = 255),
            (t[40] = 0));
          for (let n = 0; n < 8; n++)
            ((t[4 * n + 0 + 9] = e[n].type),
              (t[4 * n + 1 + 9] = e[n].code1),
              (t[4 * n + 2 + 9] = e[n].code2),
              (t[4 * n + 3 + 9] = e[n].code3));
          (console.log(t), await this.api.sendDeviceData(t));
        }
        async resetAllMouseKeys() {
          let e = Array(64).fill(0);
          ((e[0] = 0),
            (e[1] = 85),
            (e[2] = 9),
            (e[3] = 165),
            (e[4] = 34),
            (e[5] = 32),
            (e[6] = 0),
            (e[7] = 0),
            (e[8] = 0),
            (e[9] = 32),
            (e[10] = 1),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 32),
            (e[14] = 2),
            (e[15] = 0),
            (e[16] = 0),
            (e[17] = 32),
            (e[18] = 4),
            (e[19] = 0),
            (e[20] = 0),
            (e[21] = 32),
            (e[22] = 8),
            (e[23] = 0),
            (e[24] = 0),
            (e[25] = 32),
            (e[26] = 16),
            (e[27] = 0),
            (e[28] = 0),
            (e[29] = 33),
            (e[30] = 85),
            (e[31] = 0),
            (e[32] = 0),
            (e[33] = 33),
            (e[34] = 56),
            (e[35] = 1),
            (e[36] = 0),
            (e[37] = 33),
            (e[38] = 56),
            (e[39] = 255),
            (e[40] = 0),
            await this.api.sendDeviceData(e));
        }
        async setMouseConfigData(e) {
          let t = Array(65).fill(0);
          ((t[0] = 0),
            (t[1] = 85),
            (t[2] = 15),
            (t[3] = 174),
            (t[4] = 10),
            (t[5] = 47),
            (t[6] = 1),
            (t[7] = 1),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 0),
            (t[11] = e.report_rate + 1),
            (t[12] = e.dpi_count),
            (t[13] = e.dpi_index + 1),
            (t[14] = _(e.dpi1_value)),
            (t[15] = g(e.dpi1_value)),
            (t[16] = _(e.dpi2_value)),
            (t[17] = g(e.dpi2_value)),
            (t[18] = _(e.dpi3_value)),
            (t[19] = g(e.dpi3_value)),
            (t[20] = _(e.dpi4_value)),
            (t[21] = g(e.dpi4_value)),
            (t[22] = _(e.dpi5_value)),
            (t[23] = g(e.dpi5_value)),
            (t[24] = _(e.dpi6_value)),
            (t[25] = g(e.dpi6_value)),
            (t[49] = e.scroll_flag),
            (t[50] = e.lod_value),
            (t[51] = e.sensor_flag),
            (t[52] = e.key_respond),
            (t[53] = e.sleep_light),
            (t[54] = e.highspeed_mode),
            (t[55] = (e.wakeup_flag << 4) | e.move_light_flag),
            console.log(t),
            await this.api.sendDeviceData(t));
        }
        async getMacroData() {
          let e = [];
          for (let t = 0; t < 4096; t += 56) {
            let n = Math.min(4096 - t, 56);
            (console.log(n),
              e.push(this.api.getDeviceData([6, 12, n, ...C(t)])));
          }
          return (await Promise.all(e))
            .flatMap((e) => e.slice(8))
            .slice(0, 4096);
        }
        async setMacroData(e) {
          let t = e.length;
          for (let n = 0; n < t; n += 56) {
            let a = e.slice(n, Math.min(n + 56, t));
            await this.api.sendDeviceData([
              0,
              85,
              13,
              0,
              0,
              a.length,
              ...C(n),
              0,
              ...a,
            ]);
          }
          await this.api.sendDeviceData([0, 85, 16, 165, 34, 0, 0, 0, 5]);
        }
        async resetMacroData() {
          await this.api.sendDeviceData([6, 15, 4]);
        }
        async restoreFactorySettings() {}
        constructor(e) {
          ((this.demoMode = !1),
            (this.vendorId = 0),
            (this.productId = 0),
            (this.productName = "Test Mouse"),
            (this.onListeners = []),
            (this.mode = "usb"),
            (this.api = e));
          let t = this.api.getHID();
          ((this.vendorId = t.vendorId),
            (this.productId = t.productId),
            (this.productName = t.productName),
            this.addListeners());
        }
      }
      var j = JSON.parse(
          '{"B":{"p":[{"type":"mouse","lang":"101","keycodes":[{"name":"Left click","code":"KC_MOUSE","lang":"102","type":32,"code1":1,"code2":0,"code3":0},{"name":"Right click","code":"KC_MOUSE","lang":"104","type":32,"code1":2,"code2":0,"code3":0},{"name":"Middle click","code":"KC_MOUSE","lang":"105","type":32,"code1":4,"code2":0,"code3":0},{"name":"Forward","code":"KC_MOUSE","lang":"106","type":32,"code1":16,"code2":0,"code3":0},{"name":"Backward","code":"KC_MOUSE","lang":"107","type":32,"code1":8,"code2":0,"code3":0},{"name":"Scroll Up","code":"KC_MOUSE","lang":"108","type":33,"code1":56,"code2":1,"code3":0},{"name":"Scroll down","code":"KC_MOUSE","lang":"109","type":33,"code1":56,"code2":255,"code3":0},{"name":"DPI Loop +","code":"KC_MOUSE","lang":"110","type":33,"code1":85,"code2":0,"code3":0},{"name":"Disable","code":"KC_MOUSE","lang":"123","type":32,"code1":0,"code2":0,"code3":0}]},{"type":"media","lang":"124","keycodes":[{"name":"Volume +","code":"KC_VOLD","lang":"126","type":48,"code1":233,"code2":0,"code3":0},{"name":"Volume -","code":"KC_VOLU","lang":"127","type":48,"code1":234,"code2":0,"code3":0},{"name":"Mute","code":"KC_MUTE","lang":"128","type":48,"code1":226,"code2":0,"code3":0},{"name":"Play/Pause","code":"KC_MPLY","lang":"129","type":48,"code1":205,"code2":0,"code3":0},{"name":"Stop","code":"KC_MSTP","lang":"130","type":48,"code1":183,"code2":0,"code3":0},{"name":"Prev Track","code":"KC_MPRV","lang":"131","type":48,"code1":182,"code2":0,"code3":0},{"name":"Next Track","code":"KC_MNXT","lang":"132","type":48,"code1":181,"code2":0,"code3":0},{"name":"Multimedia","code":"KC_MNXT","lang":"133","type":48,"code1":131,"code2":1,"code3":0},{"name":"Homepage","code":"KC_MNXT","lang":"134","type":48,"code1":35,"code2":2,"code3":0},{"name":"Web-Refresh","code":"KC_MNXT","lang":"135","type":48,"code1":39,"code2":2,"code3":0},{"name":"Web-Stop","code":"KC_MNXT","lang":"136","type":48,"code1":38,"code2":2,"code3":0},{"name":"Web-Forward","code":"KC_MNXT","lang":"137","type":48,"code1":37,"code2":2,"code3":0},{"name":"Web-Backward","code":"KC_MNXT","lang":"138","type":48,"code1":36,"code2":2,"code3":0},{"name":"Web-Favorites","code":"KC_MNXT","lang":"139","type":48,"code1":42,"code2":2,"code3":0},{"name":"Web-Search","code":"KC_MNXT","lang":"140","type":48,"code1":33,"code2":2,"code3":0},{"name":"Calculator","code":"KC_MNXT","lang":"141","type":48,"code1":146,"code2":1,"code3":0},{"name":"My Computer","code":"KC_MNXT","lang":"142","type":48,"code1":148,"code2":1,"code3":0},{"name":"Mail","code":"KC_MNXT","lang":"143","type":48,"code1":138,"code2":1,"code3":0}]}]}}',
        ),
        w = n(1505),
        N = n(2635),
        S = n(4457),
        b = n(5350),
        M = n(4870);
      let D = ["cn", "cn", "en"],
        k = "common",
        F = "i18next";
      function L(e, t) {
        let [n, a] = (0, S.fP)([F]),
          c = (0, N.$G)(e, t),
          { i18n: s } = c;
        return (
          (0, o.useEffect)(() => {
            s.changeLanguage((null == n ? void 0 : n.i18next) || "cn");
          }, [n, s]),
          {
            ...c,
            changeLanguage: (e) => {
              (s.changeLanguage(e), a(F, e, { path: "/" }));
            },
          }
        );
      }
      w.ZP.use(N.Db)
        .use((0, b.Z)((e, t) => n(471)("./".concat(e, "/").concat(t, ".json"))))
        .init({
          ...(function () {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            let e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : k;
            return (
              (0, M.getCookie)("i18next"),
              {
                supportedLngs: D,
                fallbackLng: "cn",
                lng: "cn",
                fallbackNS: k,
                defaultNS: k,
                ns: e,
              }
            );
          })(),
          lng: void 0,
        });
      var P = JSON.parse(
        '{"V":[{"name":"Esc","code":"KC_ESC","type":16,"code1":0,"code2":41,"code3":0},{"name":"F1","code":"KC_F1","type":16,"code1":0,"code2":58,"code3":0},{"name":"F2","code":"KC_F2","type":16,"code1":0,"code2":59,"code3":0},{"name":"F3","code":"KC_F3","type":16,"code1":0,"code2":60,"code3":0},{"name":"F4","code":"KC_F4","type":16,"code1":0,"code2":61,"code3":0},{"name":"F5","code":"KC_F5","type":16,"code1":0,"code2":62,"code3":0},{"name":"F6","code":"KC_F6","type":16,"code1":0,"code2":63,"code3":0},{"name":"F7","code":"KC_F7","type":16,"code1":0,"code2":64,"code3":0},{"name":"F8","code":"KC_F8","type":16,"code1":0,"code2":65,"code3":0},{"name":"F9","code":"KC_F9","type":16,"code1":0,"code2":66,"code3":0},{"name":"F10","code":"KC_F10","type":16,"code1":0,"code2":67,"code3":0},{"name":"F11","code":"KC_F11","type":16,"code1":0,"code2":68,"code3":0},{"name":"F12","code":"KC_F12","type":16,"code1":0,"code2":69,"code3":0},{"name":"Print","code":"KC_PSCR","type":16,"code1":0,"code2":70,"code3":0},{"name":"Scroll","code":"KC_SLCK","type":16,"code1":0,"code2":71,"code3":0},{"name":"Pause","code":"KC_PAUS","type":16,"code1":0,"code2":72,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":"~\\n`","code":"KC_GRV","type":16,"code1":0,"code2":53,"code3":0},{"name":"!\\n1","code":"KC_1","type":16,"code1":0,"code2":30,"code3":0},{"name":"@\\n2","code":"KC_2","type":16,"code1":0,"code2":31,"code3":0},{"name":"#\\n3","code":"KC_3","type":16,"code1":0,"code2":32,"code3":0},{"name":"$\\n4","code":"KC_4","type":16,"code1":0,"code2":33,"code3":0},{"name":"%\\n5","code":"KC_5","type":16,"code1":0,"code2":34,"code3":0},{"name":"^\\n6","code":"KC_6","type":16,"code1":0,"code2":35,"code3":0},{"name":"&\\n7","code":"KC_7","type":16,"code1":0,"code2":36,"code3":0},{"name":"*\\n8","code":"KC_8","type":16,"code1":0,"code2":37,"code3":0},{"name":"(\\n9","code":"KC_9","type":16,"code1":0,"code2":38,"code3":0},{"name":")\\n0","code":"KC_0","type":16,"code1":0,"code2":39,"code3":0},{"name":"_\\n-","code":"KC_MINS","type":16,"code1":0,"code2":45,"code3":0},{"name":"+\\n=","code":"KC_EQL","type":16,"code1":0,"code2":46,"code3":0},{"name":"Bksp","code":"KC_BSPC","type":16,"code1":0,"code2":42,"code3":0},{"name":"Ins","code":"KC_INS","type":16,"code1":0,"code2":73,"code3":0},{"name":"Del","code":"KC_DEL","type":16,"code1":0,"code2":76,"code3":0},{"name":"Home","code":"KC_HOME","type":16,"code1":0,"code2":74,"code3":0},{"name":"Num\\nLock","code":"KC_NLCK","type":16,"code1":0,"code2":83,"code3":0},{"name":"Num /","code":"KC_PSLS","type":16,"code1":0,"code2":84,"code3":0},{"name":"Num *","code":"KC_PAST","type":16,"code1":0,"code2":85,"code3":0},{"name":"Num -","code":"KC_PMNS","type":16,"code1":0,"code2":86,"code3":0},{"name":"Tab","code":"KC_TAB","type":16,"code1":0,"code2":43,"code3":0},{"name":"Q","code":"KC_Q","type":16,"code1":0,"code2":20,"code3":0},{"name":"W","code":"KC_W","type":16,"code1":0,"code2":26,"code3":0},{"name":"E","code":"KC_E","type":16,"code1":0,"code2":8,"code3":0},{"name":"R","code":"KC_R","type":16,"code1":0,"code2":21,"code3":0},{"name":"T","code":"KC_T","type":16,"code1":0,"code2":23,"code3":0},{"name":"Y","code":"KC_Y","type":16,"code1":0,"code2":28,"code3":0},{"name":"U","code":"KC_U","type":16,"code1":0,"code2":24,"code3":0},{"name":"I","code":"KC_I","type":16,"code1":0,"code2":12,"code3":0},{"name":"O","code":"KC_O","type":16,"code1":0,"code2":18,"code3":0},{"name":"P","code":"KC_P","type":16,"code1":0,"code2":19,"code3":0},{"name":"{\\n[","code":"KC_LBRC","type":16,"code1":0,"code2":47,"code3":0},{"name":"}\\n]","code":"KC_RBRC","type":16,"code1":0,"code2":48,"code3":0},{"name":"|\\n\\\\","code":"KC_BSLS","type":16,"code1":0,"code2":49,"code3":0},{"name":"End","code":"KC_END","type":16,"code1":0,"code2":77,"code3":0},{"name":"PgUp","code":"KC_PGUP","type":16,"code1":0,"code2":75,"code3":0},{"name":"PgDn","code":"KC_PGDN","type":16,"code1":0,"code2":78,"code3":0},{"name":"Num 7","code":"KC_P7","type":16,"code1":0,"code2":95,"code3":0},{"name":"Num 8","code":"KC_P8","type":16,"code1":0,"code2":96,"code3":0},{"name":"Num 9","code":"KC_P9","type":16,"code1":0,"code2":97,"code3":0},{"name":"Num +","code":"KC_PPLS","type":16,"code1":0,"code2":87,"code3":0},{"name":"Caps","code":"KC_CAPS","type":16,"code1":0,"code2":57,"code3":0},{"name":"A","code":"KC_A","type":16,"code1":0,"code2":4,"code3":0},{"name":"S","code":"KC_S","type":16,"code1":0,"code2":22,"code3":0},{"name":"D","code":"KC_D","type":16,"code1":0,"code2":7,"code3":0},{"name":"F","code":"KC_F","type":16,"code1":0,"code2":9,"code3":0},{"name":"G","code":"KC_G","type":16,"code1":0,"code2":10,"code3":0},{"name":"H","code":"KC_H","type":16,"code1":0,"code2":11,"code3":0},{"name":"J","code":"KC_J","type":16,"code1":0,"code2":13,"code3":0},{"name":"K","code":"KC_K","type":16,"code1":0,"code2":14,"code3":0},{"name":"L","code":"KC_L","type":16,"code1":0,"code2":15,"code3":0},{"name":":\\n;","code":"KC_SCLN","type":16,"code1":0,"code2":51,"code3":0},{"name":"\\"\\n\'","code":"KC_QUOT","type":16,"code1":0,"code2":52,"code3":0},{"name":"Enter","code":"KC_ENT","type":16,"code1":0,"code2":40,"code3":0},{"name":"Num 4","code":"KC_P4","type":16,"code1":0,"code2":92,"code3":0},{"name":"Num 5","code":"KC_P5","type":16,"code1":0,"code2":93,"code3":0},{"name":"Num 6","code":"KC_P6","type":16,"code1":0,"code2":94,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":"LShift","code":"KC_LSFT","type":16,"code1":2,"code2":0,"code3":0},{"name":"Z","code":"KC_Z","type":16,"code1":0,"code2":29,"code3":0},{"name":"X","code":"KC_X","type":16,"code1":0,"code2":27,"code3":0},{"name":"C","code":"KC_C","type":16,"code1":0,"code2":6,"code3":0},{"name":"V","code":"KC_V","type":16,"code1":0,"code2":25,"code3":0},{"name":"B","code":"KC_B","type":16,"code1":0,"code2":5,"code3":0},{"name":"N","code":"KC_N","type":16,"code1":0,"code2":17,"code3":0},{"name":"M","code":"KC_M","type":16,"code1":0,"code2":16,"code3":0},{"name":"<\\n,","code":"KC_COMM","type":16,"code1":0,"code2":54,"code3":0},{"name":">\\n.","code":"KC_DOT","type":16,"code1":0,"code2":55,"code3":0},{"name":"?\\n/","code":"KC_SLSH","type":16,"code1":0,"code2":56,"code3":0},{"name":"RShift","code":"KC_RSFT","type":16,"code1":32,"code2":0,"code3":0},{"name":"↑","code":"KC_UP","type":16,"code1":0,"code2":82,"code3":0},{"name":"Num 1","code":"KC_P1","type":16,"code1":0,"code2":89,"code3":0},{"name":"Num 2","code":"KC_P2","type":16,"code1":0,"code2":90,"code3":0},{"name":"Num 3","code":"KC_P3","type":16,"code1":0,"code2":91,"code3":0},{"name":"Num Enter","code":"KC_PENT","type":16,"code1":0,"code2":88,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":" ","code":"KC_NO","type":16,"code1":0,"code2":0,"code3":0},{"name":"LCtrl","code":"KC_LCTL","type":16,"code1":1,"code2":0,"code3":0},{"name":"LGUI","code":"KC_LGUI","type":16,"code1":8,"code2":0,"code3":0},{"name":"RAlt","code":"KC_LALT","type":16,"code1":4,"code2":0,"code3":0},{"name":"Space","code":"KC_SPC","type":16,"code1":0,"code2":44,"code3":0},{"name":"RAlt","code":"KC_RALT","type":16,"code1":64,"code2":0,"code3":0},{"name":"FN","code":"KC_FN","type":16,"code1":0,"code2":255,"code3":0},{"name":"Menu","code":"KC_APP","type":16,"code1":0,"code2":101,"code3":0},{"name":"RCtrl","code":"KC_RCTL","type":16,"code1":16,"code2":0,"code3":0},{"name":"←","code":"KC_LEFT","type":16,"code1":0,"code2":80,"code3":0},{"name":"↓","code":"KC_DOWN","type":16,"code1":0,"code2":81,"code3":0},{"name":"→","code":"KC_RGHT","type":16,"code1":0,"code2":79,"code3":0},{"name":"Num 0","code":"KC_P0","type":16,"code1":0,"code2":98,"code3":0},{"name":"Num .","code":"KC_PDOT","type":16,"code1":0,"code2":99,"code3":0},{"name":"Volume +","code":"KC_VOLD","lang":"126","type":48,"code1":233,"code2":0,"code3":0},{"name":"Volume -","code":"KC_VOLU","lang":"127","type":48,"code1":234,"code2":0,"code3":0},{"name":"Mute","code":"KC_MUTE","lang":"128","type":48,"code1":226,"code2":0,"code3":0},{"name":"Play/Pause","code":"KC_MPLY","lang":"129","type":48,"code1":205,"code2":0,"code3":0},{"name":"Stop","code":"KC_MSTP","lang":"130","type":48,"code1":183,"code2":0,"code3":0},{"name":"Prev Track","code":"KC_MPRV","lang":"131","type":48,"code1":182,"code2":0,"code3":0},{"name":"Next Track","code":"KC_MNXT","lang":"132","type":48,"code1":181,"code2":0,"code3":0},{"name":"Multimedia","code":"KC_MNXT","lang":"133","type":48,"code1":131,"code2":1,"code3":0},{"name":"Homepage","code":"KC_MNXT","lang":"134","type":48,"code1":35,"code2":2,"code3":0},{"name":"Web-Refresh","code":"KC_MNXT","lang":"135","type":48,"code1":39,"code2":2,"code3":0},{"name":"Web-Stop","code":"KC_MNXT","lang":"136","type":48,"code1":38,"code2":2,"code3":0},{"name":"Web-Forward","code":"KC_MNXT","lang":"137","type":48,"code1":37,"code2":2,"code3":0},{"name":"Web-Backward","code":"KC_MNXT","lang":"138","type":48,"code1":36,"code2":2,"code3":0},{"name":"Web-Favorites","code":"KC_MNXT","lang":"139","type":48,"code1":42,"code2":2,"code3":0},{"name":"Web-Search","code":"KC_MNXT","lang":"140","type":48,"code1":33,"code2":2,"code3":0},{"name":"Calculator","code":"KC_MNXT","lang":"141","type":48,"code1":146,"code2":1,"code3":0},{"name":"My Computer","code":"KC_MNXT","lang":"142","type":48,"code1":148,"code2":1,"code3":0},{"name":"Mail","code":"KC_MNXT","lang":"143","type":48,"code1":138,"code2":1,"code3":0},{"name":"Left Button","code":"L-BUTTON","lang":"102","type":16,"code1":1,"code2":0,"code3":0},{"name":"Middle Button","code":"M-BUTTON","lang":"105","type":16,"code1":4,"code2":0,"code3":0},{"name":"Right Button","code":"R-BUTTON","lang":"104","type":16,"code1":2,"code2":0,"code3":0},{"name":"Forward","code":"Forward","lang":"106","type":16,"code1":16,"code2":0,"code3":0},{"name":"Backward","code":"Backward","lang":"107","type":16,"code1":8,"code2":0,"code3":0},{"name":"Disable","code":"KC_MOUSE","lang":"123","type":16,"code1":0,"code2":0,"code3":0}]}',
      );
      let E = {
          KC_A: 4,
          KC_B: 5,
          KC_C: 6,
          KC_D: 7,
          KC_E: 8,
          KC_F: 9,
          KC_G: 10,
          KC_H: 11,
          KC_I: 12,
          KC_J: 13,
          KC_K: 14,
          KC_L: 15,
          KC_M: 16,
          KC_N: 17,
          KC_O: 18,
          KC_P: 19,
          KC_Q: 20,
          KC_R: 21,
          KC_S: 22,
          KC_T: 23,
          KC_U: 24,
          KC_V: 25,
          KC_W: 26,
          KC_X: 27,
          KC_Y: 28,
          KC_Z: 29,
          KC_1: 30,
          KC_2: 31,
          KC_3: 32,
          KC_4: 33,
          KC_5: 34,
          KC_6: 35,
          KC_7: 36,
          KC_8: 37,
          KC_9: 38,
          KC_0: 39,
          KC_ENT: 40,
          KC_ESC: 41,
          KC_BSPC: 42,
          KC_TAB: 43,
          KC_SPC: 44,
          KC_MINS: 45,
          KC_EQL: 46,
          KC_LBRC: 47,
          KC_RBRC: 48,
          KC_BSLS: 49,
          KC_SCLN: 51,
          KC_QUOT: 52,
          KC_GRV: 53,
          KC_COMM: 54,
          KC_DOT: 55,
          KC_SLSH: 56,
          KC_CAPS: 57,
          KC_F1: 58,
          KC_F2: 59,
          KC_F3: 60,
          KC_F4: 61,
          KC_F5: 62,
          KC_F6: 63,
          KC_F7: 64,
          KC_F8: 65,
          KC_F9: 66,
          KC_F10: 67,
          KC_F11: 68,
          KC_F12: 69,
          KC_PSCR: 70,
          KC_SLCK: 71,
          KC_PAUS: 72,
          KC_INS: 73,
          KC_HOME: 74,
          KC_PGUP: 75,
          KC_DEL: 76,
          KC_END: 77,
          KC_PGDN: 78,
          KC_RGHT: 79,
          KC_LEFT: 80,
          KC_DOWN: 81,
          KC_UP: 82,
          KC_NLCK: 83,
          KC_PSLS: 84,
          KC_PAST: 85,
          KC_PMNS: 86,
          KC_PPLS: 87,
          KC_PENT: 88,
          KC_P1: 89,
          KC_P2: 90,
          KC_P3: 91,
          KC_P4: 92,
          KC_P5: 93,
          KC_P6: 94,
          KC_P7: 95,
          KC_P8: 96,
          KC_P9: 97,
          KC_P0: 98,
          KC_PDOT: 99,
          KC_APP: 101,
          KC_PEQL: 103,
          KC_F13: 104,
          KC_F14: 105,
          KC_F15: 106,
          KC_F16: 107,
          KC_F17: 108,
          KC_F18: 109,
          KC_F19: 110,
          KC_F20: 111,
          KC_F21: 112,
          KC_F22: 113,
          KC_F23: 114,
          KC_F24: 115,
          KC_HELP: 117,
          KC_RO: 135,
          KC_JYEN: 137,
          KC_MUTE: 168,
          KC_VOLU: 169,
          KC_VOLD: 170,
          KC_LCTL: 224,
          KC_LSFT: 225,
          KC_LALT: 226,
          KC_LGUI: 227,
          KC_RCTL: 228,
          KC_RSFT: 229,
          KC_RALT: 230,
          KC_RGUI: 231,
        },
        T = {
          Digit1: E.KC_1,
          Digit2: E.KC_2,
          Digit3: E.KC_3,
          Digit4: E.KC_4,
          Digit5: E.KC_5,
          Digit6: E.KC_6,
          Digit7: E.KC_7,
          Digit8: E.KC_8,
          Digit9: E.KC_9,
          Digit0: E.KC_0,
          KeyA: E.KC_A,
          KeyB: E.KC_B,
          KeyC: E.KC_C,
          KeyD: E.KC_D,
          KeyE: E.KC_E,
          KeyF: E.KC_F,
          KeyG: E.KC_G,
          KeyH: E.KC_H,
          KeyI: E.KC_I,
          KeyJ: E.KC_J,
          KeyK: E.KC_K,
          KeyL: E.KC_L,
          KeyM: E.KC_M,
          KeyN: E.KC_N,
          KeyO: E.KC_O,
          KeyP: E.KC_P,
          KeyQ: E.KC_Q,
          KeyR: E.KC_R,
          KeyS: E.KC_S,
          KeyT: E.KC_T,
          KeyU: E.KC_U,
          KeyV: E.KC_V,
          KeyW: E.KC_W,
          KeyX: E.KC_X,
          KeyY: E.KC_Y,
          KeyZ: E.KC_Z,
          Comma: E.KC_COMM,
          Period: E.KC_DOT,
          Semicolon: E.KC_SCLN,
          Quote: E.KC_QUOT,
          BracketLeft: E.KC_LBRC,
          BracketRight: E.KC_RBRC,
          Backspace: E.KC_BSPC,
          Backquote: E.KC_GRV,
          Slash: E.KC_SLSH,
          Backslash: E.KC_BSLS,
          Minus: E.KC_MINS,
          Equal: E.KC_EQL,
          IntlRo: E.KC_RO,
          IntlYen: E.KC_JYEN,
          AltLeft: E.KC_LALT,
          AltRight: E.KC_RALT,
          CapsLock: E.KC_CAPS,
          ControlLeft: E.KC_LCTL,
          ControlRight: E.KC_RCTL,
          MetaLeft: E.KC_LGUI,
          MetaRight: E.KC_RGUI,
          OSLeft: E.KC_LGUI,
          OSRight: E.KC_RGUI,
          ShiftLeft: E.KC_LSFT,
          ShiftRight: E.KC_RSFT,
          ContextMenu: E.KC_APP,
          Enter: E.KC_ENT,
          Space: E.KC_SPC,
          Tab: E.KC_TAB,
          Delete: E.KC_DEL,
          End: E.KC_END,
          Help: E.KC_HELP,
          Home: E.KC_HOME,
          Insert: E.KC_INS,
          PageDown: E.KC_PGDN,
          PageUp: E.KC_PGUP,
          ArrowDown: E.KC_DOWN,
          ArrowLeft: E.KC_LEFT,
          ArrowRight: E.KC_RGHT,
          ArrowUp: E.KC_UP,
          Escape: E.KC_ESC,
          PrintScreen: E.KC_PSCR,
          ScrollLock: E.KC_SLCK,
          AudioVolumeUp: E.KC_VOLU,
          AudioVolumeDown: E.KC_VOLD,
          AudioVolumeMute: E.KC_MUTE,
          Pause: E.KC_PAUS,
          F1: E.KC_F1,
          F2: E.KC_F2,
          F3: E.KC_F3,
          F4: E.KC_F4,
          F5: E.KC_F5,
          F6: E.KC_F6,
          F7: E.KC_F7,
          F8: E.KC_F8,
          F9: E.KC_F9,
          F10: E.KC_F10,
          F11: E.KC_F11,
          F12: E.KC_F12,
          F13: E.KC_F13,
          F14: E.KC_F14,
          F15: E.KC_F15,
          F16: E.KC_F16,
          F17: E.KC_F17,
          F18: E.KC_F18,
          F19: E.KC_F19,
          F20: E.KC_F20,
          F21: E.KC_F21,
          F22: E.KC_F22,
          F23: E.KC_F23,
          F24: E.KC_F24,
          NumLock: E.KC_NLCK,
          Numpad0: E.KC_P0,
          Numpad1: E.KC_P1,
          Numpad2: E.KC_P2,
          Numpad3: E.KC_P3,
          Numpad4: E.KC_P4,
          Numpad5: E.KC_P5,
          Numpad6: E.KC_P6,
          Numpad7: E.KC_P7,
          Numpad8: E.KC_P8,
          Numpad9: E.KC_P9,
          NumpadAdd: E.KC_PPLS,
          NumpadComma: E.KC_COMM,
          NumpadDecimal: E.KC_PDOT,
          NumpadDivide: E.KC_PSLS,
          NumpadEnter: E.KC_PENT,
          NumpadEqual: E.KC_PEQL,
          NumpadMultiply: E.KC_PAST,
          NumpadSubtract: E.KC_PMNS,
        },
        O = (e, t, n) => ({
          ...e,
          type: t.type,
          code1: t.code1,
          code2: t.code2,
          code3: t.code3,
          lang: t.lang,
          name: t.lang ? n(t.lang) : t.name,
        }),
        I = (e, t) =>
          e.type == t.type &&
          e.code1 == t.code1 &&
          e.code2 == t.code2 &&
          e.code3 == t.code3,
        R = (e, t, n, a, o, c) => {
          if (16 === t) {
            let e = P.V.find((e) => 16 === e.type && e.code2 === a);
            return {
              name: [...A(n), (null == e ? void 0 : e.name) || ""]
                .filter((e) => "" !== e)
                .join("+"),
              lang: "",
            };
          }
          let s = e.find(
            (e) =>
              e.type === t && e.code1 === n && e.code2 === a && e.code3 === o,
          );
          return s ? { name: s.name, lang: s.lang } : { name: "", lang: "" };
        },
        A = (e) =>
          [
            1 & e || (e >> 4) & 1 ? "CTRL" : "",
            (e >> 3) & 1 || (e >> 7) & 1 ? "WIN" : "",
            (e >> 2) & 1 || (e >> 6) & 1 ? "ALT" : "",
            (e >> 1) & 1 || (e >> 5) & 1 ? "SHIFT" : "",
          ].filter((e) => "" !== e),
        z = (0, o.createContext)({});
      var B = function (e) {
          let { children: t } = e,
            [n, c] = (0, o.useState)(!1),
            [s, d] = (0, o.useState)(!1),
            [l, i] = (0, o.useState)(!1),
            [r, m] = (0, o.useState)("home"),
            [u, h] = (0, o.useState)([]),
            [p, x] = (0, o.useState)(-1),
            [C, _] = (0, o.useState)([]),
            [g, v] = (0, o.useState)(0),
            [w, N] = (0, o.useState)(),
            [S, b] = (0, o.useState)(""),
            [M, D] = (0, o.useState)(),
            [k, F] = (0, o.useState)(),
            [P, E] = (0, o.useState)([]),
            [T, O] = (0, o.useState)(),
            [I, A] = (0, o.useState)([]),
            [B, U] = (0, o.useState)([]),
            [V, H] = (0, o.useState)(0),
            [W, Q] = (0, o.useState)(0),
            [X, G] = (0, o.useState)(90),
            [Y, q] = (0, o.useState)(0),
            [J, Z] = (0, o.useState)(!1),
            [$, ee] = (0, o.useState)([]),
            [et, en] = (0, o.useState)(),
            [ea, eo] = (0, o.useState)({}),
            [ec, es] = (0, o.useState)("USB"),
            [ed, el] = (0, o.useState)(),
            [ei, er] = (0, o.useState)(),
            [em, eu] = (0, o.useState)(!1),
            [eh, ep] = (0, o.useState)(!1),
            [ex, eC] = (0, o.useState)(2),
            { t: e_ } = L("common");
          (0, o.useRef)(J).current = J;
          let [eg, ev] = (0, o.useState)([]);
          L("common");
          let ef = async () => {
              d(!0);
              let e = new K(new f("demo"));
              N(e);
              let t = await e.loadDefaultConfig();
              (D(t), h(t.keys), await eM(e), await eD(e), await eb(e));
            },
            ey = async (e) => {
              if (n) return ef();
              let t = await y(e);
              return void 0 === t
                ? (console.log("connectedMouse undefined, not find device!"),
                  !1)
                : (d(!0),
                  N(t),
                  await eK(t),
                  await ew(t),
                  t.onListeners.push({
                    name: "statu",
                    fb: (e) => {
                      (H(e.dpi), Q(e.reportRate));
                    },
                  }),
                  t.onListeners.push({
                    name: "battery",
                    fb: (e) => {
                      (G(e.battery), q(e.charge_flag));
                    },
                  }),
                  t.onListeners.push({
                    name: "match",
                    fb: (e) => {
                      console.log(e);
                    },
                  }),
                  !0);
            },
            eK = async (e) => {
              let t = await e.loadDefaultConfig();
              (D(t), h(t.keys));
            },
            ej = () =>
              j.B.p.flatMap((e) =>
                e.keycodes.map((e) =>
                  e.lang ? { ...e, name: e_(e.lang) } : e,
                ),
              ),
            ew = async (e) => {
              let t;
              let n = localStorage.getItem("mouse_macro");
              (n && _((t = JSON.parse(n))), es(await e.getConnectMode()));
              let a = await e.getBatteryInfo();
              a &&
                a.battery_value > 0 &&
                (G(a.battery_value), q(a.charge_flag));
              let o = await e.loadDefaultConfig(),
                c = await e.getMouseKeys();
              if (c) {
                let e = ej();
                h(
                  o.keys.map((n, a) => {
                    let o = c[a];
                    if (!o || [0, 255].includes(o.type)) return n;
                    let s = n.name,
                      d = "",
                      l = R(e, o.type, o.code1, o.code2, o.code3, e_);
                    return (
                      "" != l.lang
                        ? ((s = e_(l.lang)), (d = l.lang))
                        : (s = l.name),
                      112 == o.type &&
                        t.length > 0 &&
                        ((s = t[o.code1].name), (d = "")),
                      {
                        ...n,
                        name: s,
                        type: o.type,
                        code1: o.code1,
                        code2: o.code2,
                        code3: o.code3,
                        lang: d,
                      }
                    );
                  }),
                );
              }
              let s = await e.getMouseConfigInfo();
              s &&
                s.dpi1_value > 0 &&
                s.dpi1_value < 65e3 &&
                (ep(!1), H(s.dpi_index), F(s), eC(s.light_mode));
            },
            eN = async (e) => {
              (await eK(e), await (null == e ? void 0 : e.resetAllMouseKeys()));
              let t = {
                report_rate: 3,
                dpi_index: 2,
                dpi_flag: 5,
                dpi_count: 5,
                dpi1_value: 1200,
                dpi2_value: 1600,
                dpi3_value: 2400,
                dpi4_value: 3200,
                dpi5_value: 6400,
                dpi6_value: 24000,
                scroll_flag: 0,
                lod_value: 1,
                sensor_flag: 53,
                key_respond: 2,
                sleep_light: 10,
                highspeed_mode: 0,
                wakeup_flag: 1,
                move_light_flag: 1,
              };
              (ep(!1),
                F(t),
                await (null == e ? void 0 : e.setMouseConfigData(t)),
                await (null == e ? void 0 : e.setLightMode(t.light_mode)));
            },
            eS = async (e) => {},
            eb = async (e) => {},
            eM = async (e) => {},
            eD = async (e) => {},
            ek = async () => {};
          return (0, a.jsx)(z.Provider, {
            value: {
              deviceStatus: s,
              setDeviceStatus: d,
              deviceOnline: l,
              setDeviceOnline: i,
              currentTab: r,
              setCurrentTab: m,
              selectedMouseKeyIndex: p,
              setSelectMouseKeyIndex: x,
              macroProfiles: C,
              setMacroProfiles: _,
              currentSelectMacroProfile: g,
              setCurrentSelectMacroProfile: v,
              connectedMouse: w,
              editMode: S,
              setEditMode: b,
              connectMouse: ey,
              mouseKeys: u,
              setMouseKeys: h,
              mouseConfig: M,
              lightEffectConfig: P,
              setLightEffectConfig: E,
              lightConfig: T,
              setLightConfig: O,
              macroList: I,
              keyInfos: B,
              setKeyInfos: U,
              disconnectMouse: () => {
                (d(!1), N(void 0));
              },
              reloadMouseData: ek,
              changedDpi: V,
              changedRespond: W,
              setChangedDpi: H,
              mouseConfigInfo: k,
              setMouseConfigInfo: F,
              battery: X,
              chargeFlag: Y,
              mouseStatus: J,
              t: e_,
              dpi: $,
              mouseProfile: et,
              setMouseProfile: en,
              baseInfo: ea,
              connectMode: ec,
              initMouseProfile: eS,
              dongleInfo: ed,
              setDongleInfo: el,
              sensor: ei,
              setSensor: er,
              matchMode: em,
              setMatchMode: eu,
              initAllMouseData: ew,
              restoreFactorySettings: eN,
              dpiInit: eh,
              setDpiInit: ep,
              lightModeInit: ex,
              setLightModeInit: eC,
            },
            children: t,
          });
        },
        U = n(6076),
        V = n(2401),
        H = n(2128),
        W = function () {
          let { setCurrentTab: e } = (0, o.useContext)(z);
          return (0, a.jsx)("div", {
            className: "tabs",
            children: (0, a.jsx)(U.m, {
              onChange: (t) => {
                e(["home", "mouse", "pointer", "macro", "setting"][t]);
              },
              defaultIndex: 0,
              variant: "unstyled",
              children: (0, a.jsxs)(V.t, {
                className: "tablist",
                children: [
                  (0, a.jsx)(H.O, {
                    children: (0, a.jsx)("svg", {
                      className: "w-8",
                      viewBox: "0 0 1024 1024",
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      "p-id": "25981",
                      width: "48",
                      height: "48",
                      children: (0, a.jsx)("path", {
                        d: "M896 853.333333a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V404.906667a42.666667 42.666667 0 0 1 16.469333-33.706667l341.333334-265.472a42.666667 42.666667 0 0 1 52.394666 0l341.333334 265.472a42.666667 42.666667 0 0 1 16.469333 33.706667V853.333333z m-85.333333-42.666666V425.728l-298.666667-232.277333-298.666667 232.277333V810.666667h597.333334zM298.666667 640h426.666666v85.333333H298.666667v-85.333333z",
                      }),
                    }),
                  }),
                  (0, a.jsx)(H.O, {
                    children: (0, a.jsx)("svg", {
                      className: "w-8",
                      viewBox: "0 0 1024 1024",
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      "p-id": "26303",
                      width: "48",
                      height: "48",
                      children: (0, a.jsx)("path", {
                        d: "M475.349333 170.666667c-67.498667 0-101.845333 7.210667-133.461333 24.106666a147.328 147.328 0 0 0-61.781333 61.781334C263.210667 288.128 256 322.517333 256 389.973333v243.968c0 67.498667 7.210667 101.845333 24.106667 133.461334 14.378667 26.88 34.901333 47.402667 61.781333 61.781333 31.573333 16.896 65.962667 24.106667 133.461333 24.106667h73.301334c67.498667 0 101.845333-7.210667 133.461333-24.106667a147.328 147.328 0 0 0 61.781333-61.781333c16.896-31.573333 24.106667-65.962667 24.106667-133.461334V389.973333c0-67.498667-7.210667-101.845333-24.106667-133.461333a147.328 147.328 0 0 0-61.781333-61.781333C650.538667 177.877333 616.149333 170.666667 548.693333 170.666667h-73.386666z m0-85.333334h73.301334c85.930667 0 132.010667 11.861333 173.738666 34.176a232.618667 232.618667 0 0 1 96.768 96.768c22.314667 41.728 34.176 87.808 34.176 173.738667v243.968c0 85.930667-11.861333 132.010667-34.176 173.738667a232.618667 232.618667 0 0 1-96.768 96.768c-41.728 22.314667-87.808 34.176-173.738666 34.176H475.306667c-85.930667 0-132.010667-11.861333-173.738667-34.176A232.618667 232.618667 0 0 1 204.8 807.722667c-22.272-41.728-34.133333-87.808-34.133333-173.738667V389.973333c0-85.930667 11.861333-132.010667 34.176-173.738666A232.618667 232.618667 0 0 1 301.653333 119.509333C343.338667 97.194667 389.418667 85.333333 475.349333 85.333333zM469.333333 256h85.333334v213.333333h-85.333334V256z",
                      }),
                    }),
                  }),
                  (0, a.jsx)(H.O, {
                    children: (0, a.jsx)("svg", {
                      className: "w-8",
                      viewBox: "0 0 1024 1024",
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      "p-id": "27207",
                      width: "48",
                      height: "48",
                      children: (0, a.jsx)("path", {
                        d: "M768 469.333333V341.333333l170.666667 170.666667-170.666667 170.666667v-128h-213.333333v213.333333h128l-170.666667 170.666667-170.666667-170.666667h128v-213.333333H256v128l-170.666667-170.666667 170.666667-170.666667v128h213.333333V256H341.333333l170.666667-170.666667 170.666667 170.666667h-128v213.333333z",
                        "p-id": "27208",
                      }),
                    }),
                  }),
                  (0, a.jsx)(H.O, {
                    children: (0, a.jsx)("svg", {
                      className: "w-8",
                      viewBox: "0 0 1024 1024",
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      "p-id": "27537",
                      width: "48",
                      height: "48",
                      children: (0, a.jsx)("path", {
                        d: "M896 768v128h-85.333333v-128h-85.333334v-85.333333h256v85.333333h-85.333333zM213.333333 768v128H128v-128H42.666667v-85.333333h256v85.333333H213.333333z m256-512V128h85.333334v128h85.333333v85.333333H384V256h85.333333z m0 170.666667h85.333334v469.333333h-85.333334V426.666667z m-341.333333 170.666666V128h85.333333v469.333333H128z m682.666667 0V128h85.333333v469.333333h-85.333333z",
                        "p-id": "27538",
                      }),
                    }),
                  }),
                ],
              }),
            }),
          });
        },
        Q = n(4285),
        X = n(8308),
        G = n(5941),
        Y = n(5059),
        q = n(9623),
        J = n(20),
        Z = n(1379),
        $ = n(4873),
        ee = n(129),
        et = n(2250),
        en = n(1957),
        ea = n(4097),
        eo = function (e) {
          let { mode: t = "normal", mouseKeys: n = [], onSelected: c } = e,
            {
              selectedMouseKeyIndex: s,
              setSelectMouseKeyIndex: d,
              connectedMouse: l,
              t: i,
              setMouseKeys: r,
              mouseConfig: m,
            } = (0, o.useContext)(z),
            u = (0, G.q)(),
            h = (0, G.q)(),
            p = (0, o.useRef)(null),
            x = (e) => {
              if (0 == e.index) {
                u.onOpen();
                return;
              }
              (d(e.index), c && c(e));
            },
            C = async () => {
              (await (null == l ? void 0 : l.resetAllMouseKeys()),
                m && r(m.keys),
                h.onClose());
            },
            _ = (0, o.useMemo)(
              () => (l ? l.productName.toLowerCase().replaceAll(" ", "_") : ""),
              [l],
            ),
            g = (e, t) => {
              if (
                (console.log("mouseKeys", n),
                console.log("dropKey", e.dataTransfer.getData("keyCode")),
                0 == t)
              )
                return;
              let a = JSON.parse(e.dataTransfer.getData("keyCode"));
              a.index = t;
              let o = [...n];
              ((o[t] = a), r(o), null == l || l.setMouseKeys(o));
            };
          return (0, a.jsxs)(Q.k, {
            alignItems: "center",
            justifyContent: "center",
            w: "100%",
            minWidth: "500px",
            h: "100%",
            flexGrow: "1",
            className: "mouse-mode mouse-".concat(_),
            children: [
              (0, a.jsxs)(ea.E.div, {
                style: { scale: 1.03 },
                animate: { scale: 1 },
                transition: { timeConstant: "ease-out" },
                className:
                  "w-[500px] h-[500px] mx-auto flex flex-col items-center",
                children: [
                  (0, a.jsxs)(X.xu, {
                    className: "bg-slate-800/10 rounded-full relative",
                    w: "500px",
                    h: "500px",
                    children: [
                      (0, a.jsx)(X.xu, {
                        className:
                          "w-[500px] h-[510px] flex justify-center items-center bg-transparent",
                        children: (0, a.jsx)(Y.E, {
                          className: "w-[204px] h-[394px]",
                          src: "products/mouse.png",
                          alt: "",
                        }),
                      }),
                      "key" == t
                        ? (0, a.jsx)(a.Fragment, {
                            children: n.map((e, t) =>
                              (0, a.jsx)(
                                X.xu,
                                {
                                  border: "none",
                                  className: "mouse-key key"
                                    .concat(t, " ")
                                    .concat(
                                      5 === t || 6 === t || 7 === t
                                        ? "hidden"
                                        : "",
                                    ),
                                  onClick: () => x(e),
                                  "data-selected": e.index == s,
                                  onDrop: (e) => g(e, t),
                                  onDragOver: (e) => e.preventDefault(),
                                  children: (0, a.jsx)(X.xu, {
                                    className: " text-nowrap",
                                    children: e.lang ? i(e.lang) : e.name,
                                  }),
                                },
                                t,
                              ),
                            ),
                          })
                        : (0, a.jsx)(a.Fragment, {}),
                    ],
                  }),
                  (0, a.jsx)(X.xu, {
                    hidden: "key" != t,
                    children: (0, a.jsx)(q.z, {
                      className: "main-btn",
                      variant: "unstyled",
                      onClick: h.onOpen,
                      children: i("203"),
                    }),
                  }),
                ],
              }),
              (0, a.jsx)(J.h, {
                children: (0, a.jsx)(Z.a, {
                  isOpen: u.isOpen,
                  leastDestructiveRef: p,
                  onClose: u.onClose,
                  isCentered: !0,
                  children: (0, a.jsx)($.Z, {
                    children: (0, a.jsxs)(Z._, {
                      className: "!bg-gray-700/90",
                      children: [
                        (0, a.jsx)(ee.x, {
                          fontSize: "lg",
                          fontWeight: "bold",
                          children: i("220"),
                        }),
                        (0, a.jsx)(et.f, { children: i("221") }),
                        (0, a.jsx)(en.m, {
                          children: (0, a.jsx)(q.z, {
                            ref: p,
                            className: "main-btn",
                            onClick: u.onClose,
                            ml: 3,
                            children: i("222"),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              }),
              (0, a.jsx)(J.h, {
                children: (0, a.jsx)(Z.a, {
                  isOpen: h.isOpen,
                  leastDestructiveRef: p,
                  onClose: h.onClose,
                  isCentered: !0,
                  children: (0, a.jsx)($.Z, {
                    children: (0, a.jsxs)(Z._, {
                      className: "!bg-gray-700/90",
                      children: [
                        (0, a.jsx)(ee.x, {
                          fontSize: "lg",
                          fontWeight: "bold",
                          children: i("223"),
                        }),
                        (0, a.jsx)(et.f, { children: i("224") }),
                        (0, a.jsxs)(en.m, {
                          children: [
                            (0, a.jsx)(q.z, {
                              ref: p,
                              onClick: h.onClose,
                              children: i("211"),
                            }),
                            (0, a.jsx)(q.z, {
                              colorScheme: "red",
                              onClick: C,
                              ml: 3,
                              children: i("210"),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            ],
          });
        };
      let ec = (e) =>
          (0, a.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024",
            height: 32,
            width: 32,
            ...e,
            children: (0, a.jsx)("path", {
              fill: "#e6e6e6",
              d: "M790.912 834.859A425.003 425.003 0 0 1 512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512c0 91.136-28.587 175.616-77.227 244.907L725.333 512h128a341.333 341.333 0 1 0-104.96 246.272l42.539 76.587z",
            }),
          }),
        es = (e) =>
          (0, a.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 1024 1024",
            height: 48,
            width: 48,
            ...e,
            children: (0, a.jsx)("path", {
              fill: "#e6e6e6",
              d: "M475.35 170.667c-67.5 0-101.846 7.21-133.462 24.106a147.328 147.328 0 0 0-61.781 61.782C263.21 288.128 256 322.517 256 389.973v243.968c0 67.499 7.21 101.846 24.107 133.462 14.378 26.88 34.901 47.402 61.781 61.781 31.573 16.896 65.963 24.107 133.461 24.107h73.302c67.498 0 101.845-7.211 133.461-24.107a147.328 147.328 0 0 0 61.781-61.781C760.79 735.829 768 701.44 768 633.94V389.973c0-67.498-7.21-101.845-24.107-133.461a147.328 147.328 0 0 0-61.781-61.781c-31.573-16.854-65.963-24.064-133.419-24.064h-73.386zm0-85.334h73.3c85.931 0 132.011 11.862 173.74 34.176a232.619 232.619 0 0 1 96.767 96.768c22.315 41.728 34.176 87.808 34.176 173.739v243.968c0 85.93-11.861 132.01-34.176 173.739a232.619 232.619 0 0 1-96.768 96.768c-41.728 22.314-87.808 34.176-173.738 34.176h-73.344c-85.931 0-132.011-11.862-173.739-34.176a232.619 232.619 0 0 1-96.768-96.768c-22.272-41.728-34.133-87.808-34.133-173.739v-244.01c0-85.931 11.861-132.011 34.176-173.74a232.619 232.619 0 0 1 96.81-96.725C343.34 97.195 389.42 85.333 475.35 85.333zM469.332 256h85.334v213.333h-85.334V256z",
            }),
          });
      var ed = n(6883),
        el = n(2540),
        ei = n(7765),
        er = n(2070),
        em = n(3518),
        eu = function (e) {
          let { onChange: t } = e,
            n = (0, o.useRef)(null),
            [c, s] = (0, o.useState)({ name: "" }),
            d = (e) => {
              let n = {
                name: e.key.toUpperCase() + "",
                code: e.key + "",
                type: 32,
                code1: 0,
                code2: T[e.code],
                code3: 0,
                lang: "",
              };
              (s(n), t(n));
            };
          return (
            (0, o.useEffect)(() => {
              var e;
              return (
                null === (e = n.current) ||
                  void 0 === e ||
                  e.addEventListener("keydown", d),
                () => {
                  var e;
                  null === (e = n.current) ||
                    void 0 === e ||
                    e.removeEventListener("keydown", d);
                }
              );
            }, []),
            (0, a.jsx)(em.I, {
              ref: n,
              value: null == c ? void 0 : c.name,
              height: "3rem",
              w: "18rem",
              className: "keyinput-box",
              readOnly: !0,
            })
          );
        };
      let eh = (e) =>
        (0, a.jsx)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024",
          height: "48",
          width: "48",
          ...e,
          children: (0, a.jsx)("path", {
            fill: "#dbdbdb",
            d: "M469.333 469.333v-256h85.334v256h256v85.334h-256v256h-85.334v-256h-256v-85.334z",
          }),
        });
      var ep = n(6055),
        ex = n(9528),
        eC = n(4215),
        e_ = n(4428),
        eg = n(6432),
        ev = function (e) {
          let { select: t = 0, options: n, onChange: c } = e,
            [s, d] = (0, o.useState)(0),
            l = (0, o.useMemo)(() => n[s] || "", [s, n]);
          (0, o.useEffect)(() => {
            d(t);
          }, [t]);
          let i = (e) => {
            (d(e), c && c(e));
          };
          return (0, a.jsxs)(ex.v, {
            matchWidth: !0,
            children: [
              (0, a.jsx)(eC.j, {
                as: q.z,
                rightIcon: (0, a.jsx)(ep.v, { fill: "#fff", boxSize: "6" }),
                w: "100%",
                textAlign: "left",
                className: "selecet-menu-btn !rounded",
                style: { backgroundColor: "rgb(65,107,61)" },
                children: l.name,
              }),
              (0, a.jsx)(e_.q, {
                padding: 0,
                overflowY: "auto",
                zIndex: 10,
                className: "!bg-gray-900 border border-gray-700 rounded-md",
                maxH: n.length > 10 ? "200px" : "auto",
                w: "100%",
                minWidth: "unset",
                children: n.map((e, t) =>
                  (0, a.jsx)(
                    eg.s,
                    {
                      className: "select-menu-item",
                      onClick: () => i(t),
                      children: e.name,
                    },
                    t,
                  ),
                ),
              }),
            ],
          });
        },
        ef = function (e) {
          let { selectedBtn: t, onChange: n } = e,
            { macroProfiles: c } = (0, o.useContext)(z),
            { t: s } = L("common"),
            [d, l] = (0, o.useState)({}),
            [i, r] = (0, o.useState)({}),
            [m, u] = (0, o.useState)(),
            [h, p] = (0, o.useState)(),
            [x, C] = (0, o.useState)(1),
            [_, g] = (0, o.useState)(0),
            [v, f] = (0, o.useState)({});
          (0, o.useEffect)(() => {
            !v.code1 &&
              c.length > 0 &&
              f({ name: c[0].name, type: 112, code1: 0, code2: 0, code3: 0 });
          }, [c]);
          let y = (e) => {
              (C(e), v && f({ ...v, code2: e }));
            },
            K = (e) => {
              (0 != e && C(1), v && g(e));
            },
            w = (e) => {
              "macro" == e ? n({ ...v, code2: x, code3: _ }) : n(v);
            },
            N = (e) => {
              (l(e), n(e));
            },
            S = (e) => {
              p({
                ctrl:
                  "ctrl" == e
                    ? !(null == h ? void 0 : h.ctrl)
                    : !!(null == h ? void 0 : h.ctrl),
                alt:
                  "alt" == e
                    ? !(null == h ? void 0 : h.alt)
                    : !!(null == h ? void 0 : h.alt),
                win:
                  "win" == e
                    ? !(null == h ? void 0 : h.win)
                    : !!(null == h ? void 0 : h.win),
                shift:
                  "shift" == e
                    ? !(null == h ? void 0 : h.shift)
                    : !!(null == h ? void 0 : h.shift),
              });
            };
          (0, o.useEffect)(() => {
            m && b();
          }, [h, m]);
          let b = () => {
            let e =
              ((null == h ? void 0 : h.alt) ? 4 : 0) +
              ((null == h ? void 0 : h.shift) ? 2 : 0) +
              ((null == h ? void 0 : h.win) ? 8 : 0) +
              ((null == h ? void 0 : h.ctrl) ? 1 : 0);
            r({
              name: [
                (null == h ? void 0 : h.alt) ? "ALT" : "",
                (null == h ? void 0 : h.ctrl) ? "CTRL" : "",
                (null == h ? void 0 : h.shift) ? "SHIFT" : "",
                (null == h ? void 0 : h.win) ? "WIN" : "",
                null == m ? void 0 : m.name,
              ]
                .filter((e) => "" != e)
                .join("+"),
              type: 16,
              code1: e,
              code2: (null == m ? void 0 : m.code2) || 0,
              code3: 0,
              lang: "",
            });
          };
          return (0, a.jsxs)(U.m, {
            w: "100%",
            className: "key-tabs",
            children: [
              (0, a.jsxs)(V.t, {
                gap: "1rem",
                children: [
                  (0, a.jsx)(H.O, { children: s("90") }),
                  (0, a.jsx)(H.O, { children: s("91") }),
                  (0, a.jsx)(H.O, { children: s("92") }),
                ],
              }),
              (0, a.jsxs)(ed.n, {
                h: "30rem",
                overflow: "auto",
                children: [
                  (0, a.jsx)(el.x, {
                    children: (0, a.jsx)("ul", {
                      className: "keytabs-list",
                      children: j.B.p.map((e, t) =>
                        (0, a.jsxs)(
                          o.Fragment,
                          {
                            children: [
                              (0, a.jsx)("li", {
                                className: "keys-type",
                                children: s(e.lang),
                              }),
                              e.keycodes.map((e, t) =>
                                (0, a.jsx)(
                                  "li",
                                  {
                                    "data-selected": I(d, e),
                                    onClick: () => N(e),
                                    draggable: !0,
                                    onDragStart: (t) => {
                                      (console.log("keyCode", e),
                                        t.dataTransfer.setData(
                                          "keyCode",
                                          JSON.stringify(e),
                                        ));
                                    },
                                    children: s(e.lang),
                                  },
                                  t,
                                ),
                              ),
                            ],
                          },
                          t,
                        ),
                      ),
                    }),
                  }),
                  (0, a.jsx)(el.x, {
                    children: (0, a.jsxs)(X.xu, {
                      className: "bg-lw-snuff-50 rounded-lg p-3",
                      children: [
                        (0, a.jsx)(X.xu, {
                          className:
                            " font-medium border-b border-lw-snuff-200 py-1.5 px-1",
                          children: s("170"),
                        }),
                        (0, a.jsxs)(X.xu, {
                          className:
                            "flex flex-col items-center py-6 gap-3 mt-6",
                          children: [
                            (0, a.jsxs)(X.xu, {
                              className: "commbo-keys",
                              children: [
                                (0, a.jsx)(X.xu, {
                                  className: "commbo-key",
                                  onClick: () => S("ctrl"),
                                  "data-selected": !!(null == h
                                    ? void 0
                                    : h.ctrl),
                                  children: "Ctrl",
                                }),
                                (0, a.jsx)(X.xu, {
                                  className: "commbo-key",
                                  onClick: () => S("shift"),
                                  "data-selected": !!(null == h
                                    ? void 0
                                    : h.shift),
                                  children: "Shift",
                                }),
                                (0, a.jsx)(X.xu, {
                                  className: "commbo-key",
                                  onClick: () => S("alt"),
                                  "data-selected": !!(null == h
                                    ? void 0
                                    : h.alt),
                                  children: "Alt",
                                }),
                                (0, a.jsx)(X.xu, {
                                  className: "commbo-key",
                                  onClick: () => S("win"),
                                  "data-selected": !!(null == h
                                    ? void 0
                                    : h.win),
                                  children: "Win",
                                }),
                              ],
                            }),
                            (0, a.jsx)(X.xu, {
                              className: "text-center",
                              children: (0, a.jsx)(eh, { className: "w-10" }),
                            }),
                            (0, a.jsx)(X.xu, {
                              className: "text-center",
                              children: (0, a.jsx)(eu, {
                                onChange: (e) => u(e),
                              }),
                            }),
                            (0, a.jsx)(q.z, {
                              className: "main-btn mt-6",
                              onClick: () => n(i),
                              children: s("173"),
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(el.x, {
                    children: (0, a.jsxs)(X.xu, {
                      className: "space-y-4 px-8 pt-8",
                      children: [
                        (0, a.jsx)(ev, {
                          options: c.map((e, t) => ({
                            name: e.name,
                            value: t,
                          })),
                          onChange: (e) => {
                            v &&
                              f({ ...v, name: c[e].name, type: 112, code1: e });
                          },
                        }),
                        (0, a.jsx)(X.xu, {
                          className: "pt-4",
                          children: (0, a.jsxs)(ei.E, {
                            className: "flex flex-col gap-3",
                            defaultValue: "0",
                            onChange: (e) => K(parseInt(e)),
                            children: [
                              (0, a.jsx)(er.Y, {
                                value: "2",
                                children: s("516"),
                              }),
                              (0, a.jsx)(er.Y, {
                                value: "3",
                                children: s("517"),
                              }),
                              (0, a.jsxs)(Q.k, {
                                gap: "1rem",
                                className: " items-center",
                                children: [
                                  (0, a.jsx)(er.Y, {
                                    value: "0",
                                    children: s("518"),
                                  }),
                                  (0, a.jsx)(em.I, {
                                    w: "3rem",
                                    size: "sm",
                                    defaultValue: 1,
                                    onChange: (e) => {
                                      y(parseInt(e.target.value));
                                    },
                                  }),
                                  (0, a.jsx)("div", { children: s("519") }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsx)(X.xu, {
                          className: "text-center",
                          children: (0, a.jsx)(q.z, {
                            isDisabled: !v.type,
                            className: "main-btn mt-6",
                            onClick: () => w("macro"),
                            children: s("173"),
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        },
        ey = function () {
          let {
              connectedMouse: e,
              keyInfos: t,
              mouseKeys: n,
              setMouseKeys: c,
            } = (0, o.useContext)(z),
            [s, d] = (0, o.useState)({}),
            { t: l } = L("common"),
            i = async (t) => {
              let a = O(s, t, l);
              c((e) => {
                let t = e.map((e) => (e.index == a.index ? a : e));
                return (console.log(t), t);
              });
              let o = n.map((e) => (e.index === a.index ? a : e));
              await (null == e ? void 0 : e.setMouseKeys(o));
            };
          return (
            (0, o.useMemo)(
              () =>
                n.map((e) => {
                  let n = t.find((t) => t.key_index == e.index);
                  return { ...e, ...n };
                }),
              [t, n],
            ),
            (0, a.jsxs)(Q.k, {
              w: "100%",
              gap: "0.5rem",
              children: [
                (0, a.jsx)(ea.E.div, {
                  style: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: {
                    delay: 0.1,
                    duration: 0.4,
                    timeConstant: "ease-out",
                  },
                  children: (0, a.jsxs)(X.xu, {
                    className: "panel-main-bg",
                    w: "40rem",
                    children: [
                      (0, a.jsxs)(Q.k, {
                        alignItems: "center",
                        w: "100%",
                        justifyContent: "space-between",
                        className: "panel-main-fg px-4 gap-1",
                        children: [
                          (0, a.jsxs)(X.xu, {
                            className: "flex items-center gap-1",
                            children: [
                              (0, a.jsx)(es, { className: "w-6" }),
                              (0, a.jsx)("div", {
                                className: "font-medium",
                                children: l("101"),
                              }),
                            ],
                          }),
                          (0, a.jsx)("div", {
                            className: "rotate hidden",
                            children: (0, a.jsx)(ec, { className: "w-5" }),
                          }),
                        ],
                      }),
                      (0, a.jsx)(X.xu, {
                        children: (0, a.jsx)(ef, {
                          selectedBtn: s,
                          onChange: i,
                        }),
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)("div", {
                  className: "flex-1",
                  children: (0, a.jsx)(eo, {
                    mode: "key",
                    mouseKeys: n,
                    onSelected: (e) => {
                      d({ ...e });
                    },
                  }),
                }),
              ],
            })
          );
        },
        eK = n(2633),
        ej = n(8062),
        ew = n(1896),
        eN = n(3668),
        eS = n(5751),
        eb = n(1617),
        eM = (e) => {
          let {
            className: t = "w-5",
            width: n = 32,
            height: o = 32,
            fill: c = "#dbdbdb",
          } = e;
          return (0, a.jsx)("svg", {
            className: t,
            viewBox: "0 0 1024 1024",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            width: n,
            height: o,
            children: (0, a.jsx)("path", {
              d: "M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m-42.666667-213.333333h85.333334v85.333333h-85.333334v-85.333333z m85.333334-70.186667V597.333333h-85.333334v-64a42.666667 42.666667 0 0 1 42.666667-42.666666 64 64 0 1 0-62.762667-76.544l-83.712-16.768A149.376 149.376 0 1 1 554.666667 569.813333z",
              fill: c,
            }),
          });
        },
        eD = function () {
          let [e, t] = (0, o.useState)([]),
            [n, c] = (0, o.useState)(0),
            [s, d] = (0, o.useState)(0),
            [l, i] = (0, o.useState)([]),
            [r, m] = (0, o.useState)(200),
            [u, h] = (0, o.useState)(49),
            [p, x] = (0, o.useState)("1"),
            [C, _] = (0, o.useState)("0"),
            [g, v] = (0, o.useState)(0),
            [f, y] = (0, o.useState)(!1),
            [K, j] = (0, o.useState)(2),
            [w, N] = (0, o.useState)(!1),
            {
              connectedMouse: S,
              mouseConfig: b,
              dpi: M,
              connectMode: D,
              changedDpi: k,
              changedRespond: F,
              t: L,
              dpiInit: P,
              setDpiInit: E,
              mouseConfigInfo: T,
              setMouseConfigInfo: O,
              lightModeInit: I,
              setLightModeInit: R,
            } = (0, o.useContext)(z);
          ((0, o.useEffect)(() => {
            (console.log("useEffect setKeyDpi: ", b),
              b && S && 0 == e.length && (t(b.dpi), i(b.reportRate[D] || [])));
          }, [b, S, n, D]),
            (0, o.useEffect)(() => {
              T && A(T);
            }, [T, e]),
            (0, o.useEffect)(() => {
              var t;
              m(
                (null === (t = e[n]) || void 0 === t ? void 0 : t.value) || 200,
              );
            }, [n]));
          let A = (n) => {
            (e.length >= 1 &&
              !P &&
              (E(!0),
              (e[0].value = n.dpi1_value),
              (e[1].value = n.dpi2_value),
              (e[2].value = n.dpi3_value),
              (e[3].value = n.dpi4_value),
              (e[4].value = n.dpi5_value),
              (e[5].value = n.dpi6_value),
              t(e)),
              c(n.dpi_index),
              d(n.report_rate),
              h(n.sensor_flag),
              1 == n.lod_value ? x("1") : x("2"),
              1 == n.scroll_flag ? _("1") : _("0"));
            let a = 0;
            (1 == n.sleep_light
              ? (a = 0)
              : 3 == n.sleep_light
                ? (a = 1)
                : 5 == n.sleep_light
                  ? (a = 2)
                  : 10 == n.sleep_light
                    ? (a = 3)
                    : 20 == n.sleep_light
                      ? (a = 4)
                      : 30 == n.sleep_light
                        ? (a = 5)
                        : 60 == n.sleep_light && (a = 6),
              v(a),
              j(n.light_mode),
              console.log(n),
              1 == n.wakeup_flag ? y(!0) : y(!1),
              console.log(n.wakeup_flag),
              console.log(n),
              1 == n.move_light_flag ? N(!0) : N(!1),
              console.log(n.move_light_flag));
          };
          (0, o.useEffect)(() => {
            c(k);
          }, [k]);
          let B = (e) => {
              (c(e),
                console.log("changeSelectDpi: ", e),
                S &&
                  T &&
                  ((T.dpi_index = e),
                  O(T),
                  null == S || S.setMouseConfigData(T)));
            },
            U = () => {
              S &&
                T &&
                e.length > 0 &&
                ((T.dpi_index = n),
                (T.dpi1_value = e[0].value),
                (T.dpi2_value = e[1].value),
                (T.dpi3_value = e[2].value),
                (T.dpi4_value = e[3].value),
                (T.dpi5_value = e[4].value),
                (T.dpi6_value = e[5].value),
                O(T),
                console.log("saveDPIData mouseconfig_", T),
                null == S || S.setMouseConfigData(T));
            };
          (0, o.useEffect)(() => {
            let e = F;
            ("USB" == D && (e = 0), d(e));
          }, [F]);
          let V = (e) => {
              (d(e),
                S &&
                  T &&
                  ("USB" == D && (e = 3),
                  (T.report_rate = e),
                  O(T),
                  null == S || S.setMouseConfigData(T),
                  console.log("mouseconfig_", T, e)));
            },
            H = (e, t) => {
              let n = u;
              (t ? (n |= e) : (n &= ~e),
                console.log("changeSensorFlag: sensorflag_value", n),
                h(n),
                S &&
                  T &&
                  ((T.sensor_flag = n),
                  O(T),
                  null == S || S.setMouseConfigData(T),
                  console.log("setMouseConfigData: mouseconfig_", T)));
            },
            W = (e) => {
              let t = 0;
              (e && (t = 1),
                y(e),
                S &&
                  T &&
                  ((T.wakeup_flag = t),
                  O(T),
                  null == S || S.setMouseConfigData(T)));
            },
            G = (e) => {
              let t = 0;
              (e && (t = 1),
                N(e),
                S &&
                  T &&
                  ((T.move_light_flag = t),
                  O(T),
                  null == S || S.setMouseConfigData(T)));
            },
            Y = (e) => {
              let t = 1;
              (0 == e
                ? (t = 1)
                : 1 == e
                  ? (t = 3)
                  : 2 == e
                    ? (t = 5)
                    : 3 == e
                      ? (t = 10)
                      : 4 == e
                        ? (t = 20)
                        : 5 == e
                          ? (t = 30)
                          : 6 == e && (t = 60),
                v(e),
                S && T && ((T.sleep_light = t), O(T), S.setMouseConfigData(T)));
            },
            J = (e) => {
              S && S.setLightMode(e);
            };
          return (0, a.jsxs)(Q.k, {
            w: "100%",
            gap: "0.5rem",
            children: [
              (0, a.jsx)(ea.E.div, {
                style: { opacity: 0 },
                animate: { opacity: 1 },
                transition: {
                  duration: 0.4,
                  delay: 0.1,
                  timeConstant: "ease-out",
                },
                children: (0, a.jsxs)(X.xu, {
                  className: "panel-main-bg h-max",
                  w: "70rem",
                  children: [
                    (0, a.jsx)(Q.k, {
                      className: "panel-main-fg px-4",
                      children: (0, a.jsx)(X.xu, {
                        className: "font-medium py-3",
                        children: L("600"),
                      }),
                    }),
                    (0, a.jsx)(X.xu, {
                      className: "p-2",
                      children: (0, a.jsxs)(X.xu, {
                        className: "panel-main-fg p-4",
                        children: [
                          (0, a.jsx)(Q.k, {
                            justify: "space-between",
                            align: "center",
                            mb: "2",
                            children: (0, a.jsxs)(X.xu, {
                              className: "flex items-center",
                              children: [
                                (0, a.jsx)(X.xu, { children: L("601") }),
                                (0, a.jsx)(X.xu, {
                                  className: "flex items-start px-4",
                                  children: (0, a.jsx)(eK.u, {
                                    minW: "24rem",
                                    label: (0, a.jsx)(X.xu, {
                                      className: "p-3",
                                      children: (0, a.jsx)("p", {
                                        className: "py-1",
                                        children: L("602"),
                                      }),
                                    }),
                                    children: (0, a.jsx)("span", {
                                      children: (0, a.jsx)(eM, {}),
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                          (0, a.jsxs)(Q.k, {
                            flexDirection: "column",
                            children: [
                              (0, a.jsx)(X.xu, {
                                className: "dpi-list pt-2",
                                w: "100%",
                                overflowX: "auto",
                                children: e.map((e, t) =>
                                  (0, a.jsx)(
                                    X.xu,
                                    {
                                      className: "flex items-center",
                                      children: (0, a.jsxs)(X.xu, {
                                        "data-selected": t == n,
                                        onClick: () => {},
                                        className: "dpi-option",
                                        "data-enable": !0,
                                        children: [
                                          (0, a.jsx)(ej.J, {
                                            placement: "right",
                                            children: (0, a.jsx)(ew.x, {
                                              children: (0, a.jsx)(X.xu, {
                                                bgColor: e.rgb,
                                                w: "140px",
                                                h: "1.5rem",
                                                onClick: () => B(t),
                                              }),
                                            }),
                                          }),
                                          (0, a.jsx)(X.xu, {
                                            children: (0, a.jsx)(eN.Y2, {
                                              className: "!border-none ".concat(
                                                t == n
                                                  ? "bg-[rgb(101,101,101)]"
                                                  : "bg-[rgb(5,5,5)]",
                                              ),
                                              value: e.value,
                                              max: 24000,
                                              min: 200,
                                              onClick: (e) => {
                                                (e.target.select(), B(t));
                                              },
                                              step: 100,
                                              children: (0, a.jsx)(eN.zu, {
                                                h: "3rem",
                                                borderRadius: 0,
                                                border: "none",
                                                padding: 0,
                                                textAlign: "center",
                                                readOnly: !0,
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                    },
                                    t,
                                  ),
                                ),
                              }),
                              (0, a.jsx)(X.xu, {
                                className: "flex justify-center mt-8",
                                children: (0, a.jsx)(X.xu, {
                                  className:
                                    "p-6 w-full flex justify-center items-center",
                                  style: {
                                    backgroundColor: "rgb(20, 23, 21)",
                                    minHeight: "80px",
                                    border: "1px solid rgb(81, 81, 81)",
                                  },
                                  children: (0, a.jsxs)(eS.iR, {
                                    max: 24000,
                                    min: 200,
                                    step: 100,
                                    w: "85%",
                                    margin: "0 auto",
                                    onChange: (e) => {
                                      let a = n < 5 ? Math.min(e, 24000) : e;
                                      (m(a),
                                        t((e) =>
                                          e.map((e, t) =>
                                            t === n ? { ...e, value: a } : e,
                                          ),
                                        ));
                                    },
                                    value: r,
                                    isReadOnly: !1,
                                    children: [
                                      (0, a.jsx)(eS.jz, {
                                        value: 200,
                                        mt: "-0.75rem",
                                        ml: "-3rem",
                                        children: 200,
                                      }),
                                      (0, a.jsx)(eS.jz, {
                                        value: 24000,
                                        mt: "-0.75rem",
                                        ml: "1rem",
                                        children: 24000,
                                      }),
                                      Array.from({ length: 25 }).map((e, t) =>
                                        (0, a.jsx)(
                                          X.xu,
                                          {
                                            position: "absolute",
                                            marginLeft: "-0.5",
                                            top: "0",
                                            left: "".concat(
                                              4.166666666666667 * t,
                                              "%",
                                            ),
                                            width: "1px",
                                            height: "18px",
                                            backgroundColor: "white",
                                            pointerEvents: "none",
                                          },
                                          t,
                                        ),
                                      ),
                                      (0, a.jsx)(eS.Uj, {
                                        className: "opacity-0",
                                        children: (0, a.jsx)(eS.Ms, {
                                          className: "opacity-0 !bg-accent-300",
                                        }),
                                      }),
                                      (0, a.jsx)(eS.gs, {
                                        ml: "-0.1rem",
                                        border: "none",
                                        bg: "transparent",
                                        _focus: { boxShadow: "none" },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundImage:
                                          "url('/icon/icon_arrow_up.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        mt: "1.5rem",
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                              (0, a.jsx)(X.xu, {
                                className: "flex justify-end mt-8 pr-8",
                                children: (0, a.jsx)(q.z, {
                                  variant: "unstyled",
                                  className: "main-btn",
                                  onClick: () => {
                                    U();
                                  },
                                  children: L("603"),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsxs)(X.xu, {
                      className: "panel-main-fg p-4 mx-2 mb-2",
                      children: [
                        (0, a.jsxs)(X.xu, {
                          className: "pb-4 flex items-center",
                          children: [
                            (0, a.jsx)("span", { children: L("607") }),
                            (0, a.jsx)(X.xu, {
                              className: "relative ml-4 group",
                              children: (0, a.jsx)(eK.u, {
                                minW: "24rem",
                                label: (0, a.jsx)(X.xu, {
                                  className: "p-3",
                                  children: (0, a.jsx)("p", {
                                    className: "py-1",
                                    children: L("608"),
                                  }),
                                }),
                                children: (0, a.jsx)("span", {
                                  children: (0, a.jsx)(eM, {}),
                                }),
                              }),
                            }),
                          ],
                        }),
                        (0, a.jsx)(ei.E, {
                          className: "flex flex-row gap-8",
                          value: s + "",
                          onChange: (e) => V(parseInt(e)),
                          children:
                            null == l
                              ? void 0
                              : l.map((e, t) =>
                                  (0, a.jsxs)(
                                    X.xu,
                                    {
                                      className:
                                        "w-24 h-10 flex items-center justify-center rounded-md border-2 cursor-pointer text-sm text-center bg-[var(--dark-bg)] ".concat(
                                          s === t
                                            ? "border-[var(--data-selected-highlight-color)]"
                                            : "border-[var(--report-rate-default-border)]",
                                        ),
                                      onClick: () => V(t),
                                      children: [e, " Hz"],
                                    },
                                    t,
                                  ),
                                ),
                        }),
                      ],
                    }),
                    (0, a.jsx)(X.xu, {
                      className: "p-2",
                      children: (0, a.jsxs)(Q.k, {
                        w: "100%",
                        gap: "0.5rem",
                        children: [
                          (0, a.jsxs)("div", {
                            className:
                              "panel-main-fg flex-1  p-[7rem] relative",
                            children: [
                              " ",
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium",
                                children: L("610"),
                              }),
                              (0, a.jsx)("div", {
                                className: "absolute top-20 left-6 text-white",
                                children: (0, a.jsxs)(Q.k, {
                                  direction: "column",
                                  gap: "6",
                                  children: [
                                    (0, a.jsxs)(Q.k, {
                                      direction: "row",
                                      gap: "6",
                                      children: [
                                        (0, a.jsx)(eb.X, {
                                          isChecked: (1 & u) != 0,
                                          onChange: (e) =>
                                            H(1, !!e.target.checked),
                                          children: L("616"),
                                        }),
                                        (0, a.jsx)(eb.X, {
                                          isChecked: (16 & u) != 0,
                                          onChange: (e) =>
                                            H(16, !!e.target.checked),
                                          children: L("617"),
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)(eb.X, {
                                      isChecked: (32 & u) != 0,
                                      onChange: (e) =>
                                        H(32, !!e.target.checked),
                                      children: L("618"),
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "panel-main-fg flex-1 p-[7rem] relative",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium flex items-center",
                                children: (0, a.jsx)("span", {
                                  children: L("620"),
                                }),
                              }),
                              (0, a.jsx)("div", {
                                className: "absolute top-20 left-6 text-white",
                                children: (0, a.jsx)(ei.E, {
                                  defaultValue: p,
                                  value: p,
                                  onChange: (e) => {
                                    let t = 1;
                                    ("2" == e ? ((t = 2), x("2")) : x("1"),
                                      S &&
                                        T &&
                                        ((T.lod_value = t),
                                        O(T),
                                        null == S || S.setMouseConfigData(T)));
                                  },
                                  children: (0, a.jsxs)(Q.k, {
                                    direction: "row",
                                    gap: "6",
                                    children: [
                                      (0, a.jsx)(er.Y, {
                                        value: "1",
                                        children: "1.0mm",
                                      }),
                                      (0, a.jsx)(er.Y, {
                                        value: "2",
                                        children: "2.0mm",
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className: "panel-main-fg flex-1 p-[7rem] relative",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium flex items-center",
                                children: (0, a.jsxs)("span", {
                                  children: [" ", L("625")],
                                }),
                              }),
                              (0, a.jsx)("div", {
                                className: "absolute top-20 left-6 text-white",
                                children: (0, a.jsx)(ei.E, {
                                  defaultValue: C,
                                  value: C,
                                  onChange: (e) => {
                                    let t = 0;
                                    ("1" == e ? ((t = 1), _("1")) : _("0"),
                                      S &&
                                        T &&
                                        ((T.scroll_flag = t),
                                        O(T),
                                        null == S || S.setMouseConfigData(T)));
                                  },
                                  children: (0, a.jsxs)(Q.k, {
                                    direction: "row",
                                    gap: "6",
                                    children: [
                                      (0, a.jsx)(er.Y, {
                                        value: "0",
                                        children: L("626"),
                                      }),
                                      (0, a.jsx)(er.Y, {
                                        value: "1",
                                        children: L("627"),
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "panel-main-fg flex-1  p-[6.5rem] relative ",
                            children: [
                              "  ",
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium",
                                children: L("633"),
                              }),
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-16 left-6 w-[70%] text-white",
                                children: (0, a.jsx)(ev, {
                                  select: g,
                                  options: [
                                    { name: "1" + L("636"), value: 1 },
                                    { name: "3" + L("636"), value: 3 },
                                    { name: "5" + L("636"), value: 5 },
                                    { name: "10" + L("636"), value: 10 },
                                    { name: "20" + L("636"), value: 20 },
                                    { name: "30" + L("636"), value: 30 },
                                    { name: "60" + L("636"), value: 60 },
                                  ],
                                  onChange: (e) => {
                                    Y(e);
                                  },
                                }),
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "panel-main-fg flex-1 p-[7rem] relative",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium flex items-center",
                                children: (0, a.jsxs)("span", {
                                  children: [" ", L("630")],
                                }),
                              }),
                              (0, a.jsxs)("div", {
                                className: "absolute top-20 left-6 text-white",
                                children: [
                                  (0, a.jsx)(Q.k, {
                                    direction: "row",
                                    gap: "6",
                                    children: (0, a.jsx)(eb.X, {
                                      value: "1",
                                      isChecked: f,
                                      onChange: (e) => W(!!e.target.checked),
                                      children: L("631"),
                                    }),
                                  }),
                                  (0, a.jsx)(Q.k, {
                                    direction: "row",
                                    gap: "6",
                                    className: "mt-4",
                                    children: (0, a.jsx)(eb.X, {
                                      value: "1",
                                      isChecked: w,
                                      onChange: (e) => G(!!e.target.checked),
                                      children: L("632"),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className:
                              "panel-main-fg flex-1  p-[6.5rem] relative",
                            children: [
                              "  ",
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-4 left-6 text-white font-medium",
                                children: L("700"),
                              }),
                              (0, a.jsx)("div", {
                                className:
                                  "absolute top-16 left-6 w-[70%] text-white",
                                children: (0, a.jsx)(ev, {
                                  select: K,
                                  options: [
                                    { name: L("701"), value: 1 },
                                    { name: L("702"), value: 2 },
                                    { name: L("703"), value: 3 },
                                    { name: L("704"), value: 4 },
                                    { name: L("705"), value: 5 },
                                    { name: L("706"), value: 6 },
                                    { name: L("707"), value: 0 },
                                  ],
                                  onChange: (e) => {
                                    J(e);
                                  },
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
              (0, a.jsx)(X.xu, {
                className: "margin-left: 50rem",
                children: (0, a.jsx)(eo, {}),
              }),
            ],
          });
        },
        ek = n(707),
        eF = n(7328),
        eL = n(4187),
        eP = n(9367),
        eE = function (e) {
          let {
              finishEdit: t = () => {},
              startEdit: n = () => {},
              value: o = "",
              isEditMode: c = !1,
            } = e,
            s = (e) => {
              t(e);
            };
          return c
            ? (0, a.jsx)(eP.m.form, {
                onSubmit: (e) => {
                  (e.preventDefault(), s(e.target.elements.editName.value));
                },
                children: (0, a.jsx)(eP.m.input, {
                  name: "editName",
                  autoFocus: !0,
                  autoComplete: "off",
                  onBlur: (e) => s(e.target.value),
                  w: "100%",
                  _focus: { outline: "none", backgroundColor: "transparent" },
                  defaultValue: o,
                }),
              })
            : (0, a.jsx)(eP.m.div, {
                onDoubleClick: () => n(),
                w: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                children: o,
              });
        },
        eT = n(6350),
        eO = function (e) {
          let { name: t, onChange: n = () => {}, onDelete: c = () => {} } = e,
            [s, d] = (0, eT.k)(),
            { t: l } = (0, o.useContext)(z);
          return (0, a.jsxs)(a.Fragment, {
            children: [
              (0, a.jsx)(eE, {
                value: t,
                isEditMode: s,
                startEdit: d.on,
                finishEdit: (e) => {
                  ((e = e.slice(0, 32)), d.off(), n(e));
                },
              }),
              (0, a.jsxs)(ex.v, {
                children: [
                  (0, a.jsx)(eC.j, {
                    className: " hover:cursor-context-menu",
                    children: (0, a.jsx)("svg", {
                      className: "w-5",
                      viewBox: "0 0 1024 1024",
                      version: "1.1",
                      xmlns: "http://www.w3.org/2000/svg",
                      "p-id": "26745",
                      width: "32",
                      height: "32",
                      children: (0, a.jsx)("path", {
                        d: "M512 128c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333334 85.333333-38.4 85.333333-85.333334-38.4-85.333333-85.333333-85.333333z m0 597.333333c-46.933333 0-85.333333 38.4-85.333333 85.333334s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333334z m0-298.666666c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z",
                        "p-id": "26746",
                        fill: "#aaaaaa",
                      }),
                    }),
                  }),
                  (0, a.jsxs)(e_.q, {
                    minW: "5rem",
                    p: 0,
                    overflow: "hidden",
                    className: "font-normal text-md !text-gray-800",
                    children: [
                      (0, a.jsx)(eg.s, {
                        onClick: () => d.on(),
                        children: l("506"),
                      }),
                      (0, a.jsx)(eg.s, {
                        onClick: () => c && c(),
                        children: l("505"),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        };
      let eI = (e) => {
          let t = Array(64).fill(0).concat(Array(4032).fill(0)),
            n = 64;
          e.map((e, a) => {
            if (0 == e.list.length) return;
            let [o, c] = C(n);
            ((t[2 * a] = o),
              (t[2 * a + 1] = c),
              e.list.map((a, o) => {
                let c = 0;
                (1 == a.action && (c |= 64),
                  1 == a.type && (c |= 3),
                  2 == a.type && (c |= 2),
                  3 == a.type && (c |= 4),
                  o == e.list.length - 1 && (c |= 128));
                let [s, d] = C(a.delay || 0);
                ((t[n + 4 * o] = s),
                  (t[n + 4 * o + 1] = d),
                  (t[n + 4 * o + 2] = c),
                  (t[n + 4 * o + 3] = a.code));
              }),
              (n += 4 * e.list.length));
          });
          let a = n;
          return t.slice(0, a);
        },
        eR = (e, t, n, a) => {
          let o = eA(t);
          if (!(e.length > 0)) return [{ ...o, time: n, delay: 0 }];
          {
            let t = e.at(-1);
            if (void 0 === t) return [];
            {
              let c = e.slice(0, -1),
                s = [
                  { ...t, delay: a >= 0 ? a : n - (t.time || 0) },
                  { ...o, time: n, delay: 0 },
                ];
              return c.length > 0 ? [...c, ...s] : s;
            }
          }
        },
        eA = (e) => {
          if (e instanceof MouseEvent) {
            let t =
                [
                  "Mouse L",
                  "Mouse M",
                  "Mouse R",
                  "Mouse Backward",
                  "Mouse Forward",
                ][e.button] || e.button + "",
              n = [1, 4, 2, 8, 16][e.button] || e.button,
              a = "mousedown" == e.type ? 1 : 2,
              o = {};
            return (
              (o.name = t),
              (o.code = n),
              (o.type = 1),
              (o.action = a),
              o
            );
          }
          {
            let t = e.key.toUpperCase();
            " " === t && (t = "Space");
            let n = T[e.code],
              a = "keydown" == e.type ? 1 : 2,
              o = {};
            return (
              (o.name = t),
              (o.code = n),
              (o.type = 2),
              (o.action = a),
              o
            );
          }
        };
      var ez = (e) => {
          let { action: t, index: n, onNameChange: c } = e,
            [s, d] = (0, o.useState)(!1),
            [l, i] = (0, o.useState)(t.name);
          (0, o.useEffect)(() => {
            i(t.name);
          }, [t.name]);
          let r = (e) => {
            d(!1);
          };
          return (0, a.jsx)("div", {
            className: "text-sm text-center",
            onDoubleClick: (e) => {
              d(!0);
            },
            onMouseDown:
              1 === t.type
                ? (e) => {
                    let t = eA(e.nativeEvent);
                    t && (t.name != l && (i(t.name), c(n, t)), d(!1));
                  }
                : void 0,
            onKeyDown:
              2 === t.type
                ? (e) => {
                    let t = eA(e.nativeEvent);
                    (t.name != l && (i(t.name), c(n, t)), d(!1));
                  }
                : void 0,
            onBlur: r,
            tabIndex: 0,
            children: s
              ? (0, a.jsx)("div", {
                  className: "border-red-500 border-2 p-1",
                  children: (0, a.jsx)("input", {
                    type: "text",
                    value: l,
                    onChange: (e) => i(e.target.value),
                    onKeyDown: (e) => {
                      "Enter" === e.key && (c(n, l), d(!1));
                    },
                    onBlur: r,
                    autoFocus: !0,
                  }),
                })
              : (0, a.jsx)("div", { children: l }),
          });
        },
        eB = function (e) {
          let { startRecord: t, list: n, onChange: c } = e,
            [s, d] = (0, o.useState)(-1),
            l = (0, o.useRef)(null),
            [i, r] = (0, o.useState)(0);
          (0, o.useEffect)(() => {
            (i < n.length &&
              l.current &&
              (l.current.scrollTop = l.current.scrollHeight),
              r(n.length));
          }, [n]);
          let m = (e) => {
              "mouse" == e
                ? c([
                    ...n,
                    {
                      name: "Mouse L",
                      code: 1,
                      type: 1,
                      action: 1,
                      time: 0,
                      delay: 10,
                    },
                    {
                      name: "Mouse L",
                      code: 1,
                      type: 1,
                      action: 2,
                      time: 0,
                      delay: 10,
                    },
                  ])
                : c([
                    ...n,
                    {
                      name: "A",
                      code: 4,
                      type: 2,
                      action: 1,
                      time: 0,
                      delay: 10,
                    },
                    {
                      name: "A",
                      code: 4,
                      type: 2,
                      action: 2,
                      time: 0,
                      delay: 10,
                    },
                  ]);
            },
            u = () => {
              if (0 == n.length) return;
              console.log(s, n);
              let e = n.filter((e, t) => t !== s);
              (console.log(s, e), (n = e), c(e), d(s));
            },
            h = () => {
              if (0 == n.length) return;
              let e = [];
              ((n = e), c(e), d(-1));
            },
            p = () => {
              if (0 != n.length && 0 != s) {
                let e = n[s - 1],
                  t = n[s];
                (c([...n.slice(0, s - 1), t, e, ...n.slice(s + 1)]), d(s - 1));
              }
            },
            x = () => {
              if (0 != n.length && s != n.length - 1) {
                let e = n[s],
                  t = n[s + 1];
                (c([...n.slice(0, s), t, e, ...n.slice(s + 2)]), d(s + 1));
              }
            },
            C = () => {
              0 != n.length && 0 != s && (c([n.splice(s, 1)[0], ...n]), d(0));
            },
            _ = () => {
              if (0 != n.length && s != n.length - 1) {
                let e = n.splice(s, 1)[0];
                (c([...n, e]), d(n.length));
              }
            },
            g = (e, t) => {
              c(n.map((n, a) => (a == t ? { ...n, delay: e } : n)));
            },
            { t: v } = (0, o.useContext)(z);
          return (0, a.jsxs)("div", {
            className: "p-0 macro-action-list",
            children: [
              (0, a.jsxs)("div", {
                className: "listTitle h-9",
                children: [
                  (0, a.jsx)("div", { children: v("529") }),
                  (0, a.jsx)("div", { children: v("531") }),
                  (0, a.jsx)("div", { children: v("532") }),
                  (0, a.jsx)("div", { children: v("533") }),
                  (0, a.jsx)("div", { children: v("534") }),
                ],
              }),
              (0, a.jsx)("ul", {
                ref: l,
                className:
                  "min-h-[363px] panel-main-fg max-h-[363px] overflow-y-auto mt-1",
                children: n.map((e, t) =>
                  (0, a.jsxs)(
                    "li",
                    {
                      className: "",
                      onClick: () => {
                        d(t);
                      },
                      "data-selected": t == s,
                      onContextMenu: () => {},
                      children: [
                        (0, a.jsx)("div", {
                          children: 1 == e.type ? v("527") : v("528"),
                        }),
                        (0, a.jsx)("div", {
                          children: (0, a.jsx)(ez, {
                            action: e,
                            index: t,
                            onNameChange: (e, t) => {
                              c(
                                n.map((n, a) =>
                                  e == a
                                    ? {
                                        ...n,
                                        name: t.name,
                                        code: t.code,
                                        type: t.type,
                                      }
                                    : n,
                                ),
                              );
                            },
                          }),
                        }),
                        (0, a.jsx)("div", {
                          children: 1 == e.action ? v("525") : v("526"),
                        }),
                        (0, a.jsx)("div", {
                          children: (0, a.jsx)(eN.Y2, {
                            className: "!border-none",
                            value: e.delay,
                            onClick: (e) => {
                              e.target.select();
                            },
                            onBlur: (e) => {},
                            onChange: (e, n) => {
                              g(n, t);
                            },
                            children: (0, a.jsx)(eN.zu, {
                              border: "none",
                              padding: 0,
                              textAlign: "right",
                            }),
                          }),
                        }),
                        (0, a.jsx)("div", {
                          className: "h-5",
                          children: (0, a.jsxs)(ex.v, {
                            children: [
                              (0, a.jsx)(eC.j, {
                                children: (0, a.jsx)("svg", {
                                  className: "h-5",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "25981",
                                  width: "32",
                                  height: "32",
                                  children: (0, a.jsx)("path", {
                                    d: "M512 128c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333334 85.333333-38.4 85.333333-85.333334-38.4-85.333333-85.333333-85.333333z m0 597.333333c-46.933333 0-85.333333 38.4-85.333333 85.333334s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333334z m0-298.666666c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z",
                                    "p-id": "25982",
                                    fill: "#e6e6e6",
                                  }),
                                }),
                              }),
                              (0, a.jsxs)(e_.q, {
                                p: 0,
                                color: "gray",
                                overflow: "hidden",
                                fontSize: ".85rem",
                                minW: "3.5rem",
                                textAlign: "center",
                                borderRadius: "2px",
                                children: [
                                  (0, a.jsx)(eg.s, {
                                    onClick: () => C(),
                                    children: v("535"),
                                  }),
                                  (0, a.jsx)(eg.s, {
                                    onClick: () => p(),
                                    children: v("536"),
                                  }),
                                  (0, a.jsx)(eg.s, {
                                    onClick: () => x(),
                                    children: v("537"),
                                  }),
                                  (0, a.jsx)(eg.s, {
                                    onClick: () => _(),
                                    children: v("538"),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    t,
                  ),
                ),
              }),
              (0, a.jsxs)(Q.k, {
                flexDirection: "row-reverse",
                w: "100%",
                gap: ".5rem",
                className: "py-2",
                children: [
                  (0, a.jsx)(q.z, {
                    className: "main-btn !px-6 !text-white",
                    isDisabled: t,
                    onClick: () => u(),
                    children: v("505"),
                  }),
                  (0, a.jsx)(q.z, {
                    className: "main-btn !px-6 !text-white",
                    isDisabled: t,
                    onClick: () => h(),
                    children: v("507"),
                  }),
                  (0, a.jsx)(q.z, {
                    className: "main-btn !px-6 !text-white",
                    isDisabled: t,
                    onClick: () => m("keyBoard"),
                    children: v("539"),
                  }),
                  (0, a.jsx)(q.z, {
                    className: "main-btn !px-6!text-white",
                    isDisabled: t,
                    onClick: () => m("mouse"),
                    children: v("540"),
                  }),
                ],
              }),
            ],
          });
        },
        eU = function () {
          let [e, t] = (0, o.useState)(!1),
            n = (0, o.useRef)(null),
            [c, s] = (0, o.useState)(!1),
            [d, l] = (0, o.useState)(10),
            [i, r] = (0, o.useState)("1"),
            [m, u] = (0, o.useState)(10),
            [h, p] = (0, o.useState)("0"),
            [x, C] = (0, o.useState)(-1),
            {
              macroProfiles: _,
              setMacroProfiles: g,
              currentSelectMacroProfile: v,
              setCurrentSelectMacroProfile: f,
              connectedMouse: y,
              t: K,
            } = (0, o.useContext)(z),
            [j, w] = (0, o.useState)([]),
            N = (0, o.useRef)(j),
            S = (0, o.useRef)(!1),
            b = (0, o.useRef)(null),
            [M, D] = (0, o.useState)(0);
          ((0, o.useEffect)(() => {
            (_.length > v ? w(_[v].list) : w([]),
              M < _.length &&
                b.current &&
                (b.current.scrollTop = b.current.scrollHeight),
              D(_.length));
          }, [v, _]),
            (0, o.useEffect)(() => {
              console.log("macroProfiles", _);
              let e = eI(_);
              null == y || y.setMacroData(e);
            }, [_]),
            (0, o.useEffect)(() => {
              let e = () => {
                  S.current ||
                    ((S.current = !0),
                    requestAnimationFrame(() => {
                      (w([...N.current]), (S.current = !1));
                    }));
                },
                t = (t) => {
                  if ((t.preventDefault(), t instanceof KeyboardEvent)) {
                    if (t.repeat) return;
                    let n = Math.floor(t.timeStamp),
                      a = "0" == i ? 0 : "1" == i ? -1 : d;
                    ((N.current = eR(N.current, t, n, a)), e());
                  } else {
                    if (t.target instanceof HTMLButtonElement) {
                      var n, a;
                      if (
                        null === (a = t.target) || void 0 === a
                          ? void 0
                          : null === (n = a.classList) || void 0 === n
                            ? void 0
                            : n.contains("btn-record")
                      )
                        return;
                    }
                    let o = Math.floor(t.timeStamp),
                      c = "0" == i ? 0 : "1" == i ? -1 : d;
                    ((N.current = eR(N.current, t, o, c)), e());
                  }
                };
              return (
                (window.oncontextmenu = (e) => {
                  e.preventDefault();
                }),
                c
                  ? (window.document.addEventListener("keydown", t),
                    window.document.addEventListener("keyup", t),
                    window.document.addEventListener("mousedown", t),
                    window.document.addEventListener("mouseup", t))
                  : (window.document.removeEventListener("keydown", t),
                    window.document.removeEventListener("keyup", t),
                    window.document.removeEventListener("mousedown", t),
                    window.document.removeEventListener("mouseup", t)),
                () => {
                  (window.document.removeEventListener("keydown", t),
                    window.document.removeEventListener("keyup", t),
                    window.document.removeEventListener("mousedown", t),
                    window.document.removeEventListener("mouseup", t));
                }
              );
            }, [c]));
          let k = () => {
              _.length >= 32 ||
                (g([
                  ..._,
                  { name: K("530") + (_.length + 1), type: "0", list: [] },
                ]),
                f(_.length));
            },
            F = (e, t) => {
              g((n) => n.map((n, a) => (e == a ? { ...n, name: t } : n)));
            },
            L = (e) => {
              (f(Math.min(v, _.length - 1)),
                g((t) => t.filter((t, n) => n !== e)),
                console.log("deleteProfile", e, _.length));
            },
            P = (e) => {
              g((t) => t.map((t, n) => (n == v ? { ...t, list: e } : t)));
            },
            E = () => (
              s(!c),
              g((e) => e.map((e, t) => (t == v ? { ...e, list: j } : e))),
              (N.current = j),
              !1
            );
          return (
            (0, o.useEffect)(() => {
              _.length
                ? localStorage.setItem("mouse_macro", JSON.stringify(_))
                : localStorage.removeItem("mouse_macro");
            }, [_]),
            (0, o.useEffect)(() => {
              (async () => {
                let e = await localStorage.getItem("mouse_macro");
                if (e) {
                  let t = JSON.parse(e);
                  t.length > 0 && (g(t), t[0] && f(0));
                }
              })();
            }, []),
            (0, a.jsxs)(Q.k, {
              w: "100%",
              gap: "0.5rem",
              position: "relative",
              children: [
                (0, a.jsx)(ea.E.div, {
                  style: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: {
                    duration: 0.3,
                    delay: 0.1,
                    timeConstant: "ease-out",
                  },
                  children: (0, a.jsxs)(X.xu, {
                    className: "panel-main-bg",
                    h: "max-content",
                    children: [
                      (0, a.jsxs)(Q.k, {
                        alignItems: "center",
                        w: "100%",
                        className: "panel-main-fg px-4 gap-1",
                        children: [
                          (0, a.jsx)(X.xu, {
                            children: (0, a.jsx)("svg", {
                              className: "w-5",
                              viewBox: "0 0 1024 1024",
                              version: "1.1",
                              xmlns: "http://www.w3.org/2000/svg",
                              "p-id": "27537",
                              width: "48",
                              height: "48",
                              children: (0, a.jsx)("path", {
                                d: "M896 768v128h-85.333333v-128h-85.333334v-85.333333h256v85.333333h-85.333333zM213.333333 768v128H128v-128H42.666667v-85.333333h256v85.333333H213.333333z m256-512V128h85.333334v128h85.333333v85.333333H384V256h85.333333z m0 170.666667h85.333334v469.333333h-85.333334V426.666667z m-341.333333 170.666666V128h85.333333v469.333333H128z m682.666667 0V128h85.333333v469.333333h-85.333333z",
                                "p-id": "27538",
                                fill: "#e6e6e6",
                              }),
                            }),
                          }),
                          (0, a.jsx)(X.xu, {
                            className: "font-medium w-64",
                            children: K("500"),
                          }),
                        ],
                      }),
                      (0, a.jsx)(X.xu, {
                        children: (0, a.jsxs)(X.xu, {
                          className: "macro-list p-2 rounded",
                          children: [
                            (0, a.jsx)("ul", {
                              ref: b,
                              className:
                                "h-[400px] panel-main-fg overflow-auto",
                              children: _.map((e, t) =>
                                (0, a.jsx)(
                                  "li",
                                  {
                                    "data-selected": t == v,
                                    className:
                                      "flex justify-between items-center hover:cursor-pointer",
                                    onClick: () => f(t),
                                    children: (0, a.jsx)(eO, {
                                      name: e.name,
                                      onChange: (e) => {
                                        F(t, e);
                                      },
                                      onDelete: () => L(t),
                                    }),
                                  },
                                  t,
                                ),
                              ),
                            }),
                            (0, a.jsx)(ek.r, {
                              templateColumns: "1fr 1fr 1fr",
                              gap: "0.5rem",
                              className: "py-2",
                              justifyContent: "center",
                              children: (0, a.jsx)(q.z, {
                                className: "main-btn",
                                variant: "unstyled",
                                isDisabled: c,
                                onClick: () => {
                                  (console.log("addMacro", c),
                                    c || (console.log("addMacro1", c), k()));
                                },
                                children: K("501"),
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(ea.E.div, {
                  style: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: {
                    duration: 0.3,
                    delay: 0.2,
                    timeConstant: "ease-out",
                  },
                  children: (0, a.jsxs)(X.xu, {
                    as: ea.E.div,
                    style: { opacity: 0, scale: 1.05 },
                    animate: { opacity: 1, scale: 1 },
                    className: "panel-main-bg",
                    h: "max-content",
                    w: "500px",
                    children: [
                      (0, a.jsxs)(Q.k, {
                        alignItems: "center",
                        w: "100%",
                        className: "panel-main-fg px-4 gap-1",
                        children: [
                          (0, a.jsx)(X.xu, {
                            children: (0, a.jsx)("svg", {
                              className: "w-5",
                              viewBox: "0 0 1024 1024",
                              version: "1.1",
                              xmlns: "http://www.w3.org/2000/svg",
                              "p-id": "27537",
                              width: "48",
                              height: "48",
                              children: (0, a.jsx)("path", {
                                d: "M896 768v128h-85.333333v-128h-85.333334v-85.333333h256v85.333333h-85.333333zM213.333333 768v128H128v-128H42.666667v-85.333333h256v85.333333H213.333333z m256-512V128h85.333334v128h85.333333v85.333333H384V256h85.333333z m0 170.666667h85.333334v469.333333h-85.333334V426.666667z m-341.333333 170.666666V128h85.333333v469.333333H128z m682.666667 0V128h85.333333v469.333333h-85.333333z",
                                "p-id": "27538",
                                fill: "#e6e6e6",
                              }),
                            }),
                          }),
                          (0, a.jsx)(X.xu, {
                            className: "font-medium w-80",
                            children: K("510"),
                          }),
                        ],
                      }),
                      (0, a.jsx)(X.xu, {
                        className: "p-2",
                        children: (0, a.jsx)(eB, {
                          startRecord: c,
                          list: j,
                          onChange: (e) => {
                            (console.log("changeMacroAction", e), w(e), P(e));
                          },
                        }),
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(ea.E.div, {
                  style: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: {
                    duration: 0.3,
                    delay: 0.4,
                    timeConstant: "ease-out",
                  },
                  children: (0, a.jsxs)(X.xu, {
                    as: ea.E.div,
                    className: "panel-main-bg",
                    w: "20rem",
                    children: [
                      (0, a.jsx)(X.xu, {
                        className: "p-2",
                        children: (0, a.jsxs)(q.z, {
                          w: "100%",
                          className: "main-btn btn-record !text-white",
                          _focusVisible: { boxShadow: "none" },
                          onClick: () => (0 === _.length ? (t(!0), !1) : E()),
                          children: [
                            (0, a.jsx)("span", {
                              className: "w-4 h-4 mr-2 ".concat(
                                c ? "rounded-none" : "rounded-full",
                                " bg-red-500",
                              ),
                            }),
                            c ? K("520") : K("521"),
                          ],
                        }),
                      }),
                      (0, a.jsx)(X.xu, {
                        className: "px-2 pb-2 flex flex-col gap-2",
                        children: (0, a.jsxs)(X.xu, {
                          className: "p-3 panel-main-fg",
                          children: [
                            (0, a.jsx)(X.xu, {
                              className: "pb-3",
                              children: K("511"),
                            }),
                            (0, a.jsx)(ei.E, {
                              defaultValue: i,
                              onChange: (e) => r(e),
                              children: (0, a.jsxs)(Q.k, {
                                flexDirection: "column",
                                rowGap: "0.8rem",
                                children: [
                                  (0, a.jsx)(er.Y, {
                                    value: "0",
                                    children: K("512"),
                                  }),
                                  (0, a.jsx)(er.Y, {
                                    value: "1",
                                    children: K("513"),
                                  }),
                                  (0, a.jsxs)(Q.k, {
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    children: [
                                      (0, a.jsx)(er.Y, {
                                        value: "2",
                                        children: K("514"),
                                      }),
                                      (0, a.jsxs)(eF.B, {
                                        w: "6rem",
                                        children: [
                                          (0, a.jsx)(em.I, {
                                            defaultValue: d,
                                            onBlur: (e) => {
                                              let t = parseInt(e.target.value);
                                              t < 10
                                                ? (l(10),
                                                  (e.target.value = "10"))
                                                : l(t);
                                            },
                                            w: "auto",
                                            h: "2rem",
                                            variant: "unstyled",
                                            className:
                                              "!bg-[#184FB652] !rounded-none !pl-3",
                                            min: 10,
                                            max: 24000,
                                          }),
                                          (0, a.jsx)(eL.x, {
                                            children: (0, a.jsx)(X.xu, {
                                              className: "h-8",
                                              children: "ms",
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(X.xu, {
                  className: "absolute top-0 left-1/3 w-2/3 h-full -z-10",
                  children: (0, a.jsx)(eo, {}),
                }),
                (0, a.jsx)(J.h, {
                  children: (0, a.jsx)(Z.a, {
                    isOpen: e,
                    leastDestructiveRef: n,
                    onClose: () => t(!1),
                    isCentered: !0,
                    children: (0, a.jsx)($.Z, {
                      children: (0, a.jsxs)(Z._, {
                        className: "!bg-gray-700/90",
                        children: [
                          (0, a.jsx)(ee.x, {
                            fontSize: "lg",
                            fontWeight: "bold",
                            children: K("521"),
                          }),
                          (0, a.jsx)(et.f, { children: K("541") }),
                          (0, a.jsx)(en.m, {
                            children: (0, a.jsx)(q.z, {
                              ref: n,
                              className: "main-btn",
                              onClick: () => t(!1),
                              ml: 3,
                              children: K("222"),
                            }),
                          }),
                        ],
                      }),
                    }),
                  }),
                }),
              ],
            })
          );
        },
        eV = function () {
          let { t: e } = (0, o.useContext)(z),
            { changeLanguage: t, i18n: n } = L("common"),
            {
              battery: c,
              chargeFlag: s,
              connectMode: d,
              connectedMouse: l,
              initAllMouseData: i,
              restoreFactorySettings: r,
            } = (0, o.useContext)(z),
            { isOpen: m, onOpen: u, onClose: h } = (0, G.q)(),
            p = (0, o.useRef)(null),
            x = async (e) => {
              (t(e), await i(l));
            },
            C = async () => {
              (await r(l), h());
            };
          return (0, a.jsxs)(X.xu, {
            className: "header",
            children: [
              (0, a.jsxs)(X.xu, {
                className: "flex items-center gap-4",
                children: [
                  (0, a.jsx)(X.xu, {
                    className: "text-sm",
                    children: e("60") + ": " + e("10"),
                  }),
                  (0, a.jsx)(X.xu, { className: "text-sm", children: " | " }),
                  (0, a.jsx)(X.xu, {
                    className: "text-sm",
                    children: e("61") + d,
                  }),
                  (0, a.jsx)(X.xu, { className: "text-sm", children: " | " }),
                  (0, a.jsx)(X.xu, {
                    className: "text-sm",
                    children: e(s ? "63" : "62"),
                  }),
                  (0, a.jsxs)(X.xu, {
                    className: "relative",
                    children: [
                      (0, a.jsx)("svg", {
                        className: "w-8",
                        viewBox: "0 0 1316 1024",
                        version: "1.1",
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "32",
                        height: "32",
                        children: (0, a.jsx)("path", {
                          d: "M1243.428571 329.142857c40.557714 0 73.142857 32.585143 73.142858 73.142857v219.428572c0 40.557714-32.585143 73.142857-73.142858 73.142857v91.428571c0 50.285714-41.142857 91.428571-91.428571 91.428572h-1060.571429A91.684571 91.684571 0 0 1 0 786.285714v-548.571428C0 187.428571 41.142857 146.285714 91.428571 146.285714h1060.571429C1202.285714 146.285714 1243.428571 187.428571 1243.428571 237.714286V329.142857z m0 292.571429v-219.428572h-73.142857V237.714286c0-10.276571-8.009143-18.285714-18.285714-18.285715h-1060.571429c-10.276571 0-18.285714 8.009143-18.285714 18.285715v548.571428c0 10.276571 8.009143 18.285714 18.285714 18.285715h1060.571429c10.276571 0 18.285714-8.009143 18.285714-18.285715V621.714286h73.142857z",
                          fill: "#16DFFF",
                        }),
                      }),
                      (0, a.jsx)("div", {
                        className: "absolute left-0 top-2.5 flex space-x-1",
                        children: Array.from({ length: 4 }).map((e, t) =>
                          (0, a.jsx)(
                            X.xu,
                            {
                              w: Math.floor((c / 100) * 4) > t ? "4px" : "0",
                              className: "bg-[#16DFFF] h-3",
                            },
                            t,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(X.xu, {
                className: "flex justify-center items-center w-32",
                style: { transform: "translateX(-107px)" },
                children: (0, a.jsx)(X.xu, {
                  className: "w-32",
                  children: (0, a.jsx)(Y.E, {
                    src: "top_logo.png",
                    alt: "logo",
                  }),
                }),
              }),
              (0, a.jsxs)(X.xu, {
                className: "flex items-center gap-4",
                children: [
                  (0, a.jsx)(X.xu, {
                    children: (0, a.jsxs)(ex.v, {
                      children: [
                        (0, a.jsx)(eC.j, {
                          as: q.z,
                          className: "main-btn",
                          children:
                            "cn" === n.resolvedLanguage ? "中文" : "English",
                        }),
                        (0, a.jsxs)(e_.q, {
                          padding: 0,
                          className:
                            "!bg-gray-900 border border-gray-700 rounded-md",
                          children: [
                            (0, a.jsx)(eg.s, {
                              className: "select-menu-item",
                              onClick: () => x("cn"),
                              children: "中文",
                            }),
                            (0, a.jsx)(eg.s, {
                              className: "select-menu-item",
                              onClick: () => x("en"),
                              children: "English",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)(X.xu, {
                    children: (0, a.jsx)(q.z, {
                      className: "main-btn",
                      onClick: u,
                      children: e("202"),
                    }),
                  }),
                ],
              }),
              (0, a.jsx)(Z.a, {
                isOpen: m,
                leastDestructiveRef: p,
                onClose: h,
                children: (0, a.jsx)($.Z, {
                  children: (0, a.jsxs)(Z._, {
                    bg: "black",
                    color: "white",
                    children: [
                      (0, a.jsx)(ee.x, {
                        fontSize: "lg",
                        fontWeight: "bold",
                        children: e("213"),
                      }),
                      (0, a.jsx)(et.f, { children: e("212") }),
                      (0, a.jsxs)(en.m, {
                        children: [
                          (0, a.jsx)(q.z, {
                            ref: p,
                            onClick: h,
                            children: e("211"),
                          }),
                          (0, a.jsx)(q.z, {
                            colorScheme: "red",
                            onClick: C,
                            ml: 3,
                            children: e("210"),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            ],
          });
        },
        eH = n(209),
        eW = n(8340),
        eQ = n(4077),
        eX = function (e) {
          let { name: t, image: n } = e;
          return (0, a.jsxs)(Q.k, {
            direction: "column",
            gap: "1rem",
            alignItems: "center",
            className: "product-card",
            whileHover: { y: -5 },
            as: ea.E.div,
            children: [
              (0, a.jsx)(Y.E, { src: "/products/".concat(n), w: "10rem" }),
              (0, a.jsx)(X.xu, { children: t }),
            ],
          });
        },
        eG = JSON.parse(
          '{"R":[{"name":"DFveloper DF-MS01 Pro ","image":"mouse_aoc_gm220.png","light":false,"filter":[{"usagePage":65281,"usage":1}]}]}',
        ),
        eY = function () {
          let { connectMouse: e, t } = (0, o.useContext)(z),
            n = (0, G.q)(),
            c = (0, G.q)();
          return (0, a.jsxs)(X.xu, {
            className: "main-bg1",
            children: [
              (0, a.jsxs)(X.xu, {
                className: "main-inner",
                children: [
                  (0, a.jsx)(X.xu, {
                    className: "pt-8 pl-8",
                    children: (0, a.jsx)(Y.E, { src: "logo.png" }),
                  }),
                  (0, a.jsxs)(Q.k, {
                    direction: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    w: "80vw",
                    margin: "0 auto",
                    children: [
                      (0, a.jsx)(X.xu, {
                        className: "text-5xl font-bold mt-12",
                        children: t("11"),
                      }),
                      (0, a.jsx)(X.xu, {
                        className: "mx-auto mt-16",
                        children: (0, a.jsx)(Q.k, {
                          gap: "2rem",
                          children: (0, a.jsx)(X.xu, {
                            onClick: () => e([{ usagePage: 65281, usage: 16 }]),
                            children: (0, a.jsx)(eX, {
                              name: t("10"),
                              image: "mouse.png",
                            }),
                          }),
                        }),
                      }),
                      (0, a.jsx)(X.xu, {
                        className:
                          "w-[40rem] mx-auto mt-16 text-sm text-[#797979]",
                        children: t("13"),
                      }),
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(J.h, {
                children: (0, a.jsxs)(eH.u_, {
                  isOpen: n.isOpen,
                  onClose: n.onClose,
                  isCentered: !0,
                  children: [
                    (0, a.jsx)($.Z, {}),
                    (0, a.jsx)(eW.h, {
                      minW: "fit-content",
                      className: "!bg-gray-900 px-20 py-12",
                      children: (0, a.jsx)(et.f, {
                        children: (0, a.jsx)(eQ.M, {
                          columns: 2,
                          margin: "0 auto",
                          columnGap: "2rem",
                          rowGap: "2rem",
                          children: eG.R.map((n, o) =>
                            (0, a.jsx)(
                              X.xu,
                              {
                                onClick: () => e(n.filter),
                                children: (0, a.jsx)(eX, {
                                  name: t("10"),
                                  image: n.image,
                                }),
                              },
                              o,
                            ),
                          ),
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, a.jsx)(J.h, {
                children: (0, a.jsxs)(eH.u_, {
                  isOpen: c.isOpen,
                  onClose: c.onClose,
                  isCentered: !0,
                  children: [
                    (0, a.jsx)($.Z, {}),
                    (0, a.jsxs)(eW.h, {
                      minW: "fit-content",
                      className: "!bg-gray-900 px-10 py-2",
                      children: [
                        (0, a.jsx)(et.f, {
                          children: (0, a.jsx)(X.xu, {
                            className: "py-8",
                            children: t("90049"),
                          }),
                        }),
                        (0, a.jsx)(en.m, {
                          textAlign: "center",
                          children: (0, a.jsx)(q.z, {
                            className: "main-btn",
                            onClick: c.onClose,
                            children: t("90038"),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        eq = function () {
          (0, G.q)();
          let e = (0, G.q)(),
            {
              connectedMouse: t,
              t: n,
              baseInfo: c,
              dongleInfo: s,
              setDongleInfo: d,
              setMatchMode: l,
            } = (0, o.useContext)(z),
            [i, r] = (0, o.useState)(""),
            [m, u] = (0, o.useState)("");
          return (
            (0, o.useEffect)(() => {
              s && s.connect && e.onClose();
            }, [s]),
            (0, a.jsxs)(Q.k, {
              direction: "column",
              className: "flex-1 items-center mr-40",
              children: [
                (0, a.jsx)(X.xu, {
                  className: "box-wrapper",
                  children: n("10"),
                }),
                (0, a.jsx)(X.xu, {
                  className: "min-h-[300px]",
                  children: (0, a.jsx)(eo, {}),
                }),
              ],
            })
          );
        };
      class eJ {
        static startMonitoring() {
          ((this.shouldMonitor = !0),
            !this.hasMonitored &&
              navigator.hid &&
              (navigator.hid.addEventListener("connect", eJ.onConnect),
              navigator.hid.addEventListener("disconnect", eJ.onDisconnect)));
        }
        static stopMonitoring() {
          this.shouldMonitor = !1;
        }
        static on(e, t) {
          this._listeners[e] = [...this._listeners[e], t];
        }
        static off(e, t) {
          this._listeners[e] = this._listeners[e].filter((e) => e !== t);
        }
      }
      ((eJ._listeners = { connect: [], remove: [] }),
        (eJ.shouldMonitor = !1),
        (eJ.hasMonitored = !1),
        (eJ.onConnect = (e) => {
          let { device: t } = e;
          (console.log("Detected Connection", t),
            eJ.shouldMonitor && eJ._listeners.connect.forEach((e) => e(t)));
        }),
        (eJ.onDisconnect = (e) => {
          let { device: t } = e;
          (console.log("Detected Disconnection", t),
            eJ.shouldMonitor && eJ._listeners.remove.forEach((e) => e(t)));
        }));
      var eZ = function () {
        let {
            deviceStatus: e,
            currentTab: t,
            disconnectMouse: n,
            connectMouse: c,
            baseInfo: s,
            matchMode: d,
            dongleInfo: l,
          } = (0, o.useContext)(z),
          i = (0, o.useRef)(e),
          r = (0, o.useRef)(d),
          m = (0, o.useRef)(l);
        return (
          (0, o.useEffect)(() => {
            r.current = d;
          }, [d]),
          (0, o.useEffect)(() => {
            m.current = l;
          }, [l]),
          (0, o.useEffect)(() => {
            i.current = e;
          }, [e]),
          (0, o.useEffect)(() => {
            (eJ.startMonitoring(),
              eJ.on("remove", () => {
                r.current || n();
              }),
              eJ.on("connect", (e) => {
                r.current && c([{ usagePage: 65281, usage: 1 }]);
              }));
          }, []),
          e
            ? (0, a.jsx)(X.xu, {
                className: "main-bg",
                children: (0, a.jsxs)(X.xu, {
                  className: "main-inner",
                  children: [
                    (0, a.jsx)(eV, {}),
                    (0, a.jsxs)(X.xu, {
                      className:
                        "flex h-[calc(100vh-5rem)] pt-10 overflow-auto",
                      children: [
                        (0, a.jsx)(W, {}),
                        "home" === t && (0, a.jsx)(eq, {}),
                        "mouse" === t && (0, a.jsx)(ey, {}),
                        "pointer" === t && (0, a.jsx)(eD, {}),
                        "macro" === t && (0, a.jsx)(eU, {}),
                      ],
                    }),
                  ],
                }),
              })
            : (0, a.jsx)(eY, {})
        );
      };
      function e$() {
        return (0, a.jsx)("main", {
          children: (0, a.jsx)(B, { children: (0, a.jsx)(eZ, {}) }),
        });
      }
    },
  },
  function (e) {
    (e.O(0, [947, 703, 971, 69, 744], function () {
      return e((e.s = 6946));
    }),
      (_N_E = e.O()));
  },
]);
