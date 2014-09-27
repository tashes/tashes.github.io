var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;

var Buttons = {
  current: document.getElementById("home_button"),
  home: document.getElementById("home_button"),
  projects: document.getElementById("projects_button"),
  blog: document.getElementById("blog_button"),
  about: document.getElementById("about_button")
};
Buttons.home.addEventListener("click", function () {
  Pages.setPage('home', {
    title: "Home",
    bg: "assets/img/bg.png"
  }, function (close, ready) {
    var n = setTimeout(function () {
      close();
      clearTimeout(n);
    }, 1000);
  });
  Buttons.current.className = "button";
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.projects.addEventListener("click", function () {
  Pages.setPage('projects', {
    title: "Projects",
    bg: "assets/img/bg.png"
  }, function (close, ready) {
      close();
  });
  Buttons.current.className = "button";
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.blog.addEventListener("click", function () {
  Pages.setPage('blog', {
    title: "Blog",
    bg: "assets/img/bg.png"
  }, function (close, ready) {
    var n = setTimeout(function () {
      close();
      clearTimeout(n);
    }, 1000);
  });
  Buttons.current.className = "button";
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.about.addEventListener("click", function () {
  Pages.setPage('about', {
    title: "About Me",
    bg: "assets/img/bg.png"
  }, function (close, ready) {
    var n = setTimeout(function () {
      close();
      clearTimeout(n);
    }, 1500);
  });
  Buttons.current.className = "button";
  Buttons.current = this;
  Buttons.current.className = "button active";
});

var Head = {
  ui: document.getElementById("head"),
  title: document.getElementById("head_title_text"),
  date: document.getElementById("head_title_date"),
  loading: document.getElementById("head_title_loading_canvas")
};
Head.loading_ctx = Head.loading.getContext('2d');
Head.ui.addEventListener("click", function () {
  if (!OtherData.headRender) {
    Head.ui.className = "closed";
  }
});
Head.startLoading = function () {
  Head.ui.className = "loading";
  var ctx = Head.loading_ctx;
  var canvas = Head.loading;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  Head.loadingAnim();
};
Head.loadingAnim = function () {
  var ctx = Head.loading_ctx;
  var canvas = Head.loading;
  //ctx.clearRect(0,0,canvas.width,canvas.height);
  var mid_x = Math.round(canvas.width / 2),
  mid_y = Math.round(canvas.height / 2);
  ctx.beginPath();
  ctx.arc(mid_x,mid_y,OtherData.headLoad,0,2*Math.PI);
  OtherData.headLoad += 2;
  if (OtherData.headLoad > 41) {
    OtherData.headLoad = 0;
    OtherData.headColor = Math.round(Math.random() * 55) + 150;
  }
  ctx.closePath();
  var m = OtherData.headColor;
  if (!m) {
    OtherData.headColor = Math.round(Math.random() * 55) + 150;
  }
  ctx.fillStyle = "rgba(" + m + "," + m + "," + m + ",0.4)";
  m += 50;
  ctx.fill();
  if (OtherData.headLoad > 10) {
    ctx.beginPath();
    ctx.arc(mid_x,mid_y,OtherData.headLoad,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "rgb(" + m + "," + m + "," + m + ")";
    ctx.fill();
  }
  OtherData.headRender = requestAnimationFrame(Head.loadingAnim);
};
Head.cover = function (title, bg) {
  Head.title.innerHTML = title;
  Head.ui.backgroundImage = bg;
};
Head.uncover = function () {
  var ui = Head.ui;
  ui.className = "closed";
  cancelAnimationFrame(OtherData.headRender);
  OtherData.headRender = false;
};
Head.ready = function () {
  var ui = Head.ui;
  ui.className = "ready";
  cancelAnimationFrame(OtherData.headRender);
  OtherData.headRender = false;
};

var Pages = {
  current: document.getElementById("home")
};
Pages.setPage = function (page, headData, callback) {
  Head.startLoading();
  Head.cover(headData.title, headData.bg);
  Pages.current.className = "page";
  Pages.current = document.getElementById(page);
  Pages.current.className = "page active";
  callback(Head.uncover, Head.ready);
};

var OtherData = {
  headRender: false,
  headLoad: 0,
  headColor: false
};

Pages.setPage('home', {
  title: "Home",
  bg: "assets/img/bg.png"
}, function (close, ready) {
    close();
});