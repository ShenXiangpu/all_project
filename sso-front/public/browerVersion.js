(function (window) {
  var theUA = window.navigator.userAgent.toLowerCase();
  if (
    (theUA.indexOf('trident') > -1 && theUA.indexOf('rv:11.0') > -1) ||         // IE 11
    (theUA.indexOf("compatible") > -1 && theUA.indexOf("msie") > -1)           // IE 10 及以下
  ) {
    var str = "您正在使用的浏览器版本过低，为了您的最佳体验，请先升级浏览器。";
    var str2 = "推荐使用高版本的:"
      + "<a target='_blank' rel='noopener noreferrer' href='https://www.google.cn/chrome/' style='color:#1890FF;'>谷歌（Chrome）</a>,"
      + "<a target='_blank' rel='noopener noreferrer' href='http://www.firefox.com.cn/' style='color:#1890FF;'>火狐（Firefox）</a>,"
      + "<a target='_blank' rel='noopener noreferrer' href='https://www.microsoft.com/en-us/edge' style='color:#1890FF;'>Microsoft Edge</a>,"
      + "或其他双核极速模式";
    document.writeln("<pre style='text-align:center;color:#fff;height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
      "<h2 style='padding-top:200px;margin:0'><strong>" + str + "<br/></strong></h2><h2>" +
      str2 + "");
    console.log("浏览器不合格")
    document.execCommand("Stop");
  }
  else {
    console.log("浏览器合格")
  }
})(window);
