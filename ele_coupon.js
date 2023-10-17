/**
 * @平行绳 飞机频道：https://t.me/tigerorrose
 * 抢券变量：elmqqck 需要抢券的 ck
 * 定时建议提前5秒，多账号用 conc elmqqck 并发
 * cron: 55 59 23 * * *
 * 2023.7.11 首次发布
 * 2023.7.30 优化抢券逻辑，提升了成功率
 * 2023.8.17 内置定时，23:59:58 开始抢券；显示 USERID
 * 2023.9.29 修改提前抢券时间，提前 50毫秒开始抢
 * 环境变量：couponValue 可以设置抢券的面值，默认是 39
 * 环境变量：threadCount 可以设置多线程抢券，默认 1
 */
const $ = new Env('饿了么抢券');

const {
  "getToken": getToken,
  "checkCk": checkCk,
  "validateCarmeWithType": validateCarmeWithType,
  "User_Agent": User_Agent,
  "checkCarmeCount": checkCarmeCount,
  "getUserInfo": getUserInfo,
  "tryCatchPromise": tryCatchPromise,
  "sign": sign,
  "couponNotify": couponNotify,
  "getCookies": getCookies
} = require("./common.js");
const request = require("request");
const md5 = require("md5");
const moment = require("moment");
const GAME_TYEP = 11;
const couponValue = process["env"]["couponValue"] || "39";
const kami = process["env"]["ELE_CARME"];
const threadCount = process["env"]["threadCount"] || "1";

function getNextDayZeroTimestamp(_0x1b1a27) {
  const _0x45d771 = moment(_0x1b1a27)["startOf"]("day");
  const _0x2d5e11 = _0x45d771["clone"]()["set"]({
    "hour": 10,
    "minute": 0,
    "second": 0,
    "millisecond": 0
  });
  const _0x53d22d = moment(_0x1b1a27)["isAfter"](_0x2d5e11);
  const _0x329e27 = moment(_0x1b1a27);
  _0x53d22d && _0x329e27["add"](1, "day");
  _0x329e27["set"]({
    "hour": 10,
    "minute": 0,
    "second": 0,
    "millisecond": 0
  });
  return _0x329e27["valueOf"]();
}
async function queryintegralproperty(_0x5236cb) {
  const _0x5a5563 = {
    "bizScene": "IDIOM",
    "bizParam": "{\"type\":\"ggetGold\"}",
    "bizMethod": "queryIndex"
  };
  let _0x348512 = await gameRequest(_0x5236cb, _0x5a5563);
  return _0x348512["data"];
}
async function gameRequest(_0x1b2472, _0x3c6cb1) {
  var _0x406d93 = {
    "authority": "shopping.ele.me",
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://r.ele.me",
    "pragma": "no-cache",
    "referer": "https://r.ele.me/linkgame/index.html?navType=3&spm-pre=a2ogi.13162730.zebra-ele-login-module-9089118186&spm=a13.b_activity_kb_m71293.0.0",
    "cookie": _0x1b2472,
    "x-ele-ua": "RenderWay/H5 AppName/wap Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
    "user-agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36"
  };
  const _0x522225 = new Date()["getTime"]();
  const _0x122511 = 12574478;
  var _0x5e49c6 = "data=" + encodeURIComponent(JSON["stringify"](_0x3c6cb1));
  const _0x3a785f = getToken(_0x1b2472);
  const _0x2896c5 = _0x3a785f["split"]("_")[0];
  const _0x540ad3 = md5(_0x2896c5 + "&" + _0x522225 + "&" + _0x122511 + "&" + JSON["stringify"](_0x3c6cb1), kami);
  var _0x105f4d = {
    "url": "https://shopping.ele.me/h5/mtop.alsc.playgame.mini.game.dispatch/1.0/?jsv=2.6.1&appKey=12574478&t=" + _0x522225 + "&sign=" + _0x540ad3 + "&api=mtop.alsc.playgame.mini.game.dispatch&v=1.0&type=originaljson&dataType=json&timeout=5000&subDomain=shopping&mainDomain=ele.me&H5Request=true&pageDomain=ele.me&ttid=h5%40chrome_android_87.0.4280.141&SV=5.0",
    "method": "POST",
    "headers": _0x406d93,
    "body": _0x5e49c6
  };
  return tryCatchPromise(_0x4f011b => {
    request(_0x105f4d, async (_0x345c7f, _0x2bdc13, _0x38d4c9) => {
      if (!_0x345c7f && _0x2bdc13["statusCode"] === 200) {
        try {
          const _0x2bcc4e = JSON["parse"](_0x38d4c9);
          _0x4f011b(_0x2bcc4e);
        } catch (_0x421428) {
          console["log"](_0x38d4c9);
          _0x4f011b(null);
        }
      } else {
        _0x4f011b(null);
      }
    });
  });
}
async function queryCoupon(_0x1028c0, _0x7c338c, _0x2d8dd6) {
  const _0x1079e0 = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Cookie": _0x1028c0,
    "x-tap": "wx",
    "referer": "https://servicewechat.com/wxece3a9a4c82f58c9/532/page-frame.html",
    "mini-janus": "3%40s41AHfqDnza7twZ2HI4gXYAtN9eRII6d1C2B5eTDUozQHuWiR6VTpHEdvgDci1%3D%3D",
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; Pixel 4 XL Build/TP1A.220905.004; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5197 MMWEBSDK/20221012 MMWEBID/3313 MicroMessenger/8.0.30.2260(0x28001E55) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android"
  };
  const _0x295906 = {
    "condition": '',
    "latitude": 30.17853,
    "longitude": 120.221101,
    "tabCode": "HONG_BAO",
    "sourceFrom": "ELEME_WECHAT_MINIAPP",
    "extInfo": "{\"miniAppVersion\":\"10.19.31\"}"
  };
  const _0x47ec2b = new Date()["getTime"]();
  const _0x501109 = 12574478;
  var _0x2cc673 = "data=" + encodeURIComponent(JSON["stringify"](_0x295906));
  const _0x4ae027 = _0x7c338c["split"](";")[0];
  const _0x5a0c7b = _0x4ae027["split"]("_")[0];
  const _0x477a72 = md5(_0x5a0c7b + "&" + _0x47ec2b + "&" + _0x501109 + "&" + JSON["stringify"](_0x295906), kami);
  const _0x483ce1 = {
    "url": "https://guide-acs.m.taobao.com/h5/mtop.alsc.personal.querypasslist/1.0/2.0/?jsv=2.4.12&appKey=12574478&t=" + _0x47ec2b + "&sign=" + _0x477a72 + "&c=" + _0x7c338c + "&api=mtop.alsc.personal.queryPassList&dataType=json&method=GET&timeout=10000&v=1.0&type=originaljson&ttid=wxece3a9a4c82f58c9%40wechat_android_11.1.5&accountSite=eleme&needLogin=true&ecole=1&_bx-m=1",
    "method": "GET",
    "headers": _0x1079e0,
    "body": _0x2cc673
  };
  return tryCatchPromise(_0x5c644a => {
    request(_0x483ce1, async (_0x4b1b4f, _0x3d96ca, _0x15f2c4) => {
      if (!_0x4b1b4f && _0x3d96ca["statusCode"] === 200) {
        try {
          const _0x2ac824 = JSON["parse"](_0x15f2c4);
          if (_0x2ac824["c"]) {
            _0x5c644a(_0x2ac824["c"]);
          } else {
            if (_0x2ac824["data"]["result"]) {
              let _0x37821a = _0x2ac824["data"]["result"]["passInfoList"][0];
              if (_0x37821a) {
                let _0x1444e7 = moment(new Date()["getTime"]());
                let _0x5977ca = _0x1444e7["startOf"]("day")["valueOf"]();
                let _0x434de5 = _0x37821a["benefitList"]["filter"](_0x55a5e2 => _0x55a5e2["benefitType"] === "ELE_COMMODITY_HB");
                let _0x119cb3 = _0x434de5["filter"](_0x34bcfa => {
                  return _0x34bcfa["gmtCreate"] >= _0x5977ca / 1000 + '';
                });
                let _0x30b883 = _0x119cb3["filter"](_0x3328fa => {
                  return _0x3328fa["amountText"]["amountText"] === couponValue;
                });
                if (_0x30b883["length"] > 0) {
                  console["log"]("抢券成功", _0x30b883[0]["title"]), await couponNotify(_0x1028c0, "###抢券成功推送\n手机号：" + _0x2d8dd6 + "\n抢券成功" + _0x30b883[0]["title"]), process["exit"](0);
                } else {
                  console["log"]("抢券失败");
                  process["exit"](0);
                }
              } else {
                console["log"]("抢券失败"), process["exit"](0);
              }
            } else {
              console["log"]("抢券失败");
              process["exit"](0);
            }
          }
        } catch (_0x1a9b33) {
          console["log"]("查询抢券结果异常，请到 app 中查看");
          process["exit"](0);
        }
      } else {
        console["log"]("抢券失败");
        process["exit"](0);
      }
    });
  });
}
async function exchangeList(_0x7f59b8, _0x2b7d41) {
  var _0xf0805e = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Cookie": _0x7f59b8,
    "User-Agent": User_Agent
  };
  const _0x2c69d6 = new Date()["getTime"]();
  const _0x23271b = 12574478;
  const _0xf393b3 = {
    "actId": "20221207144029906162546384",
    "collectionId": "20221216181231449964003945",
    "bizScene": "game_center",
    "longitude": "114.88232396543026",
    "latitude": "30.4464809037745"
  };
  const _0xd157ac = "data=" + encodeURIComponent(JSON["stringify"](_0xf393b3));
  const _0x26d68a = getToken(_0x7f59b8);
  const _0x53e09c = _0x26d68a["split"]("_")[0];
  const _0x1cd806 = await sign(_0x53e09c + "&" + _0x2c69d6 + "&" + _0x23271b + "&" + JSON["stringify"](_0xf393b3), kami);
  const _0x3a439d = {
    "url": "https://mtop.ele.me/h5/mtop.koubei.interactioncenter.platform.right.exchangelist/1.0/?jsv=2.6.1&appKey=12574478&ttid=1601274958480%40eleme_android_10.14.3&t=" + _0x2c69d6 + "&sign=" + _0x1cd806 + "&api=mtop.koubei.interactioncenter.platform.right.exchangelist",
    "method": "POST",
    "headers": _0xf0805e,
    "body": _0xd157ac
  };
  return tryCatchPromise(_0x4b266b => {
    request(_0x3a439d, async (_0x5ed3a1, _0x238419, _0xf3e978) => {
      console["log"](_0x5ed3a1);
      console["log"](_0x238419["statusCode"]);
      if (!_0x5ed3a1 && _0x238419["statusCode"] === 200) {
        try {
          const _0x16cf74 = JSON["parse"](_0xf3e978);
          if (_0x16cf74["data"]) {
            const _0x461c8d = _0x16cf74["data"]["data"]["rightInfoList"];
            for (let _0x318ed9 = 0; _0x318ed9 < _0x461c8d["length"]; _0x318ed9++) {
              const _0x4dc983 = _0x461c8d[_0x318ed9];
              if (_0x4dc983["rightValue"] === couponValue) {
                console["log"]("开始抢" + couponValue + "元券");
                while (true) {
                  await querylotterychance(_0x7f59b8, _0x4dc983["rightId"], _0x2b7d41);
                }
              }
            }
          }
          _0x4b266b(_0x16cf74);
        } catch (_0x2dcf50) {
          console["log"](_0x2dcf50);
          _0x4b266b(null);
        }
      } else {
        _0x4b266b(null);
      }
    });
  });
}
function syncTime() {
  const _0x3e2358 = {
    "User-Agent": User_Agent
  };
  const _0x370c8c = {
    "url": "https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
    "method": "GET",
    "headers": _0x3e2358
  };
  return tryCatchPromise(_0x46d320 => {
    request(_0x370c8c, async (_0x18a101, _0x3fc521, _0x51cb54) => {
      if (!_0x18a101 && _0x3fc521["statusCode"] === 200) {
        try {
          const _0x1f19be = JSON["parse"](_0x51cb54);
          if (_0x1f19be["data"]) {
            _0x46d320(_0x1f19be["data"]["t"]);
          } else {
            _0x46d320(null);
          }
        } catch (_0x5c1ce5) {
          _0x46d320(null);
        }
      } else {
        _0x46d320(null);
      }
    });
  });
}
async function querylotterychance(_0x1a098a, _0xf7bd1d, _0x3b18be) {
  var _0x438c4c = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Cookie": _0x1a098a,
    "User-Agent": User_Agent
  };
  const _0x47ff90 = new Date()["getTime"]();
  const _0x523942 = 12574478;
  const _0x9ccd39 = {
    "actId": "20221207144029906162546384",
    "collectionId": "20221216181231449964003945",
    "copyId": _0xf7bd1d,
    "bizScene": "game_center",
    "channel": "abcd",
    "asac": "2A22C0239QW1FOL3UUQY7U"
  };
  const _0x37d2dc = "data=" + encodeURIComponent(JSON["stringify"](_0x9ccd39));
  const _0x18c00f = getToken(_0x1a098a);
  const _0x38722d = _0x18c00f["split"]("_")[0];
  const _0x532ff1 = md5(_0x38722d + "&" + _0x47ff90 + "&" + _0x523942 + "&" + JSON["stringify"](_0x9ccd39), kami);
  const _0x3810cc = {
    "url": "https://guide-acs.m.taobao.com/h5/mtop.koubei.interactioncenter.platform.right.exchange.v2/1.0/5.0/?jsv=2.7.1&SV=5.0&appKey=12574478&ttid=1601274958480%40eleme_android_10.14.3&t=" + _0x47ff90 + "&sign=" + _0x532ff1 + "&api=mtop.koubei.interactioncenter.platform.right.exchange.v2",
    "method": "POST",
    "headers": _0x438c4c,
    "body": _0x37d2dc
  };
  const _0x1163ed = Array["from"]({
    "length": threadCount
  }, () => {
    return tryCatchPromise(_0x43f4d2 => {
      request(_0x3810cc, async (_0x4f1afd, _0x26df6d, _0x220772) => {
        console["log"](_0x220772);
        if (!_0x4f1afd && _0x26df6d["statusCode"] === 200) {
          try {
            const _0xdde7d1 = JSON["parse"](_0x220772);
            if (_0xdde7d1["data"]["data"]) {
              console["log"]("抢券成功，获得:" + _0xdde7d1["data"]["data"][0]["rightName"]);
              await couponNotify(_0x1a098a, "###抢券成功推送\n手机号：" + _0x3b18be + "\n抢券成功" + _0xdde7d1["data"]["data"][0]["rightName"]);
              process["exit"](0);
            } else {
              _0x43f4d2(null);
            }
          } catch (_0x352fc5) {
            console["log"](_0x352fc5), _0x43f4d2(null);
          }
        } else {
          _0x43f4d2(null);
        }
      });
    });
  });
  await Promise["all"](_0x1163ed)["then"](_0x30a55a => {})["catch"](_0x136299 => {});
}
async function start() {
  await validateCarmeWithType(kami, 1);
  const _0x2adfb7 = getCookies("elmqqck");
  for (let _0x14364c = 0; _0x14364c < _0x2adfb7["length"]; _0x14364c++) {
    let _0x31d480 = _0x2adfb7[_0x14364c];
    _0x31d480 = await checkCk(_0x31d480, _0x14364c, kami, 1);
    !_0x31d480 && process["exit"](0);
    let _0x5d55b0 = await getUserInfo(_0x31d480);
    if (!_0x5d55b0["username"]) {
      console["log"]("第", _0x14364c + 1, "账号失效！请重新登录！！！😭");
      process["exit"](0);
    }
    const _0x4961fe = _0x5d55b0["user_id"];
    let _0x1e16ad = _0x5d55b0["mobile"];
    console["log"]("****** #" + (_0x14364c + 1), _0x1e16ad, "*********");
    console["log"]("账号的 id 为", _0x4961fe);
    console["log"]("当前抢券线程数为", threadCount);
    let _0x332bdf = await queryintegralproperty(_0x31d480);
    let _0x492bf3 = -1;
    _0x332bdf["data"] ? _0x492bf3 = JSON["parse"](_0x332bdf["data"])["num"] : _0x492bf3 = -1;
    if (_0x492bf3 !== -1) {
      if (couponValue === "20" && _0x492bf3 < 13999) {
        console["log"]("金币不够兑换 20 元券，程序结束");
        process["exit"](0);
      } else {
        if (couponValue === "39" && _0x492bf3 < 9999) {
          console["log"]("金币不够兑换 39 元券，程序结束");
          process["exit"](0);
        } else {
          if (couponValue === "12" && _0x492bf3 < 8999) {
            console["log"]("金币不够兑换 12 元券，程序结束"), process["exit"](0);
          } else {
            couponValue === "5" && _0x492bf3 < 3999 && (console["log"]("金币不够兑换 5 元券，程序结束"), process["exit"](0));
          }
        }
      }
    }
    await checkCarmeCount(kami, _0x4961fe, GAME_TYEP);
    console["log"]("本次抢券的面额为：" + couponValue);
    let _0x4abcd3 = await syncTime();
    !_0x4abcd3 && (_0x4abcd3 = new Date()["getTime"]());
    let _0x5c6ae1 = getNextDayZeroTimestamp(Number(_0x4abcd3));
    let _0x1ecb97 = _0x5c6ae1 - _0x4abcd3 - 200;
    console["log"]("程序将在", _0x1ecb97 / 1000, "秒后开始抢券");
    setTimeout(async () => {
      runAfterTenSeconds(_0x31d480, _0x1e16ad);
      await exchangeList(_0x31d480, _0x1e16ad);
    }, _0x1ecb97);
  }
}

function runAfterTenSeconds(_0x1d8988, _0x4fb371) {
  setTimeout(async () => {
    let _0x8b574a = await queryCoupon(_0x1d8988, "64c767d7e6851eebe3c8cd476b0bc622_1692237574823;6f86648948993abca30366d96015297a", _0x4fb371);
    _0x8b574a && (await queryCoupon(_0x1d8988, _0x8b574a, _0x4fb371));
    process["exit"](0);
  }, 5000);
}
start();
function Env(t, e) {
  "undefined" != typeof process && JSON["stringify"](process["env"])["indexOf"]("GITHUB") > -1 && process["exit"](0);
  class s {
    constructor(t) {
      this["env"] = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        "url": t
      } : t;
      let s = this["get"];
      "POST" === e && (s = this["post"]);
      return new Promise((e, i) => {
        s["call"](this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this["send"]["call"](this["env"], t);
    }
    post(t) {
      return this["send"]["call"](this["env"], t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this["name"] = t;
      this["http"] = new s(this);
      this["data"] = null;
      this["dataFile"] = "box.dat";
      this["logs"] = [];
      this["isMute"] = false;
      this["isNeedRewrite"] = false;
      this["logSeparator"] = "\n";
      this["startTime"] = new Date()["getTime"]();
      Object["assign"](this, e);
      this["log"]("", `🔔${this["name"]}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module["exports"];
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON["parse"](t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON["stringify"](t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this["getdata"](t);
      if (i) {
        try {
          s = JSON["parse"](this["getdata"](t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this["setdata"](JSON["stringify"](t), e);
      } catch {
        return false;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this["get"]({
          "url": t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i["replace"](/\n/g, "")["trim"]() : i;
        let r = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e["timeout"] ? e["timeout"] : r;
        const [o, h] = i["split"]("@");
        const n = {
          "url": `http://${h}/v1/scripting/evaluate`,
          "body": {
            "script_text": t,
            "mock_type": "cron",
            "timeout": r
          },
          "headers": {
            "X-Key": o,
            "Accept": "*/*"
          }
        };
        this["post"](n, (t, e, i) => s(i));
      })["catch"](t => this["logErr"](t));
    }
    loaddata() {
      if (!this["isNode"]()) {
        return {};
      }
      {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]);
        const e = this["path"]["resolve"](process["cwd"](), this["dataFile"]);
        const s = this["fs"]["existsSync"](t);
        const i = !s && this["fs"]["existsSync"](e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON["parse"](this["fs"]["readFileSync"](i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this["isNode"]()) {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]);
        const e = this["path"]["resolve"](process["cwd"](), this["dataFile"]);
        const s = this["fs"]["existsSync"](t);
        const i = !s && this["fs"]["existsSync"](e);
        const r = JSON["stringify"](this["data"]);
        s ? this["fs"]["writeFileSync"](t, r) : i ? this["fs"]["writeFileSync"](e, r) : this["fs"]["writeFileSync"](t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e["replace"](/\[(\d+)\]/g, ".$1")["split"](".");
      let r = t;
      for (const t of i) {
        if (r = Object(r)[t], void 0 === r) {
          return s;
        }
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array["isArray"](e) || (e = e["toString"]()["match"](/[^.[\]]+/g) || []), e["slice"](0, -1)["reduce"]((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math["abs"](e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e["length"] - 1]] = s, t);
    }
    getdata(t) {
      let e = this["getval"](t);
      if (/^@/["test"](t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/["exec"](t);
        const r = s ? this["getval"](s) : "";
        if (r) {
          try {
            const t = JSON["parse"](r);
            e = t ? this["lodash_get"](t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/["test"](e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/["exec"](e);
        const o = this["getval"](i);
        const h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON["parse"](h);
          this["lodash_set"](e, r, t);
          s = this["setval"](JSON["stringify"](e), i);
        } catch (e) {
          const o = {};
          this["lodash_set"](o, r, t);
          s = this["setval"](JSON["stringify"](o), i);
        }
      } else {
        s = this["setval"](t, e);
      }
      return s;
    }
    getval(t) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["read"](t) : this["isQuanX"]() ? $prefs["valueForKey"](t) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][t]) : this["data"] && this["data"][t] || null;
    }
    setval(t, e) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["write"](t, e) : this["isQuanX"]() ? $prefs["setValueForKey"](t, e) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][e] = t, this["writedata"](), true) : this["data"] && this["data"][e] || null;
    }
    initGotEnv(t) {
      this["got"] = this["got"] ? this["got"] : require("got");
      this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
      t && (t["headers"] = t["headers"] ? t["headers"] : {}, void 0 === t["headers"]["Cookie"] && void 0 === t["cookieJar"] && (t["cookieJar"] = this["ckjar"]));
    }
    get(t, e = () => {}) {
      t["headers"] && (delete t["headers"]["Content-Type"], delete t["headers"]["Content-Length"]);
      this["isSurge"]() || this["isLoon"]() ? (this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
        "X-Surge-Skip-Scripting": false
      })), $httpClient["get"](t, (t, s, i) => {
        !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
        e(t, s, i);
      })) : this["isQuanX"]() ? (this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
        "hints": false
      })), $task["fetch"](t)["then"](t => {
        const {
          "statusCode": s,
          "statusCode": i,
          "headers": r,
          "body": o
        } = t;
        e(null, {
          "status": s,
          "statusCode": i,
          "headers": r,
          "body": o
        }, o);
      }, t => e(t))) : this["isNode"]() && (this["initGotEnv"](t), this["got"](t)["on"]("redirect", (t, e) => {
        try {
          if (t["headers"]["set-cookie"]) {
            const s = t["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();
            s && this["ckjar"]["setCookieSync"](s, null);
            e["cookieJar"] = this["ckjar"];
          }
        } catch (t) {
          this["logErr"](t);
        }
      })["then"](t => {
        const {
          "statusCode": s,
          "statusCode": i,
          "headers": r,
          "body": o
        } = t;
        e(null, {
          "status": s,
          "statusCode": i,
          "headers": r,
          "body": o
        }, o);
      }, t => {
        const {
          "message": s,
          "response": i
        } = t;
        e(s, i, i && i["body"]);
      }));
    }
    post(t, e = () => {}) {
      if (t["body"] && t["headers"] && !t["headers"]["Content-Type"] && (t["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), t["headers"] && delete t["headers"]["Content-Length"], this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
          "X-Surge-Skip-Scripting": false
        }));
        $httpClient["post"](t, (t, s, i) => {
          !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
          e(t, s, i);
        });
      } else {
        if (this["isQuanX"]()) {
          t["method"] = "POST";
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
            "hints": false
          }));
          $task["fetch"](t)["then"](t => {
            const {
              "statusCode": s,
              "statusCode": i,
              "headers": r,
              "body": o
            } = t;
            e(null, {
              "status": s,
              "statusCode": i,
              "headers": r,
              "body": o
            }, o);
          }, t => e(t));
        } else {
          if (this["isNode"]()) {
            this["initGotEnv"](t);
            const {
              "url": s,
              ...i
            } = t;
            this["got"]["post"](s, i)["then"](t => {
              const {
                "statusCode": s,
                "statusCode": i,
                "headers": r,
                "body": o
              } = t;
              e(null, {
                "status": s,
                "statusCode": i,
                "headers": r,
                "body": o
              }, o);
            }, t => {
              const {
                "message": s,
                "response": i
              } = t;
              e(s, i, i && i["body"]);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s["getMonth"]() + 1,
        "d+": s["getDate"](),
        "H+": s["getHours"](),
        "m+": s["getMinutes"](),
        "s+": s["getSeconds"](),
        "q+": Math["floor"]((s["getMonth"]() + 3) / 3),
        "S": s["getMilliseconds"]()
      };
      /(y+)/["test"](t) && (t = t["replace"](RegExp["$1"], (s["getFullYear"]() + "")["substr"](4 - RegExp["$1"]["length"])));
      for (let e in i) {
        new RegExp("(" + e + ")")["test"](t) && (t = t["replace"](RegExp["$1"], 1 == RegExp["$1"]["length"] ? i[e] : ("00" + i[e])["substr"](("" + i[e])["length"])));
      }
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this["isLoon"]() ? t : this["isQuanX"]() ? {
            "open-url": t
          } : this["isSurge"]() ? {
            "url": t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this["isLoon"]()) {
            let e = t["openUrl"] || t["url"] || t["open-url"];
            let s = t["mediaUrl"] || t["media-url"];
            return {
              "openUrl": e,
              "mediaUrl": s
            };
          }
          if (this["isQuanX"]()) {
            let e = t["open-url"] || t["url"] || t["openUrl"];
            let s = t["media-url"] || t["mediaUrl"];
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this["isSurge"]()) {
            let e = t["url"] || t["openUrl"] || t["open-url"];
            return {
              "url": e
            };
          }
        }
      };
      if (this["isMute"] || (this["isSurge"]() || this["isLoon"]() ? $notification["post"](e, s, i, o(r)) : this["isQuanX"]() && $notify(e, s, i, o(r))), !this["isMuteLog"]) {
        let t = ["", "==============📣系统通知📣=============="];
        t["push"](e);
        s && t["push"](s);
        i && t["push"](i);
        console["log"](t["join"]("\n"));
        this["logs"] = this["logs"]["concat"](t);
      }
    }
    log(...t) {
      t["length"] > 0 && (this["logs"] = [...this["logs"], ...t]);
      console["log"](t["join"](this["logSeparator"]));
    }
    logErr(t, e) {
      const s = !this["isSurge"]() && !this["isQuanX"]() && !this["isLoon"]();
      s ? this["log"]("", `❗️${this["name"]}, 错误!`, t["stack"]) : this["log"]("", `❗️${this["name"]}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date()["getTime"]();
      const s = (e - this["startTime"]) / 1e3;
      this["log"]("", `🔔${this["name"]}, 结束! 🕛 ${s} 秒`);
      this["log"]();
      (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(t);
    }
  }(t, e);
}
