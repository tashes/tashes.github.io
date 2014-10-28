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
Journal.Blog = {
  data: {},
  index: 0
};
Journal.openTag = function () {

};
Journal.openArticle = function () {
  var title = this.getElementsByTagName("h2")[0].textContent;
  title = title.split(" ");
  title = title.join("%20");
  var date = this.getElementsByTagName("time")[0].textContent;
  date = date.split(" ");
  date = date.join("%20");
  var bg = this.style.background;
  location.search = "?" + "page=article" + "&" + "section=blog" + "&" + "title=" + title + "&" + "date=" + date + "&" + "bg=" + bg;
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
      if (!Journal.open.blog) {
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
            Journal.Blog.data = data;
            var posts = data.posts;
            var posts_index = posts.length;
            var post_template = '<h2>{{title}}</h2><time>{{date}}</time><div class="padding"></div><div class="tags"></div>';
            var posts_holder = doc.createElement('div');
            var posts_ele = doc.getElementById('blog_posts');
            for (i = 0; i < 8; i++) {
              posts_index--;
              if (posts_index >= 0) {
                var post = posts[posts_index];
                var article = doc.createElement('article');
                var post_text = post_template.replace("{{title}}",post.title);
                post_text = post_text.replace("{{date}}",post.date);
                var tags = post.tags;
                var tags_length = tags.length;
                if (tags_length > 2) {
                  tags_length = 2;
                }
                article.innerHTML = post_text;
                var tags_holder = article.getElementsByClassName('tags')[0];
                for (j = 0; j < tags_length; j++) {
                  var tag = tags[j];
                  var a = doc.createElement('a');
                  a.innerHTML = tag;
                  a.addEventListener("click", Journal.openTag);
                  tags_holder.appendChild(a);
                }
                if (post.background && /url\(\'[A-Za-z0-9/_]*\.[a-z0-9]*\'\)/.test(post.background)) {
                  article.style.backgroundImage = post.background;
                  article.className = "picturesque";
                }
                else {
                  article.style.backgroundColor = "white";
                  article.className = "text";
                }
                article.addEventListener("click", Journal.openArticle);
                posts_holder.appendChild(article);
              }
            }
            if (posts_index > 0) {
              var load = doc.createElement('article');
              load.className = "load";
              load.innerHTML = "Load More";
              load.addEventListener("click", function () {
                var doc = document;
                var index = Journal.Blog.index;
                var data = Journal.Blog.data.posts;
                for (i = 1; i <= 4; i++) {
                  index--;
                  if (index >= 0) {
                    var i1 = index;
                    var post = data[i1];
                    var article = doc.createElement('article');
                    var post_text = post_template.replace("{{title}}",post.title);
                    post_text = post_text.replace("{{date}}",post.date);
                    var tags = post.tags;
                    var tags_length = tags.length;
                    if (tags_length > 2) {
                      tags_length = 2;
                    }
                    article.innerHTML = post_text;
                    var tags_holder = article.getElementsByClassName('tags')[0];
                    for (j = 0; j < tags_length; j++) {
                      var tag = tags[j];
                      var a = doc.createElement('a');
                      a.innerHTML = tag;
                      a.addEventListener("click", Journal.openTag);
                      tags_holder.appendChild(a);
                    }
                    if (post.background && /url\(\'[A-Za-z0-9/_]*\.[a-z0-9]*\'\)/.test(post.background)) {
                      article.style.backgroundImage = post.background;
                      article.className = "picturesque";
                    }
                    else {
                      article.style.backgroundColor = "white";
                      article.className = "text";
                    }
                    article.addEventListener("click", Journal.openArticle);
                    this.parentNode.insertBefore(article, this);
                  }
                }
                Journal.Blog.index = index;
                if (index <= 0) {
                  this.parentNode.removeChild(this);
                }
              });
              posts_holder.appendChild(load);
            }
            Journal.Blog.index = posts_index;
            posts_ele.appendChild(posts_holder);
            close(2);
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
var query = location.search;
query = query.slice(1);
if (!query) {
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
      var latest_template = '<h2>{{title}}</h2><time>{{date}}</time><div class="padding"></div><div class="tags"></div>';
      for (i = 1; i <= latest_data_length; i++) {
        var i1 = latest_data_length - i;
        var latest_data_item = latest_data[i1];
        var article = doc.createElement('article');
        var latest_data_text = latest_template.replace("{{title}}",latest_data_item.title);
        latest_data_text = latest_data_text.replace("{{date}}",latest_data_item.date);
        var tags = latest_data_item.tags;
        var tags_length = tags.length;
        if (tags_length > 2) {
          tags_length = 2;
        }
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
}
else {
  query = new Query(query);
  switch (query.page) {
    case "tags":
      alert(query.tagname);
      break;
    case "article":
      var title = query.title;
      var title_1 = title.split("%20");
      title = title_1.join(" ");
      var date = query.date;
      var date_1 = date.split("%20");
      date = date_1.join(" ");
      var bg = query.bg;
      Pages.open({
        title: title,
        date: date,
        background: bg
      }, {
       id: "article",
       extData: "data" + "/" + query.section + "/" + date_1.join("_") + "/" + title_1.join("_") + ".md",
       callback: function (close,data) {
         var md = MD.parse(data);
         var date_ele = document.getElementById("article_date");
         date_ele.innerHTML = date;
         var text_ele = document.getElementById("article_text");
         text_ele.appendChild(md);
         //var tags_ele = this.getElementById("article_tags");
         Head.Buttons.setButton("none");
         close(2);
       }
     });
      break;
  }
}
/* Other cases should be
 * Article
 * Artwork
 * Project */