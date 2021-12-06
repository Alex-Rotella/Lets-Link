const places = ["Choose a place type...",
  "Parks and Outdoors", "Coffee shop", "Gas station",
  "Food", "Hotel"];

const select = document.createElement("select", "");
select.setAttribute("class", "esri-widget esri-select");
select.setAttribute("style", "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em");

places.forEach(function (p) {
  const option = document.createElement("option");
  option.value = p;
  option.innerHTML = p;
  select.appendChild(option);
});