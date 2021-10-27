function onLoadButton() {
    alert("Кнопка загрузки")
  }

function onSaveButton() {
  alert("Сохранение нанесённых объектов")
  // Generate download of hello.txt file with some content
    var text = "x1, x2"
    var filename = "points.txt";
    
    download(filename, text);
}

function onAgentButton() {
  //alert("Кнопка добаввления агента")
  console.log("Добаввления агента");
  _agentButton = true;
}

function onRoadButton() {
  alert("Кнопка добавления дороги")
  _roadButton = true;
}

function onExecuteButton() {
  alert("Кнопка вывода файла")
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function onDownloadButton() {
    // Generate download of hello.txt file with some content
    var text = "Test output"
    var filename = "result.txt";
    
    download(filename, text);
}

function Remove()
{
  map.eachLayer((layer) => {
      layer.remove();
  });
}




var map = L.map('map').setView([46.76336,-71.32453], 16);
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addRowTable(code, coords){
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  td.textContent = code;
  tr.appendChild(td);
  tr.onclick = function(){map.flyTo(coords, 17);};
  document.getElementById("t_points").appendChild(tr);
}
var buffers = [];
function addMarker(code,lat,lng){
  var p = L.marker([lat,lng]);
  p.title = code;
  p.alt = code;
  p.bindPopup(code);
  p.addTo(map);
  addRowTable(code, [lat,lng]);
  var c = L.circle([lat,lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 0
  }).addTo(map);
  buffers.push(c);
}


$(document).ready(function (){
  var points = [["M02KM262",46.76336,-71.32453],
                ["M10KM052",46.76186,-71.32247],
                ["83KM081",46.76489,-71.32664],
                ["83KM082",46.76672,-71.32919]];
  for (var i=0; i < points.length; i++){
    addMarker(points[i][0],points[i][1],points[i][2]);
  }
});

L.control.scale({maxWidth:240, metric:true, position: 'bottomleft'}).addTo(map);

L.control.polylineMeasure({position:'topleft', imperial:false, clearMeasurementsOnStop: false, showMeasurementsClearControl: true}).addTo(map);


$("#range").change(function(e){
  var radius = parseInt($(this).val())
  buffers.forEach(function(e){
    e.setRadius(radius);
    e.addTo(map);
  });
});