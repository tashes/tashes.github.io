(function () {
  var TAGS = [];
  var TIPS = document.getElementById('head_bar_tips');
  var TOGGLE = false;
  var SEARCHBAR = document.getElementById('head_bar_inner_searchbar_search');

  function createTagTip (i) {
    var ele = document.createElement("div");
    ele.innerHTML = i;
    ele.addEventListener('click', function () {
      SEARCHBAR.value = this.textContent;
      forceSearchImage();
      forceSearchPosts();
    });
    return ele;
  };
  function listener () {
    if (TIPS.className === "show" || TIPS.className === "show1") {
      TIPS.removeAttribute("class");
    }
    else {
      TIPS.className = "show";
    }
  }

  window.addEventListener('load', function () {
    // Get data
    fetch("data/tags.json").then(function (response) {
      return response.json();
    }).then(function (tags) {
      TAGS = tags;
      TAGS.forEach(i => TIPS.appendChild(createTagTip(i)));
    });
    // Set listeners
    document.getElementById('head_bar_inner_searchico').addEventListener('click', listener);
  });

  window.isTag = function (tag) {
    if (TAGS.indexOf(tag) > -1) {
      return true;
    }
    else {
      return false;
    }
  };
})();
