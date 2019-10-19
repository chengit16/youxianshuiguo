const filter = {
  money: function(val) {
    if (val) {
      return val / 100
    }
    return 0
  },
  join: function(arr, split) {
    return arr.join(split)
  },
  dateFormat: function(fmt, date) {
      let ret;
	  date = new Date(date)
      let opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
      };
      return fmt;
  },
  orderStatusText(val){
  	const list = {
  		0:"已关闭",
  		1:"待付款",
  		2:"待发货",
  		3:"待收货",
  		4:"交易关闭",
  		5:"交易成功",
  		9:"删除"
  	}
	return list[val]
  },
}

module.exports = {
  money: filter.money,
  join: filter.join,
  dateFormat:filter.dateFormat,
  orderStatusText:filter.orderStatusText
}