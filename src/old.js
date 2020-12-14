function addText(text) {
  setTimeout(function () {
    var span = document.createElement("span");
    span.innerText = text;
    span.id = "mySpan";
    document.getElementById("root").appendChild(span);
  }, 50);
}

addText("Appended text");
