(function () {
  var LIST = [];
  var BODY = document.getElementById("body");
  var POSTS = document.getElementById("body_posts_content");
  var POSTSPERROW = 3;

  function createPostCards (item) {
    var content = `<div class="post"><div class="name">` + item.name + `</div><img src="data/posts/` + item.link + `/banner.jpg"/><div class="date">` +  moment(item.datetime).format("ddd, Do MMMM YYYY") + `</div></div>`;
    return `<a href="posts.html/#/` + item.link + `" target="_blank"><div class="col-` + Math.round(12/POSTSPERROW) + `">` + content + `</div></a>`;
  };
  function renderList (list) {
    if (list.length > 0) {
      POSTS.innerHTML = "";
      var txt = [`<div class="row">`];
      var list_length = list.length;
      for (var i = 0; i < list_length; i++) {
        txt.push(createPostCards(list[i]));
        if (i % POSTSPERROW) {
          txt.push(`</div>`, `<div class="row">`);
        }
      }
      txt.push(`</div>`);
      POSTS.innerHTML = txt.join("");
    }
    else {
      POSTS.innerHTML = `<div class="row"><div class="col-12 empty">Nothing Found.</div></div>`
    }
  };

  window.addEventListener("load", function () {
    // get the posts data
    fetch("data/posts/index.json").then(function (response) {
      return response.json();
    }).then(function (list) {
      // set LIST
      LIST = list;
      // load and make all the cards for all posts
      renderList(list);
      BODY.className = "posts";
      // add listeners
      document.getElementById('head_bar_inner_searchbar_search').addEventListener('input', function () {
        BODY.removeAttribute('className');
        var value = this.value.toLowerCase();
        var modlist = [];
        // check if tag
        if (isTag(value)) {
          // treat as tag
          modlist = LIST.filter(function (item) {
            if (item.tags.indexOf(value) > -1) {
              return true;
            }
          });
          renderList(modlist);
        }
        else if (value === "" || /^\s*$/.test(value)) {
          modlist = list;
        }
        else {
          // treat as keyword
          modlist = [];
          value.split(" ").forEach(function (searchterm) {
            if (!(searchterm === "" && /^\s$/.test(searchterm))) {
              modlist = modlist.concat(LIST.filter(function (item) {
                if (item.keywords.filter(i => i.search(searchterm) > -1).length > 0 || item.tags.filter(i => i.search(searchterm) > -1).length > 0 || item.name.split(" ").map(item => item.toLowerCase()).filter(i => i.search(searchterm) > -1).length > 0) {
                  console.log(item);
                  return true;
                }
              }));
            }
          });
        }
        renderList(modlist);
      });
    });
  });
})();
