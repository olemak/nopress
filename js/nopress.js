var menu = document.getElementById("menu");

function wpApiQuery (apiUrl, outputName) {
  pages = new XMLHttpRequest();
  pages.open("GET", apiUrl, true);
  pages.send();
  pages.onreadystatechange=function()
  {
  if (pages.readyState==4 && pages.status==200)
    {
      outputName = JSON.parse(pages.responseText);
      return outputName;
    }
  }
}

function noPressMenu (pages) {
  for (page in pages) {
    var node      = document.createElement("LI");
    var button    = document.createElement("BUTTON");
    var text      = document.createTextNode(pages[page].title);
    var btnClickArgument = "selectedPage(" + page + ")";
    button.setAttribute("onClick", btnClickArgument);
    button.appendChild(tekst);
    node.appendChild(button);
    menu.appendChild(node);
    }
}

function selectedPost(enkelt) {
  document.getElementById("main").innerHTML=innlegg[enkelt].content;
}
function selectedPage(enkelt) {
  document.getElementById("main").innerHTML=sider[enkelt].content;
}

function getPosts() {
  var posts;
  posts = new XMLHttpRequest();
  posts.open("GET", "http://localhost/apasje/newsite/wp-json/posts", true);
  posts.send();
  posts.onreadystatechange=function()
  {
  if (posts.readyState==4 && posts.status==200)
    {
      innlegg = JSON.parse(posts.responseText);
      for (hver in innlegg) {
        var node      = document.createElement("LI");
        document.getElementById("blocklist").appendChild(node);

        if (innlegg[hver].featured_image) {
// IMAGE
        var image = new Image();
        image.src = innlegg[hver].featured_image.attachment_meta.sizes.thumbnail.url;
        var onClickArgument = "selectedPost(" + hver + ")";
        image.setAttribute("onClick", onClickArgument);
        image.setAttribute("alt", innlegg[hver].title);
        node.appendChild(image);
        }
      }
    }
  }
}

var tekster = {
om    : 'Dette er om-teksten',
kunder: 'Dette er teksten om kunder',
blog  : 'Her kommer vel røyksignaler, da.'
};

