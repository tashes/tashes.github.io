(function () {
  var PARTS_BANNER_DIV = document.getElementById('page_top_banner_div');
  var PARTS_BANNER_IMG = document.getElementById('page_top_banner_img');
  var PARTS_HEADER = document.getElementById('page_top_header_h');
  var PARTS_AUTHOR = document.getElementById('page_top_info_author');
  var PARTS_DATE = document.getElementById('page_top_info_date');
  var PARTS_BODY = document.getElementById('page_body_inner');

  window.addEventListener('load', function () {
    // get article
    var article = /\#\/([a-z0-9\-]+)/.exec(location.hash)[1];
    // get the banner
    new Promise(function (res, rej) {
      var img = new Image();
      img.src = "../data/posts/" + article + "/banner.jpg";
      img.onload = function () {
        PARTS_BANNER_DIV.style.backgroundImage = "url(" + this.src + ")";
        PARTS_BANNER_IMG.src = this.src;
        res();
      }
    })
    // get info
    .then(function () {
      return fetch("../data/posts/" + article + "/info.json");
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      document.querySelector('title').innerHTML = info.title + " | Tashes";
      PARTS_HEADER.innerHTML = info.title;
      PARTS_AUTHOR.innerHTML = info.author;
      PARTS_DATE.innerHTML = moment(info.date).format("DD/MM/YYYY");
    })
    // get article
    .then(function () {
      return fetch("../data/posts/" + article + "/content.html");
    })
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      PARTS_BODY.innerHTML = text;
    })
    // reveal page
    .then(function () {
      document.getElementById('viewport').className = "loaded";
    });
  });
})();
