var Pages = {};

Pages.current = document.getElementById('home');

Pages.open = function (headData, pageData) {
  /*
    headData: {
      title: <string> title to be displayed.
      date: <string> |optional| date to display.
      background: <string> |optional| rgb or rgba or url of the background to be displayed.
    }
    pageData: {
      id: <string> id of the page.
      extData: <string> |optional| url to the file.
      callback: <function> the function to be called upon loading.
        close <function> exectue this to close the head after loading.
          ready switches begaviour to an immediate close to an onactive close.
        data <string> if extData url was provided and was sucessfully retrived it is provided through this argument.
    }
  */
  Head.open(headData);
  Pages.current.className = "page";
  Pages.current = document.getElementById(pageData.id);
  Pages.current.className = "page active";
  if (pageData.extData) {
    var xhttp;
    if (window.XMLHttpRequest)
      {
        xhttp = new XMLHttpRequest();
      }
    else
      {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
    xhttp.open("GET",pageData.extData,false);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        var data = xhttp.responseText;
        pageData.callback.call(Pages.current,Head.close,data);
      }
    };
    xhttp.send();
  }
  else {
    pageData.callback.call(Pages.current,Head.close);
  }
};