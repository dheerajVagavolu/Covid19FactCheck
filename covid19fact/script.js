// var button = document.getElementById("submit");
var button2 = document.getElementById("refresh");

var inf = document.getElementById("info");

// var inf2 = document.getElementById("info2");

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, function(selection) {

    var text = document.getElementById('fakearticle');
    text.innerText = selection[0];
    wrapper();
});

function wrapper() {
    var list = document.getElementById("fakearticle").value;
    list = list.trim()
    var desired = list.replace(/[^\w\s]/gi, '');
    // document.getElementById("fakearticle").value = "";
    theUrl = "https://iittp-corona-database.herokuapp.com/";
    // theUrl = "http://localhost:5000/";
    theUrl = theUrl.concat(desired);
    console.log(theUrl);
    if (theUrl == "https://iittp-corona-database.herokuapp.com/") {
        add_message("To make a query, either select a text from a web page and press the extension icon in the chrome toolbar, or directly enter your query into the text area provided and press refresh!");
    } else {
        setTimeout(hidePage, 100);
        setTimeout(showPage, 15000);
        new_str = httpGet(theUrl);
    }

}

// button.addEventListener("click", function() {
//     setTimeout(hidePage, 100);
//     setTimeout(showPage, 500);
//     wrapper();
//     // alert(new_str);
//     // document.getElementById('fakearticle').value = new_str.string;
// }, false);

inf.addEventListener("click", function() {
    flip();
}, false);

// inf2.addEventListener("click", function() {
//     flip2();
// }, false);


button2.addEventListener("click", function() {

    wrapper();
    // alert(new_str);
    // document.getElementById('fakearticle').value = new_str.string;
}, false);

// Need to install cors policy

function add_news(Loki, url, date, num) {

    var node = document.createElement("div");

    node.classList.add("news");

    var per = document.createElement("div");
    var per_new_content = document.createTextNode(num + "%");
    per.appendChild(per_new_content);
    per.classList.add("perc");

    var p = document.createElement("div");
    var nc = document.createTextNode(date);
    p.appendChild(nc);
    p.classList.add("tooltiptext");

    var per1 = document.createElement("a");
    var per1_new_content = document.createTextNode(Loki);
    per1.appendChild(per1_new_content);
    per1.setAttribute('href', url);
    per1.setAttribute('target', '_blank');

    per1.classList.add("rate");

    node.appendChild(per1);
    node.appendChild(per);
    node.appendChild(p);

    var element = document.getElementById("container");
    element.appendChild(node);

}

function add_message(Loki) {
    var node = document.createElement("div");
    node.classList.add("msg");
    var per = document.createTextNode(Loki);
    node.appendChild(per);
    var element = document.getElementById("container");
    element.appendChild(node);
}


function httpGet(theUrl) {

    // fetch(theUrl)
    //     .then(function(response) {
    //         console.log(response.json());

    //     }).then(function(text) {
    //         console.log('GET response text:');
    //         console.log(text); // Print the greeting as text
    //     });

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true); // false for synchronous request
    xmlHttp.send();

    // if (xmlHttp.status === 200) {
    //     console.log(xmlHttp.response.text());
    //     return xmlHttp.response.json();
    // }
    var count = 1;
    xmlHttp.onreadystatechange = (e) => {
        var res = JSON.parse(xmlHttp.response);
        // console.log(res["string1"]);

        console.log(typeof res);
        var bb = document.getElementById("container");
        bb.innerHTML = '';
        var flag = 0

        if (count == 2) {
            if (res["num1"] > 0) {
                flag = 1
                add_news(res["string1"], res["url1"], res["date1"], res["num1"]);
            }
            if (res["num2"] > 0) {
                flag = 1
                add_news(res["string2"], res["url2"], res["date2"], res["num2"]);
            }
            if (res["num3"] > 0) {
                flag = 1
                add_news(res["string3"], res["url3"], res["date3"], res["num3"]);
            }

            if (flag == 0) {
                add_message("No related Articels found!");
            }

        }

        count = count + 1;

    }

}

document.getElementById("bod").onload = function() { myFunction() };


var myVar;

function flip() {

    if (document.getElementById("in_info").style.display === "none") {
        document.getElementById("in_info").style.display = "block";
    } else {
        document.getElementById("in_info").style.display = "none";
    }
    // document.getElementById("in_info").style.display = "block";
}

// function flip2() {
//     // document.getElementById("inner").style.display = "block";
//     // document.getElementById("in_info").style.display = "none";
// }


function myFunction() {
    myVar = setTimeout(showPage, 100);
}

function ultraFunction() {
    my = setTimeout(hidePage, 15000);
    vara = setTimeout(showPage, 15000);
}


function showPage() {
    document.getElementById("loadcon").style.display = "none";
    document.getElementById("container").style.display = "inline-block";
}

function hidePage() {
    document.getElementById("loadcon").style.display = "inline-block";
    document.getElementById("container").style.display = "none";
}