(function () {
  var LIST = [];
  var BG = document.getElementById('head_bg');
  var HEADBAR = document.getElementById('head_bar');

  function loadImage (name) {
    var image = new Image();
    image.onload = function () {
      HEADBAR.style.background = new Vibrant(image, 64, 100).MutedSwatch.getHex();
      BG.className = "static";
      BG.style.backgroundImage = "url('" + this.src + "')";
      HEADBAR.className = "bg";
    };
    image.src = "data/backgrounds/" + name;
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
      document.getElementById('head_bar_inner_searchbar_search').addEventListener("input", function () {
        var flag = false;
        var value = this.value.toLowerCase();
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
      });
    });
  });
})();
