var MD = {};

MD.parse = function (md) {
  var doc = document;
  var div = doc.createElement('div');
  var lines = md.split("\n");
  var length = lines.length;
  var flags = {
    bold: false,
    italics: false,
    underline: false,
    cut: false,
    orderedList: [],
    unorderedList: [],
    quote: false,
    code: false
  };
  var eles = "";
  for (i = 0; i < length; i++) {
    var line = lines[i];
    if (/^\#{1} [a-zA-Z0-9 _]*/.test(line)) {
      eles += "<h1>" + line.slice(1) + "</h1>";
    }
    else if (/^\#{2} [a-zA-Z0-9 _]*/.test(line)) {
      eles += "<h2>" + line.slice(2) + "</h2>";
    }
    else if (/^\#{3} [a-zA-Z0-9 _]*/.test(line)) {
      eles += "<h3>" + line.slice(3) + "</h3>";
    }
    else if (/^\#{4} [a-zA-Z0-9 _]*/.test(line)) {
      eles += "<h4>" + line.slice(4) + "</h4>";
    }
    else if (/^\={4}/.test(line)) {
      eles += "</p></br></p>";
    }
    else if (/^\-{4}/.test(line)) {
      eles += "</p></hr></p>";
    }
    else {
      eles += "<p>";
      var line_length = line.length;
      var str = "";
      for (j = 0; j < line_length; j++) {
        character = line[j];
        if (character == "*") {
          eles += str;
          str = "";
          if (flags.bold === true) {
            eles += "</b>";
            flags.bold = false;
          }
          else {
            eles += "<b>";
            flags.bold = true;
          }
        }
        else if (character == "/") {
          eles += str;
          str = "";
          if (flags.italics === true) {
            eles += "</i>";
            flags.italics = false;
          }
          else {
            eles += "<i>";
            flags.italics = true;
          }
        }
        else if (character == "_") {
          eles += str;
          str = "";
          if (flags.underline === true) {
            eles += "</u>";
            flags.underline = false;
          }
          else {
            eles += "<u>";
            flags.underline = true;
          }
        }
        else if (character == "~") {
          eles += str;
          str = "";
          if (flags.cut === true) {
            eles += "</strike>";
            flags.cut = false;
          }
          else {
            eles += "<strike>";
            flags.cut = true;
          }
        }
        else if (character == "\"") {
          eles += str;
          str = "";
          if (flags.quote === true) {
            eles += "</q>";
            flags.quote = false;
          }
          else {
            eles += "<q>";
            flags.quote = true;
          }
        }
        else {
          str += character;
        }
      }
      eles += str;
      eles += "</p>";
    }
  }
  div.innerHTML = eles;
  return div;
};

/*

# Title
## Subtitle
### Heading
#### Subheading
Plain text
*bold text*
/italics/
_underline_
~Cut out text~
==== line break
1. ordered list
.1. 2nd ordered list
+ Unordered list
.+ 2nd Unordered list
[link [to/the/link][link text]]
[img [to/the/image.png][alt text]]
[code [link/to.js][syntax][
 All the code...
]]
"A quote"
---- A horizontal rule

*/