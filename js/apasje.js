var mainContent = [];

function makeContentList (url, locationID, name) {
  locationID = typeof locationID !== 'undefined' ? locationID : 'top-menu';
  var location = document.getElementById(locationID);
  var content = new XMLHttpRequest();

  content.open("GET", url, true);
  content.send();
  content.onreadystatechange=function()
  {
  if (content.readyState==4 && content.status==200)
    {
      content = JSON.parse(content.responseText);
      for (item in content) {
        var lastMainContentIndex = mainContent.push(content[item].content);
        var node      = document.createElement("LI");
        var button    = document.createElement("A");
        
   //     var tittel    = document.createTextNode(content[item].title);
        var header    = document.createElement("H5");
            header.appendChild(document.createTextNode(content[item].title));
        
        var ingress   = content[item].excerpt.substring(0, content[item].excerpt.indexOf('.', 0)).replace(/(<([^>]+)>)/ig,"") + '.';
            console.log(ingress);
        var paragraf  = document.createElement("P");
            paragraf.appendChild(document.createTextNode(ingress));


        if (content[item].featured_image) {
          var image = new Object;
          for (size in content[item].featured_image.attachment_meta.sizes) {
            image[size] = content[item].featured_image.attachment_meta.sizes[size];
          }

          console.log(image);

          if (image.thumbnail) {
            var bilde = document.createElement("IMG");
            bilde.src = image.thumbnail.url;
          }
        }

       if (typeof window.addEventListener === 'function') {
        (function (_item) {
          button.addEventListener("click", function(){
            updateMainContent(_item-1);
          });
        })(lastMainContentIndex);
       }
        button.appendChild(header);
        if (bilde) {node.appendChild(bilde)};
        node.appendChild(button);
        node.appendChild(paragraf);
        location.appendChild(node);
      }
      if (typeof name !== 'undefined') { 
        var header = document.createElement("H3");
        var headline = document.createTextNode(name);
        header.appendChild(headline);
        location.insertBefore(header, location.firstChild);
      }
    }
  }
}


function updateMainContent(index) {
  document.getElementById('main').innerHTML = mainContent[index];
}









//makeContentList ('http://localhost/apasje/nopress/export/posts.json', 'royksignaler', 'Røyksignaler (blog)');

function exportedStuff(importer, location, tittel) {
  var target = '//localhost/apasje/nopress/export/posts.json'; // Make tis based on options later I guess.
  var importer = new XMLHttpRequest();
      importer.onreadystatechange = function() {
        if (importer.readyState == 4 && importer.status == 200) {
          imported = JSON.parse(importer.responseText);
          console.log(imported);
        }
      }
      importer.open("GET", target, true);
      importer.send();
  console.log(importer);
 // console.log('IMPORTED: '+imported);
}