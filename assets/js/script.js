var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;

var Parts = {
  home: function (close, ready) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
      }
    else
      {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET","data/index.php?src=home",false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var objs = JSON.parse(xhttp.responseText);
        var ele = document.getElementById('home_latest');
        ele.innerHTML = "<h2>Latest News</h2>";
        Render.newsThumb(ele,objs);
        close(0.8);
      }
    };
    xhttp.send();
  },
  blog: function (close, ready) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
      }
    else
      {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET","data/index.php?src=blog&content=list&thumbs=16",false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var objs = JSON.parse(xhttp.responseText);
        var ele = document.getElementById('blog_posts');
        ele.innerHTML = "<h2>Latest News</h2>";
        Render.newsThumb(ele,objs);
        if (objs.length == 16) {
          var doc = document;
          var article = doc.createElement('article');
          article.className = "loadMore";
          article.innerHTML = "Load Older Stories";
          ele.appendChild(article);
        }
      }
    };
    xhttp.send();
    xhttp.open("GET","data/index.php?src=blog&content=taglist",false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var objs = JSON.parse(xhttp.responseText);
        var ele = document.getElementById('blog_tags');
        ele.innerHTML = "<h2>Tags</h2>";
        Render.tagsThumb(ele,objs);
        close(0.8);
      }
    };
    xhttp.send();
  }
};

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
    bg: "rgb(48,84,48)"
  }, Parts.home);
  if (Buttons.current) {
    Buttons.current.className = "button";
  }
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.projects.addEventListener("click", function () {
  Pages.setPage('projects', {
    title: "Projects",
    bg: "rgb(26,56,84)"
  }, function (close, ready) {
      ready();
  });
  if (Buttons.current) {
    Buttons.current.className = "button";
  }
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.blog.addEventListener("click", function () {
  Pages.setPage('blog', {
    title: "Blog",
    bg: "rgb(84,48,24)"
  }, Parts.blog);
  if (Buttons.current) {
    Buttons.current.className = "button";
  }
  Buttons.current = this;
  Buttons.current.className = "button active";
});
Buttons.about.addEventListener("click", function () {
  Pages.setPage('about', {
    title: "About Me",
    bg: "url('assets/img/about.jpg') no-repeat fixed center center"
  }, function (close, ready) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
      }
    else
      {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET","data/index.php?src=about",false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var obj = JSON.parse(xhttp.responseText);
        var summary = document.getElementById('about_summary');
        summary.innerHTML = "<p>" + obj.summary + "</p>";
        var achs = obj.achievments;
        var length = achs.length;
        var achievements = document.getElementById('about_achievments');
        achievements.innerHTML = "<h2>Achievments<h2>";
        for (i = 0; i < length; i++) {
          var ach = achs[i];
          var doc = document;
          var article = doc.createElement('article');
          article.style.background = ach.cover;
          if (ach.cover !== "") {
            article.className = "picture";
          }
          else {
            article.className = "text";
          }
          article.addEventListener("click", function () {
            var title = this.getElementsByTagName("h3")[0].innerHTML;
            var link = "data/index.php?src=about&content=article&title=" + title.split(" ").join("_");
            var bg = this.style.background;
            Pages.openArticle(title,bg,link);
          });
          var h3 = doc.createElement('h3');
          h3.innerHTML = ach.name;
          var date = doc.createElement('div');
          date.className = "time";
          date.innerHTML = ach.date;
          var p = doc.createElement("p");
          article.appendChild(h3);
          article.appendChild(date);
          article.appendChild(p);
          achievements.appendChild(article);
        }
        close(0.8);
      }
    };
    xhttp.send();
  });
  if (Buttons.current) {
    Buttons.current.className = "button";
  }
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
Head.cover = function (title, bg, date) {
  Head.title.innerHTML = title;
  if (date) {
    Head.date.innerHTML = "" + date;
  }
  else {
    Head.date.innerHTML = "";
  }
  Head.ui.style.background = bg;
  Head.ui.style.backgroundSize = "auto 100%";
};
Head.uncover = function (n) {
  var ui = Head.ui;
  if (n) {
    ui.className = "n_closed";
    if (window.setTimeout) {
      var g = setTimeout(function () {
        ui.className = "closed";
        clearTimeout(g);
      },(n*1000));
    }
    else {
      ui.className = "closed";
    }
  }
  else {
    ui.className = "closed";
  }
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
  Head.cover(headData.title, headData.bg, headData.date);
  var n = setTimeout(function () {
    Pages.current.className = "page";
    Pages.current = document.getElementById(page);
    Pages.current.className = "page active";
    callback(Head.uncover, Head.ready);
    clearTimeout(n);
  },1000);
};
Pages.openArticle = function (title,img,content,da) {
  var bg;
  if (!img) {
    bg = "lightGray";
  }
  else {
    bg = img;
  }
  if (Buttons.current) {
    Buttons.current.className = "button";
  }
  Pages.setPage('article', {
    title: title,
    bg: bg,
    date: da
  }, function (close, ready) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
      }
    else
      {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET",content,false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var parsed = Render.parseContent(xhttp.responseText);
        var ele = document.getElementById("article_content");
        var tags = document.getElementById("article_tags");
        ele.innerHTML = "";
        ele.appendChild(parsed);
        ready();
      }
    }
    xhttp.send();
  });
};
Pages.openTag = function (tag) {
  var bg = "url('data/blog/tags/" + tag + ".jpg') no-repeat fixed center center";
  Pages.setPage('blogTags', {
    title: "#" + tag,
    bg: bg
  }, function (close, ready) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
      }
    else
      {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET","data/index.php?src=blog&content=list&tags=" + tag + "&thumbs=8",false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var objs = JSON.parse(xhttp.responseText);
        var objs_length = objs.length;
        var ele = document.getElementById('blogTags_news');
        var ti = document.getElementById('blogTags_title');
        ti.innerHTML = "#" + tag;
        ele.innerHTML = "";
        Render.newsThumb(ele,objs);
        if (objs.length == 8) {
          var doc = document;
          var article = doc.createElement('article');
          article.className = "loadMore";
          article.innerHTML = "Load Older Stories";
          ele.appendChild(article);
        }
        close(0.8);
      }
    }
    xhttp.send();
  });
}

var OtherData = {
  headRender: false,
  headLoad: 0,
  headColor: false
};

Pages.setPage('home', {
  title: "Home",
  bg: "rgb(48,84,48)"
}, Parts.home);

var Render = {
  articleThumb: function (articleSummary) {
    var article = document.createElement("article");
    article.innerHTML = '<h3>' + articleSummary.title + '</h3><time>' + articleSummary.date + '</time><p>' + articleSummary.extra + '</p><div class="tags">' + articleSummary.tags + '</div><div class="read">Read More --></div>';
    if (articleSummary.img) {
      article.className = "button picture";
      article.style.background = "url('" + articleSummary.background + "')";
    }
    else {
      article.className = "button text";
    }
    article.addEventListener("click", function () {
      openArticle(articleSummary.link);
    });
    return article;
  },
  tagsThumb: function (ele,objs) {
    var objs_length = objs.length;
    for (i = 0; i < objs_length; i++) {
      var obj = objs[i];
      var doc = document;
      var article = doc.createElement('article');
      article.innerHTML = "<h3>" + obj + "</h3>";
      article.addEventListener("click", function () {
        Pages.openTag(this.textContent);
      });
      ele.appendChild(article);
    }
  },
  newsThumb: function (ele,objs) {
    var objs_length = objs.length;
    for (i = 0; i < objs_length; i++) {
      var obj = objs[i];
      var doc = document;
      var article = doc.createElement('article');
      var image = undefined;
      if (obj.img != "") {
        article.className = "picture";
        article.style.background = obj.img + " no-repeat fixed center";
        article.style.backgroundSize = "auto 100%";
        image = obj.img;
      }
      else {
        article.className = "text";
      }
      article.title = "" + obj.link;
      var h3 = doc.createElement('h3');
      h3.innerHTML = obj.title;
      var date = doc.createElement('div');
      date.className = "time";
      date.innerHTML = obj.date;
      var p = doc.createElement('p');
      p.innerHTML = obj.extra;
      var tags = doc.createElement('div');
      tags.className = "tags";
      tags.innerHTML = "#" + obj.tags.join(" #");
      var read = doc.createElement('div');
      read.className = "read";
      read.innerHTML = "Read More -->";
      article.addEventListener("click", function () {
        var title = this.getElementsByTagName("h3")[0].innerHTML;
        title = title.split(" ");
        title = title.join("_");
        var date1 = this.getElementsByClassName("time")[0].innerHTML;
        var date = date1.split(" ");
        date = date.join("_");
        var bg = this.style.background;
        var link = "data/index.php?src=blog&content=article&date=" + date + "&title=" + title;
        Pages.openArticle(title,bg,link,date1);
      });
      article.appendChild(h3);
      article.appendChild(date);
      article.appendChild(p);
      article.appendChild(tags);
      article.appendChild(read);
      ele.appendChild(article);
    }
  },
  parseContent: function (content) {
    var parsed = document.createElement("div");
    var lines = content.split("\n");
    var lines_length = lines.length;
    var title = document.getElementById("article_title");
    var doc = document;
    var currp = "";
    var tagFlag = false;
    var tag = {};
    for (i = 0; i < lines_length; i++) {
      var line = lines[i];
      if (/^\>{1}[A-Za-z0-9 ]*\<{1}$/.test(line)) {
        line = line.slice(1,-2);
        title.innerHTML = line;
      }
      else if (/^\>{2}[A-Za-z0-9 ]*\<{2}$/.test(line)) {
        line = line.slice(2,-2);
        var h2 = doc.createElement("h2");
        h2.innerHTML = line;
        parsed.appendChild(h2);
      }
      else if (/^\>{3}[A-Za-z0-9 ]*\<{3}$/.test(line)) {
        line = line.slice(3,-3);
        var h3 = doc.createElement("h3");
        h3.innerHTML = line;
        parsed.appendChild(h3);
      }
      else if (/^\>{4}[A-Za-z0-9 ]*\<{4}$/.test(line)) {
          line = line.slice(4,-4);
          var h4 = doc.createElement("h4");
          h4.innerHTML = line;
          parsed.appendChild(h4);
      }
      else if (/^\[\*/.test(line) || /\*\]$/.test(line) || tagFlag) {
        if (/^\[\*/.test(line)) {
          tagFlag = true;
          var tag_name = /^\[\*[a-z]*/.exec(line)[0].slice(2);
          switch (tag_name) {
            case "code":
              var prop_type = /\\type\=\"[a-z0-9]*\"/.exec(line)[0];
              prop_type = prop_type.slice(7,-1);
              // load syntax highlighter for this language.
              var prop_src = /\\src\=\"[a-z0-9\.]*\"/;
              if (prop_src.test(line)) {
                prop_src = prop_src.exec(line)[0];
                prop_src = prop_src.slice(6,-1);
                alert(prop_src);
              }
              // load the code from the file as text...
              
              break;
          }
        }
        else if (/\*\]$/.test(line)) {
          tagFlag = false;
        }
        else {

        }
      }
      else {
        var anchor = /\\a\="{1}[A-Za-z0-9_]*\.{1}[A-Za-z0-9]{0,5} {1}[A-Za-z0-9 \.]*"/;
        if (anchor.test(line)) {
          var ans = anchor.exec(line);
          var ans_length = ans.length;
          for (j = 0; j < ans_length; j++) {
            var an = ans[j];
            var an_shaved = an.slice(4,-1);
            var an_link = an_shaved.slice(0,an_shaved.indexOf(" "));
            var an_text = an_shaved.slice(an_shaved.indexOf(" ") + 1);
            line = line.replace(an,'<a href="' + an_link + '">' + an_text + '</a>');
          }
        }
        if (/\\p$/.test(line)) {
          currp += line.slice(0,line.length - 3);
          var p = doc.createElement("p");
          p.innerHTML = currp;
          parsed.appendChild(p);
          currp = "";
        }
        else {
          currp += line;
        }
      }
    }
    return parsed;
  }
};
/*
var streamIds = [];
var streams = [];
var CommentStream = function (ele) {
  this.ele = ele;
  var streamIds = streamIds;
  var index = streamIds.indexOf(ele);
  if (index == -1) {
    index = streamIds.indexOf(undefined);
    if (index == -1) {
      index = streamIds.length;
    }

    var doc = document;
    var title = doc.createElement('h2');
    title.innerHTML = "Comments";
    ele.appendChild(title);

    this.index = index;
    streams[this.index] = {
      ele: ele,
      src: "",
    };

    
  }
  else {
    this.index = index;
  }
  return this;
};*/