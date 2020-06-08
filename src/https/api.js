import http from './config'
export default class Api {
  //简要描述：获取openid接口
  static getOpenId(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/getAppid", p)
  }
  // 简要描述: index接口(请求index所有值)
  static getIndex(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/list", p)
  }
  //简要描述: 热门活动接口
  static getActivityList(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/getActivityList", p)
  }
  //简要描述: 搜索接口 
  static getActivityPlayer(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/activityPlayer", p)
  }
  //简要描述：排行榜接口 
  static getPlayerRank(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/playerRank", p)
  }
  //简要描述 选手详情
  static getPlayerDetail(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/player", p)
  }

  //简要描述：投票记录
  static getPlayerTicket(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/playerTicket", p)
  }

  //简要描述：报名判断接口
  static applyGroupList(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/groupList", p)
  }

  //简要描述：投票接口
  static getVote(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/vote", p)
  }


  //简要描述：礼物接口
  static getGiftList(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/giftList", p)
  }

  //简要描述：报名提交接口
  static addApply(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/add", p)
  }
  //简要描述：存储抽奖记录接口
  static addHdInfogiftlog(p) {
    return http.post("https://mp.zymcloud.com/hp-hd/applet/activity/addHdInfogiftlog", p)
  }

    //支付接口
    static wxPay(p) {
      return http.post("https://mp.zymcloud.com/hp-hd/applet/pay/wxMiniProgramPay", p)
    }

}


