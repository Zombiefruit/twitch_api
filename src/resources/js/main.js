/*jshint esversion: 6 */

const url = "https://api.twitch.tv/kraken/streams";
var response = null;
var dataArray = [];

window.onload = function() {
    grabData();
};

document.getElementById("all").onclick = function() {};

document.getElementById("online").onclick = function() {};

document.getElementById("offline").onclick = function() {};

function linkHover(e) {
    console.log(e);
    console.log("Here");
    e.className = "green-border";
}

function coalesceData(data) {
    var dataArray = [];

    for (var i = 0; i < data.streams.length; i++) {
        dataArray.push({
            name: data.streams[i].channel.display_name,
            game: data.streams[i].channel.game,
            logo: data.streams[i].channel.logo,
            status: data.streams[i].channel.status,
            url: data.streams[i].channel.url,
            views: data.streams[i].channel.views,
        });
    }

    // console.log(dataArray);
    // displayData(dataArray);
    populateGrid(dataArray);
}

function populateGrid(dataArray) {
    var table = document.createElement("table");
    table.id = "data-table";
    var row = document.createElement("tr");

    for (var i = 1; i <= dataArray.length; i++) {
        var tableItem = document.createElement("td");
        var linkContainer = document.createElement("a");
        var itemImage = document.createElement("img");

        linkContainer.href = dataArray[i - 1].url;
        linkContainer.target = "_blank";
        itemImage.onmouseover = function(e) {
            linkHover(e);
        };
        itemImage.src = dataArray[i - 1].logo;

        linkContainer.appendChild(itemImage);
        tableItem.appendChild(linkContainer);
        row.appendChild(tableItem);

        // This checks to see if it's time to make a new row, in order to keep the table a square
        if (i % Math.round(Math.sqrt(dataArray.length + 1)) === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
    table.appendChild(row);
    document.getElementById('inject').appendChild(table);
}

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
}
