const addText = (text) => {
  document.getElementById("root").innerText = text;
};

addText("This should not work in IE11");
