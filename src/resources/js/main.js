const url = "https://api.twitch.tv/kraken/streams";
var response = null;
var dataArray = [];

window.onload = function() {
  grabData();
};

document.getElementById("all").onclick = function() {
};

document.getElementById("online").onclick = function() {
};

document.getElementById("offline").onclick = function() {
};

function coalesceData(data) {
  var dataArray = [];

  for (var i = 0; i < data.streams.length; i++) {
    dataArray.push({
      name : data.streams[i].channel.display_name,
      game : data.streams[i].channel.game,
      logo : data.streams[i].channel.logo,
      status : data.streams[i].channel.status,
      url : data.streams[i].channel.url,
      views : data.streams[i].channel.views,
    });
  }

  console.log(dataArray);
  displayData(dataArray);
};

function displayData(dataArray) {
  var list = document.createElement("ul");

  for (var i = 0; i < dataArray.length; i++) {
    var listItem = document.createElement("li");
    var text = document.createTextNode(dataArray[i].name);
    listItem.appendChild(text);
    list.appendChild(listItem);
  }

  document.getElementById('inject').appendChild(list);

};

function grabData() {
  var xmlObject = new XMLHttpRequest();

  xmlObject.onreadystatechange = function() {
    if (xmlObject.status === 200 && xmlObject.readyState === 4) {
      // Request was a success
      response = JSON.parse(xmlObject.responseText);
      console.log(response);
      //displayData(response);
      coalesceData(response);
    }
  };

  xmlObject.open("GET", url, true);
  xmlObject.send();
};
