(function () {
  var LIST = [];
  var BG = document.getElementById('head_bg');
  var HEADBAR = document.getElementById('head_bar');
  var HEADTEXT = document.getElementById('head_bar_inner_searchbar_search');

  function loadImage (name) {
    var image = new Image();
    image.onload = function () {
      var vib = new Vibrant(image, 64, 100);
      HEADBAR.style.background = vib.DarkMutedSwatch.getHex();
      HEADTEXT.style.color = vib.LightVibrantSwatch.getHex();
      document.getElementById('head_bar_inner_searchico_ico_pt1').style.stroke = vib.LightVibrantSwatch.getHex();
      document.getElementById('head_bar_inner_searchico_ico_pt2').style.stroke = vib.LightVibrantSwatch.getHex();
      BG.className = "static";
      BG.style.backgroundImage = "url('" + this.src + "')";
      HEADBAR.className = "bg";
    };
    image.src = "data/backgrounds/" + name;
  }
  function listener () {
    var flag = false;
    var value = document.getElementById('head_bar_inner_searchbar_search').value.toLowerCase();
    var keys = Object.keys(LIST.tags);
    for (item in LIST.tags) {
      if (item === value) {
        flag = LIST.tags[item];
        break;
      }
    }
    if (flag !== false) {
      loadImage(flag);
    }
    else {
      loadImage(LIST.default);
    }
  }

  window.addEventListener("load", function () {
    // Get the image data
    fetch("data/backgrounds/index.json").then(function (response) {
      return response.json();
    }).then(function (imagelist) {
      // set LIST
      LIST = imagelist;
      // load & set default
      if (imagelist.default) {
        loadImage(imagelist.default);
      }
      // setup listeners
      document.getElementById('head_bar_inner_searchbar_search').addEventListener("input", listener);
    });
  });

  window.isTag = function (txt) {
    if (Object.keys(LIST.tags).indexOf(txt) > -1) {
      return true;
    }
    else {
      return false;
    }
  };
  window.forceSearchImage = listener;
})();
