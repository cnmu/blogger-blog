Array.prototype.inArray = function (searchedVal) {
    return this.filter(function(item,index,array){return(item==searchedVal)}).length==true
}
var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

var HttpRequest = {};
    HttpRequest.GET=function(url) {
        var xmlhttp;
        if (url.length == 0) {
            return ;
        }
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {}
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

var Backend = {};
    Backend.call=function(f,properties){
        return HttpRequest.GET(window.location.origin+dir+"/Backend.php?function="+f+"&properties="+JSON.stringify(properties));
    }

var mp3player = {};
    mp3player.mini = function(mp3url,color){
        color = (typeof color === "undefined") ? "#085c68" : color;
        return '\
        <object type="application/x-shockwave-flash" data="'+dir+'/inc/player_mp3_mini.swf" width="200" height="20">\
            <param name="movie" value="'+dir+'/inc/player_mp3_mini.swf" />\
            <param name="bgcolor" value="'+color+'" />\
            <param name="FlashVars" value="mp3='+mp3url+'&autoplay=1'+'" />\
        </object>';
    }
    
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();