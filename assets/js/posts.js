(function () {
  var LIST = [];
  var BODY = document.getElementById("body");
  var POSTS = document.getElementById("body_posts_content");
  var POSTSPERROW = 3;

  function createPostCards (item) {
    var content = `<div class="post"><img src="data/posts/` + item.link + `/banner.jpg"/><div class="date">` +  moment(item.datetime).format("ddd, Do MMMM YYYY") + `</div></div>`;
    return `<a href="posts.html/#/` + item.link + `"><div class="col-` + Math.round(12/POSTSPERROW) + `">` + content + `</div></a>`;
  };

  window.addEventListener("load", function () {
    // get the posts data
    fetch("data/posts/index.json").then(function (response) {
      return response.json();
    }).then(function (list) {
      // set LIST
      LIST = list;
      // load and make all the cards for all posts
      var txt = [`<div class="row">`];
      var list_length = list.length;
      for (var i = 0; i < list_length; i++) {
        txt.push(createPostCards(list[i]));
        if (i % POSTSPERROW) {
          txt.push(`</div>`, `<div class="row">`);
        }
      }
      txt.push(`</div>`);
      console.log(txt);
      POSTS.innerHTML = txt.join("");
      BODY.className = "posts";
    });
  });
})();
