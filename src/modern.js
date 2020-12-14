const addText = (text) => {
  setTimeout(() => {
    const span = document.createElement("span");
    span.innerText = text;
    span.id = "mySpan";
    document.getElementById("root").appendChild(span);
  }, 50);
};

addText("Appended text");
