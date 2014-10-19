<?php
  function length ($arr) {
    $i = 0;
    while ($arr[$i]) {
      $i = $i + 1;
    }
    return $i;
  }
  function get_blog_thumbs ($thumbs,$start) {
    $list = file_get_contents("blog/index.json");
    $list = json_decode($list);
    $bits = $list->posts;
    $bits_length = length($bits);
    $arr = [];
    for ($i = 0; $i < $thumbs; $i++) {
      $index = ($bits_length - $start - 1) - $i;
      if ($index >= 0) {
        $bit = $bits[$index];
        if ($bit) {
          array_push($arr,$bit);
        }
      }
    }
    return $arr;
  };
  function get_blog_taggedThumbs ($thumbs,$start,$tags) {
    $list = file_get_contents("blog/index.json");
    $list = json_decode($list);
    $bits = $list->posts;
    $bits_length = length($bits);
    $arr = [];
    $i = 0;
    $controller = true;
    while ($controller) {
      $index = ($bits_length - $start - 1) - $i;
      if ($index >= 0) {
        $bit = $bits[$index];
        if ($bit) {
          if (array_search($tags,$bit->tags) > -1) {
            array_push($arr,$bit);
          }
        }
      }
      else {
        $controller = false;
      }
      if (length($arr) >= $thumbs) {
        $controller = false;
      }
      $i++;
    }
    return $arr;
  }
  function get_blog_tags () {
    $list = file_get_contents("blog/index.json");
    $list = json_decode($list);
    $bits = $list->tags;
    return $bits;
  }

  switch ($_GET["src"]) {
    case "about":
      switch ($_GET["content"]) {
        case "article":
          $name = $_GET["title"];
          $full = "about/story/" . $name . ".txt";
          echo file_get_contents($full);
          break;
        default:
          echo file_get_contents("about/index.json");
          break;
      }
      break;
    case "blog":
      switch($_GET["content"]) {
        case "article":
          $path = $_GET["date"];
          $name = $_GET["title"] . ".txt";
          $full = "blog/" . $path . "/" . $name;
          echo file_get_contents($full);
          break;
        case "taglist":
          $arr = get_blog_tags();
          $lines = json_encode($arr);
          echo $lines;
          break;
        default:
          $tags = $_GET["tags"];
          $thumbs = $_GET["thumbs"];
          $start = $_GET["start"];
          if ($start == NULL) {
            $start = 0;
          }
          if ($tags == NULL) {
            $arr = get_blog_thumbs($thumbs,$start);
            $lines = json_encode($arr);
            echo $lines;
          }
          else {
            $arr = get_blog_taggedThumbs($thumbs,$start,$tags);
            $lines = json_encode($arr);
            echo $lines;
          }
          break;
      }
      break;
    default:
      $arr = get_blog_thumbs(4,0);
      $lines = json_encode($arr);
      echo $lines;
      break;
  };
?>