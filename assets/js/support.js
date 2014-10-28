var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;

var Query = function (querystring) {
  var query = querystring.split("&");
  var length = query.length;
  for (i = 0; i < length; i++) {
    var q = query[i];
    q = q.split("=");
    this[q[0]] = q[1];
  }
  return this;
};