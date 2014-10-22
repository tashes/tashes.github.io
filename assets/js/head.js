var Head = {};

Head.ele = document.getElementById('head');
Head.title_main = document.getElementById('head_top_title');
Head.date = document.getElementById('head_top_date');
Head.animate = document.getElementById('head_top_animator_canvas');
Head.title_menu = document.getElementById('head_menu_title');

Head.ready = false;
Head.animate = false;
Head.renderId = {};

Head.open = function (headData) {
  Head.ele.className = "loading";
  Head.startAnimation();
  Head.title_main.innerHTML = headData.title;
  Head.title_menu.innerHTML = headData.title;
  if (headData.date) {
    Head.date.innerHTML = headData.date;
  }
  else {
    Head.date.innerHTML = "";
  }
  if (headData.background) {
    if (/rgb\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\)/.test(headData.background) || /rgba\([0-9]{1,3}\,[0-9]{1,3}\,[0-9]{1,3}\,0|1\.[0-9]\)/.test(headData.background)) {
      Head.ele.style.backgroundColor = headData.background;
      Head.ele.style.backgroundImage = "";
    }
    else if (/url\(\'[A-Za-z0-9\/_]*\.[a-z0-9]*\'\)/.test(headData.background)) {
      Head.ele.style.backgroundColor = "lightGray";
      Head.ele.style.backgroundImage = headData.background;
    }
  }
  else {
    Head.ele.style.backgroundColor = "lightGray";
    Head.ele.style.backgroundImage = "";
  }
};
Head.close = function (ready) {
  if (ready === true) {
    Head.ele.className = "title";
    Head.ready = true;
  }
  else if (typeof ready == "number") {
    Head.ele.className = "title";
    Head.ready = false;
    var n = window.setTimeout(function () {
      Head.ele.className = "closed";
      Head.ready = false;
      window.clearTimeout(n);
    }, ready * 1000);
  }
  else {
    Head.ele.className = "closed";
    Head.ready = false;
  }
};
Head.startAnimation = function () {
  Head.animate = true;
  Head.animation();
};
Head.endAnimation = function () {
  Head.animate = false;
};
Head.animation = function () {
  if (Head.animate) {
    
    Head.renderId = requestAnimationFrame(Head.animation);
  }
  else {
    cancelAnimationFrame(Head.renderId);
    Head.renderId = {};
  }
};

Head.ele.addEventListener("click", function () {
  if (Head.ready && this.className == "title") {
    Head.ele.className = "closed";
  }
});


Head.Buttons = {};

Head.Buttons.buttonHolder = document.getElementById('head_menu_bar');
Head.Buttons.buttons = Head.Buttons.buttonHolder.getElementsByClassName('button');
Head.Buttons.currentButton = Head.Buttons.buttonHolder.getElementsByClassName('active')[0];

Head.Buttons.setButton = function (buttonName) {
  if (buttonName !== "none") {
    var button;
    switch (buttonName) {
      case "home":
         button = Head.Buttons.buttons[0];
         break;
      case "blog":
         button = Head.Buttons.buttons[1];
         break;
      case "projects":
         button = Head.Buttons.buttons[2];
         break;
      case "about":
         button = Head.Buttons.buttons[3];
         break;
    }
    Head.Buttons.currentButton.className = "button";
    Head.Buttons.currentButton = button;
    Head.Buttons.currentButton.className = "button active";
  }
  else {
    Head.Buttons.currentButton.className = "button";
  }
};