var Journal = {};
Journal.open = {
  home: false,
  blog: false,
  projects: false,
  about: false
};
Journal.Home = {
  artData: {},
  artIndex: 0
};
Journal.openTag = function () {

};
Journal.openArticle = function () {

};
Journal.openArtwork = function () {

};

Head.Buttons.buttons[0].addEventListener('click', function (event) {
  Head.Buttons.setButton("home");
  Pages.open({
    title: "A Life's Journal",
    background: "url('assets/img/home.jpg')"
  }, {
    id: "home",
    callback: function (close) {
      close(2);
    }
  });
  event.stopPropagation();
});
Head.Buttons.buttons[1].addEventListener('click', function (event) {
  Head.Buttons.setButton("blog");
  Pages.open({
    title: "Blog"
  }, {
    id: "blog",
    callback: function (close) {
      if (Journal.open.blog) {
        var xhttp;
        if (window.XMLHttpRequest) {
          xhttp = new XMLHttpRequest();
        }
        else {
          xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET","data/blog/index.json",false);
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState === 4) {
            var doc = document;
            var data = JSON.parse(xhttp.responseText);
            var posts = data.posts;
            var posts_index = posts.length;
            var posts_holder = doc.createElement('div');
            var posts_ele = doc.getElementById('blog_posts');
            for (i = 0; i < 8; i++) {
              posts_index--;
              if (posts_index >= 0) {
                var post = posts[posts_index];
              }
            }
            Journal.open.blog = true;
          }
        };
        xhttp.send();
      }
      else {
        close(2);
      }
    }
  });
  event.stopPropagation();
});
Head.Buttons.buttons[2].addEventListener('click', function () {
  Head.Buttons.setButton("projects");
});
Head.Buttons.buttons[3].addEventListener('click', function () {
  Head.Buttons.setButton("about");
});

/* cases depending on query */
/* default case */
Pages.open({
  title: "A Life's Journal",
  background: "url('assets/img/home.jpg')"
}, {
  id: "home",
  extData: "data/home.json",
  callback: function (close,data) {
    data = JSON.parse(data);
    var doc = document;
    var latest = document.getElementById('home_latest');
    var latest_data = data.blog;
    var latest_data_length = latest_data.length;
    var latest_holder = doc.createElement('div');
    var latest_template = '<h2>{{title}}</h2><div class="link">{{link}}</div><time>{{date}}</time><div class="padding"></div><div class="tags"></div>';
    for (i = 1; i <= latest_data_length; i++) {
      var i1 = latest_data_length - i;
      var latest_data_item = latest_data[i1];
      var article = doc.createElement('article');
      var latest_data_text = latest_template.replace("{{title}}",latest_data_item.title);
      latest_data_text = latest_data_text.replace("{{date}}",latest_data_item.date);
      latest_data_text = latest_data_text.replace("{{link}}",latest_data_item.link);
      var tags = latest_data_item.tags;
      var tags_length = tags.length;
      if (tags_length > 2) {
        tags_length = 2;
      }
      var tags_text = "";
      article.innerHTML = latest_data_text;
      var tags_holder = article.getElementsByClassName('tags')[0];
      for (j = 0; j < tags_length; j++) {
        var tag = tags[j];
        var a = doc.createElement('a');
        a.innerHTML = tag;
        a.addEventListener("click", Journal.openTag);
        tags_holder.appendChild(a);
      }
      if (latest_data_item.background && /url\(\'[A-Za-z0-9/_]*\.[a-z0-9]*\'\)/.test(latest_data_item.background)) {
        article.style.backgroundImage = latest_data_item.background;
        article.className = "picturesque";
      }
      else {
        article.style.backgroundColor = "white";
        article.className = "text";
      }
      article.addEventListener("click", Journal.openArticle);
      latest_holder.appendChild(article);
    }
    latest.appendChild(latest_holder);
    var artwork = document.getElementById('home_art');
    var artwork_data = data.art;
    Journal.Home.artData = artwork_data;
    var artwork_data_length = artwork_data.length;
    var artwork_holder = doc.createElement('div');
    var index = artwork_data_length;
    for (i = 1; i <= 4; i++) {
      index--;
      if (index >= 0) {
        var i1 = index;
        var artwork_data_item = artwork_data[i1];
        var article = doc.createElement('article');
        article.className = "picturesque";
        article.style.backgroundImage = artwork_data_item.link;
        article.innerHTML = "<h2>" + artwork_data_item.title + "</h2>";
        article.addEventListener("click", Journal.openArtwork);
        artwork_holder.appendChild(article);
      }
    }
    if (index > 0) {
      var load = doc.createElement('article');
      load.className = "load";
      load.innerHTML = "Load More";
      load.addEventListener("click", function () {
        var doc = document;
        var index = Journal.Home.artIndex;
        var data = Journal.Home.artData;
        for (i = 1; i <= 4; i++) {
          index--;
          if (index >= 0) {
            var i1 = index;
            var artwork_data_item = data[i1];
            var article = doc.createElement('article');
            article.style.backgroundImage = artwork_data_item.link;
            article.innerHTML = "<h2>" + artwork_data_item.title + "</h2>";
            this.parentNode.insertBefore(article, this);
          }
        }
        Journal.Home.artIndex = index;
        if (index <= 0) {
          this.parentNode.removeChild(this);
        }
      });
      artwork_holder.appendChild(load);
    }
    Journal.Home.artIndex = index;
    artwork.appendChild(artwork_holder);
    close(2);
    Journal.open.home = true;
  }
});
/* Other cases should be
 * Article
 * Artwork
 * Project */