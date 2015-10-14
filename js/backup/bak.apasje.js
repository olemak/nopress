var innlegg;
var sider; 

function returnIndex(number) {
  var indexNummer = '"' + number + '"';
  return indexNummer;
}

function getPages () {
  var pages;
  var toppmeny = document.getElementById("toppmeny");

  pages = new XMLHttpRequest();
  pages.open("GET", "http://apasje.no/wp-json/posts?type=page&filter[orderby]=menu_order&filter[order]=ASC", true);
  pages.send();
  pages.onreadystatechange=function()
  {
  if (pages.readyState==4 && pages.status==200)
    {
      sider = JSON.parse(pages.responseText);
      for (side in sider) {
        var node      = document.createElement("LI");
        var button    = document.createElement("BUTTON");
        var tekst     = document.createTextNode(sider[side].title);
        var btnClickArgument = "selectedPage(" + side + ")";
        button.setAttribute("onClick", btnClickArgument);
        button.appendChild(tekst);
        node.appendChild(button);
        button.className = "animated slideInDown";
        toppmeny.appendChild(node);
        }
      }
    }
  }

function getRoyksignaler () {
  var royksignaler;
  var bloglist = document.getElementById("royksignaler");

  royksignaler = new XMLHttpRequest();
  royksignaler.open("GET", "http://apasje.no/wp-json/posts", true);
  royksignaler.send();
  royksignaler.onreadystatechange=function()
  {
  if (royksignaler.readyState==4 && royksignaler.status==200)
    {
      blogs = JSON.parse(royksignaler.responseText);
      for (blog in blogs) {
        var node      = document.createElement("LI");
        
        var tittel        = document.createElement("H5");
          // var tittel  = document.createTextNode(blogs[blog].title);
          tittel.innerHTML = blogs[blog].title;

        var ingress         = document.createElement("SPAN");
          // var ingress   = document.createTextNode(blogs[blog].excerpt);
          ingress.innerHTML = blogs[blog].excerpt; 
        
        if (blogs[blog].featured_image) {
          var image     = new Image();
          image.src   = blogs[blog].featured_image.attachment_meta.sizes.thumbnail.url;
          node.appendChild(image);
        }

        //node.appendChild(tittel);
        node.appendChild(tittel);
        node.appendChild(ingress);

        bloglist.appendChild(node);
        }
      }
    }
  }

function selectedPost(enkelt) {  
  var main = document.getElementById("main");
    main.innerHTML = '';

  var wrap = document.createElement("DIV");
    wrap.className = "animated fadeIn";
    wrap.innerHTML = innlegg[enkelt].content;

  var tittel = document.createElement("H1");
    tittel.innerHTML = innlegg[enkelt].title;
    wrap.insertBefore(tittel, wrap.firstChild);

    main.appendChild(wrap);
}
function selectedPage(enkelt) {
  main.innerHTML=sider[enkelt].content;
}

function getPosts() {
  var posts;
  posts = new XMLHttpRequest();
  posts.open("GET", "http://apasje.no/wp-json/posts", true);
  posts.send();
  posts.onreadystatechange=function()
  {
  if (posts.readyState==4 && posts.status==200)
    {
      innlegg = JSON.parse(posts.responseText);
      for (hver in innlegg) {
        var node      = document.createElement("LI");
        node.className = " hvr-float";
        document.getElementById("blocklist").appendChild(node);

        if (innlegg[hver].featured_image) {
// IMAGE
        var image = new Image();
        image.src = innlegg[hver].featured_image.attachment_meta.sizes.thumbnail.url;
        var onClickArgument = "selectedPost(" + hver + ")";
        image.setAttribute("onClick", onClickArgument);
        image.setAttribute("alt", innlegg[hver].title);
        image.className = "animated slideInUp";
        node.appendChild(image);
        }
      }
    }
  }
}
