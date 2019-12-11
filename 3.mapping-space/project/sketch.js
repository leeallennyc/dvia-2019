//Declare variables
var table2019; // <-- all_month.csv data
var table2018; //<-- create 2018 quake Table
var table2017; //<-- create 2017 quake Table

var geoJSONDataDay; // <-- significant_day.geojson data from USGS 
var geoJSONDataWeek; // <-- significant_week.geojson data from USGS 
var geoJSONDataMonth; // <-- significant_month.geojson data from USGS 
var geoJSONDataMonthAll; // <-- all_month.geojson data from USGS 

// var volcanos; // <-- Volcanic data from Harvard (https://earthworks.stanford.edu/catalog/harvard-glb-volc)
var volcanosData; // <-- Global Volcanism Program, 2013. Volcanoes of the World, v. 4.8.4. Venzke, E (ed.). Smithsonian Institution. Downloaded 07 Dec 2019. https://doi.org/10.5479/si.GVP.VOTW4-2013

var globe; // <--  Leaflet.JS Map

var getColorQuakes; // <-- declared as Global for Quake color
var getColorVolcs; // <-- declared as Global for Volcano color


// Preload
function preload() {
 
    // load the CSV data into our `table2019` variable and clip out the header row
    table2019 = loadTable("2019_all_month.csv", "csv", "header");
    //  // load number of quakes per mag by number 2018
    table2018 = loadTable("2018_all_month.csv", "csv", "header");
    //  // load number of quakes per mag by number 2017
    table2017 = loadTable("2017_all_month.csv", "csv", "header");
    //load significant_day.geojson Quake file into geoJSONData variable
    // geoJSONDataDay = loadJSON('../data/significant_day.geojson');
    //load significant_week.geojson Quake file into geoJSONData variable
    // geoJSONDataWeek = loadJSON('../data/significant_week.geojson');
    //load significant_month.geojson Quake file into geoJSONData variable
    // geoJSONDataMonth = loadJSON('../data/significant_month.geojson');
    //load all_month.geojson Quake file into geoJSONData variable
    geoJSONDataMonthAll = loadJSON('../data/all_month.geojson');
    //load volcanic activity 
    // volcanos = loadJSON("harvard-glb-volc-geojson.json");
    volcanosData = loadJSON("volcanic_eruptions.geojson");
}
// End of Preload Function --------------------------------------

// Setup
function setup() {

    // Create Title Div
    let title = createDiv("The Ring of Fire");
    title.parent('title');

    // Setup canvas1 and connect to "canvas1" div
    let canvas1 = createCanvas(5000, 2500);
    canvas1.parent('container1');
   
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap();

    // call our function (defined below) that populates the maps with markers based on the table2019 contents
    // addCircles();

    // before querying the Tectonic plate/fault data, you need to let it know which map you're using
    Tectonic.useMap(globe);

    // Create container instance
    let container1 = function(a) {
        a.x = 400;
        a.y = displayWidth;
        a.setup = function() {
            a.createCanvas(a.x, a.y);
            var myContainerDiv1 = createDiv();
            myContainerDiv1.parent=('container1');
            a.background(255);
        }
        // a.draw = function() {
        //             a.fill(255, 0, 0, 50);
        //             a.noStroke();
        //             a.ellipse(a.x/2, a.y/2, 10, 10);
                // a.x = a.x + a.random(-10, 10)
                // a.y = a.y + a.random(-10, 10)
        }
     
    //Create second Container
    let container2 = function(a) {
        a.x = 400;
        a.y = displayWidth;
        a.setup = function() {
            a.createCanvas(a.x, a.y);
            var myContainerDiv2 = createDiv();
            myContainerDiv2.parent=('container2');
            a.background(255);
        }
        // a.draw = function() {
        //             a.fill(255, 0, 0, 50);
        //             a.noStroke();
        //             a.ellipse(a.x/2, a.y/2, 10, 10);
                // a.x = a.x + a.random(-10, 10)
                // a.y = a.y + a.random(-10, 10)
    }

    // Call instances of new Containers
    let newContainer1 = new p5(container1);
    let newContainer2 = new p5(container2);
     // set up typography
     textFont("Rokkitt");
     textSize(14);
     fill(60);
     noStroke();
 
 
    // set up x, y, rowHeight, and colWidth
    let x = 200;
    let y = 550;
    let rowHeight = 45;
    let colWidth = 40;
    let colWidth2 = 5;
    
    let increment = 40;
    let opacity = 90;

    let magRange = ["0 - 0.199", "0.2 - 0.99", "1.00 - 1.99", "2.00 - 2.99", "3.00 - 4.99", "5.00 - 5.99", "6 +"];
    let volcEXplIndex = [" "]
    let numOfQuakes = ["0", "250", "500", "750", "1000", "1250", "1500", "1750", "2000", "2250", "2500", "2750", "3000", "3250", "3500", "3750", "4000","4250", "4500", "4750", "5000", "5250", "5500"];


    // BAR CHART FOR MAGNITUDE All MONTH 2019

    // Set Text Style and alignment
    textStyle(BOLD);
    textAlign(CENTER);
    for (let i = 0; i<magRange.length; i++) {
    text(magRange[i], x-100, y);
    y += rowHeight;
    } 
 
    // Draw out the numOfQuakes range from numOfQuakes array
    x = 160;
    y = 900;
    textStyle(BOLD);
    textSize(12);
    textAlign(CENTER);
    for (let d = 0; d<numOfQuakes.length; d++){
        text(numOfQuakes[d], x, y-rowHeight);
        x += colWidth;
    }
 
 
      //  Draw ticks to fit number of quakes
    x = 160;
    y = 910;
    for (let t = 0; t < numOfQuakes.length; t++){
        fill("orange");
        noStroke();
        rect(x, y - rowHeight, 1, 10);
        x += colWidth;
    }
    
    //  Draw  ticks to fit the 5 year span
    x = 161;
    y = 915;
      for (let m = 0; m < (numOfQuakes.length*5) - 4; m++){
          fill("orange");
          ellipse(x, y - rowHeight, 1, 1);
          x += colWidth/5;
      }
 
 
    // 0.00 - 0.2 Magnitude
    x = 160;
    y = 495;
   
    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag < 0.19){
                // var isTrue;
                // var count = _.filter(mag, function(isTrue) { if (isTrue.mag < 0.19) return isTrue}).length;
                // console.log("There are :" + mag + "Earthquakes, with a magnitude less than 0.19");
                noStroke();
                fill("#fed976");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
                // console.log(isTrue);
            } 
        }

        // 0.2 - 0.99 Magnitude
    x = 160;
    y += rowHeight;
   
   for (let r=0; r < table2019.getRowCount(); r++) {
           let mag = table2019.getString(r, 4);
       // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
       // print(maptableToYearsLength);
       // Loop through and determine match between country and day of week and color accordingly
           if (mag > 0.19 && mag < 0.99){
            noStroke();
            fill("#feb24c");
            rect(x, y + increment, 0.25, 20);
            x += 0.25;         
        }
    }
   
    // 1.00 - 1.99 Magnitude
    x = 160;
    y += rowHeight;
    
    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 0.99 && mag < 1.99){
                noStroke();
                fill("#fd8d3c");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 2.00 - 2.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 1.99 && mag < 2.99){
                noStroke();
                fill("#fc4e2a");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 3.00 - 4.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 2.99 && mag < 4.99){
                noStroke();
                fill("#e31a1c");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 5.00 - 5.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 4.99 && mag < 5.99){
                noStroke();
                fill("#bd0026");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 6 + Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2019.getRowCount(); r++) {
            let mag = table2019.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 5.99){
                noStroke();
                fill("#800026");
                rect(x, y + increment, 0.25,20);
                x += 0.25;         
            } 
    }
       // BAR CHART FOR MAGNITUDE All MONTH 2019 END  ----------------------------

       // BAR CHART FOR MAGNITUDE All MONTH 2018 BEGIN  --------------------------

       // Set Text Style and alignment
    x = 200;
    y = 1055;

    for (let i = 0; i<magRange.length; i++) {
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(12);
    color(255);
    text(magRange[i], x-100, y);
    y += rowHeight;
    } 
 
    // Draw out the numOfQuakes range from numOfQuakes array
    x = 160;
    y = 1400;
    textStyle(BOLD);
    textSize(12);
    textAlign(CENTER);
    for (let d = 0; d<numOfQuakes.length; d++){
        text(numOfQuakes[d], x, y-rowHeight);
        x += colWidth;
    }
 
 
    //  Draw ticks to fit number of quakes
    x = 160;
    y = 1415;
    for (let t = 0; t < numOfQuakes.length; t++){
        fill("orange");
        noStroke();
        rect(x, y - rowHeight, 1, 10);
        x += colWidth;
    }
    
    //  Draw  ticks to fit the 5 year span
    x = 161;
    y = 1415;
      for (let m = 0; m < (numOfQuakes.length*5) - 4; m++){
          fill("orange");
          ellipse(x, y - rowHeight, 1, 1);
          x += colWidth/5;
      }
 
 
    // 0.00 - 0.2 Magnitude
    x = 160;
    y = 1000;
   
    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag < 0.19){
                // var isTrue;
                // var count = _.filter(mag, function(isTrue) { if (isTrue.mag < 0.19) return isTrue}).length;
                // console.log("There are :" + mag + "Earthquakes, with a magnitude less than 0.19");
                noStroke();
                fill("#fed976");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
                // console.log(isTrue);
            } 
        }

        // 0.2 - 0.99 Magnitude
    x = 160;
    y += rowHeight;
   
   for (let r=0; r < table2018.getRowCount(); r++) {
           let mag = table2018.getString(r, 4);
       // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
       // print(maptableToYearsLength);
       // Loop through and determine match between country and day of week and color accordingly
           if (mag > 0.19 && mag < 0.99){
            noStroke();
            fill("#feb24c");
            rect(x, y + increment, 0.25, 20);
            x += 0.25;         
        }
    }
   
    // 1.00 - 1.99 Magnitude
    x = 160;
    y += rowHeight;
    
    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 0.99 && mag < 1.99){
                noStroke();
                fill("#fd8d3c");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 2.00 - 2.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 1.99 && mag < 2.99){
                noStroke();
                fill("#fc4e2a");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 3.00 - 4.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 2.99 && mag < 4.99){
                noStroke();
                fill("#e31a1c");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 5.00 - 5.99 Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 4.99 && mag < 5.99){
                noStroke();
                fill("#bd0026");
                rect(x, y + increment, 0.25, 20);
                x += 0.25;
            }
    }

    // 6 + Magnitude
    x = 160;
    y += rowHeight;

    for (let r=0; r < table2018.getRowCount(); r++) {
            let mag = table2018.getString(r, 4);
        // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
        // print(maptableToYearsLength);
        // Loop through and determine match between country and day of week and color accordingly
            if (mag > 5.99){
                noStroke();
                fill("#800026");
                rect(x, y + increment, 0.25,20);
                x += 0.25;         
            } 
    }



    // create a color scale we can use for assigning colors based on magnitude and volcanic activity
    var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10]);
 
    // convert the raw geoJSON feed we loaded from the USGS into a plain array of objects
    // var quakesWeekly = unpackJSON(geoJSONDataWeek);
    var quakes = unpackJSON(geoJSONDataMonthAll);
    quakes = sortQuakes(quakes, '-mag') // '-mag' means sort from largest to smallest and 'mag'--smallest to largest
    
    /* try uncommenting the next line and sorting by different attribute */
    // quakes = sortQuakes(quakes, '-depth') // '-depth' means sort from deepest to shallowest
    
    translate(100,100);
    for (var i=0; i<quakes.length; i++){
      var quake = quakes[i];
      
      // draw a dot for the magnitude
      noStroke();
      fill(magScale(quake.mag).hex());
      circle(0,0, quake.mag * 4);
  
      // draw a line for the depth
      stroke(0);
      strokeWeight(2);
      line(20,0, 20+quake.depth/30, 0);
  
      // typeset the place name
      noStroke();
      fill(100);
      textSize(10);
      textStyle(ITALIC);
      textAlign(LEFT);
      text(quake.place, 20, 4);

      // use translate to change position before looping to draw the next quake
      var maxRows = 12;
      if ((i+1)%maxRows==0){
        // new column
        resetMatrix();
        translate(100 + 350*ceil(i/maxRows),100);
      } else {
        // move to next row
        translate(0, 32)
        }
    }
} 
// End of Setup Function --------------------------------------------------

// Setup Map, Tiles, Legends ----------------------------------------------
function setupMap(){
    // Declare and Set Map and Long/Lat View to Alaska/Pacific Ocean with Leaflet.
    globe = L.map('Esri_WorldGrayCanvas', {worldCopyJump:true}).setView([45.160507, -178],  2.5);
    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 14,
        minZoom: 2.5,
        // zoomDelta: 0.25,
        // zoomSnap: 0,
    }).addTo(globe);

    // Create Zoom/Storytelling on different locations near the ring of fire. * Needs work
    var ringOfFlying = [
        // California Zooming
        { latlng: [35.77929, -117.696247], zoom: 5.5 },
        { latlng: [35.77929, -117.696247], zoom: 5 },
        // Alaska Zoom
        { latlng: [60.232746, -139.348919], zoom: 5.5 },
        // Alaska Zoom Detail
        { latlng: [61.14405, -150.507916], zoom: 6 },
        // Alaska Zoom Volcanos
        { latlng: [57.570225, -161.71807], zoom: 4 },
        // Japan Zoom
        { latlng: [49.210813, -197.850097], zoom: 4 },
        { latlng: [48.638587, -207.378766], zoom: 5.5 },
        // Japan Detail
        { latlng: [38.99604, -216.440155], zoom: 5.5 },
        { latlng: [36.956305, -210.440155], zoom: 3.5 },
        // Back to Start
        { latlng: [45.160507, -178], zoom: 2.5}
       ];
       
       var flightNumber = 0;
       
       setInterval(function() {
       
         // flyTo the n-th flight destination
         globe.flyTo(ringOfFlying[flightNumber].latlng, ringOfFlying[flightNumber].zoom );
       
         // The next iteration flys to the next flight destination
         flightNumber++;
       
         // The first element is zero and the last valid element is the (length - 1)-th. 
         if (flightNumber >= ringOfFlying.length) {
            globe.setView([45.160507, -178],  2.5);
         }
       }, 10000);
    
    // return color based on volcanic activity for Legend
    let getColorVolcs = function(d) {
    return d > 6.0  ? '#252525' :
        d > 5.0  ? '#081d58' :
        d > 3.0  ? '#253494' :
        d > 2.0  ? '#225ea8' :
        d > 1.0  ? '#1d91c0' :
        d > 0.2  ? '#41b6c4' :
        d > 0.0  ? '#7fcdbb' :
                   '#7fcdbb' ;
    };
    
    // return color based on earthquake activity for Legend
    let getColorQuakes = function(d) {
        return d > 6  ? '#800026' :
            d > 5.99  ? '#bd0026' :
            d > 4.99  ? '#e31a1c' :
            d > 2.99  ? '#fc4e2a' :
            d > 1.99  ? '#fd8d3c' :
            d > .99  ? '#feb24c' :
            d > 0.2  ? '#fed976' :
                       '#fed976' ;
    };
    
    // Legend 1 (Top right/EarthQuake)
    let legend = L.control({position:  'topright'});
    legend.onAdd = function (globe) {
    
        var  div =  L.DomUtil.create('div', 'info  legend'),
        scales =  [0.0, 0.2, 1.0, 2.0, 3.0, 5.0, 6.0],
        labels =  [];
    
        for  (let i = 0; i<scales.length;  i++) {
            div.innerHTML +=
                '<i  style  = "background:' + getColorQuakes(scales[i] + 1) + '"></i> ' +
                scales[i] + (scales[i +1] ? '&ndash;' + scales[i + 1] + '<br' : '+');
        }
        return div;
    };
    
    // Legend 2 (Bottom right/Volcano)
    let legend2 = L.control({position:  'bottomright'}); 
    legend2.onAdd = function (globe) {
    
        var  div =  L.DomUtil.create('div', 'info  legend2'),
        scales =  [0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0],
        labels =  [];
    
        for  (let i = 0; i<scales.length;  i++) {
            div.innerHTML +=
                '<i  style  = "background:' + getColorVolcs(scales[i] + 1) + '"></i> ' +
                scales[i] + (scales[i +1] ? '&ndash;' + scales[i + 1] + '<br' : '+');
        }
        return div;
    };
    
    // Add legend 1 and 2 to Map
    legend.addTo(globe);
    legend2.addTo(globe);


    // let the mirroredFeatures function add rotated copies of all the coordinates in the .features array
    geoJSONDataMonthAll.features = mirroredFeatures(geoJSONDataMonthAll.features)

    // step through the features and create a layer for each in the Earthquake JSON File
    for (var i=0; i<geoJSONDataMonthAll.features.length; i++){
        var feature = geoJSONDataMonthAll.features[i];
        var loc = feature.geometry.coordinates;
        var mag = feature.properties.mag;
        var place = feature.properties.place;

 
    // use the pointToLayer option to pick a layer type (otherwise it defaults to a pin-style L.marker)
        var eqDot = L.geoJSON(feature, {pointToLayer: (pt, latlng) => L.circleMarker(latlng)})
                    .setStyle({weight:.2, color: getColorQuakes(mag), fillOpacity: 0.3, radius:2})
                    .bindTooltip(`Location: ${place},  Magnitude: ${mag}`)
                    .addTo(globe);
    }

    // let the mirroredFeatures function add rotated copies of all the coordinates in the .features array
    volcanosData.features = mirroredFeatures(volcanosData.features)

    // step through the features and create a layer for each in the Volcanos JSON File
    for (var i=0; i<volcanosData.features.length; i++){
        var feature = volcanosData.features[i];
        var loc = feature.geometry.coordinates;
        var year = feature.properties.EndDateYear;
        var explosivityIndex = feature.properties.ExplosivityIndexMax;
        var name = feature.properties.VolcanoName;

        // use the pointToLayer option to pick a layer type (otherwise it defaults to a pin-style L.marker)
        var volcDot = L.geoJSON(feature, {pointToLayer: (pt, latlng) => L.circleMarker(latlng)})
                    .setStyle({weight:.2, color: getColorVolcs(explosivityIndex), fillOpacity: 0.5, radius:2})
                    .bindTooltip(`Volcano Name: ${name},  Expolsivity Index: ${explosivityIndex}, Year: ${year}`)
                    .addTo(globe);
    }

    // use lodash to count up the number of earthquakes per faultline and store them in an object whose
    // attributes are fault names and values are integers with the total counts
    // var faultCounts = _.countBy(table.rows, function(row){
    //     // Tectonic.findFault() takes a [lat,lng] coordinate and returns an object with fields for
    //     // 'latitude', 'longitude', 'distance', and 'name' describing which fault (and where along it)
    //     // the quake is closest to. The distance value is in kilometers and latitude/longitude are the 
    //     // the closest point to the quake on the fault.
    //     return Tectonic.findFault(row.getNum('latitude'), row.getNum('longitude')).name
    // })
  
    // the variable Tectonic.plates is an array of geoJson 'feature' objects. 
    // Add each to the map as a yellow dashed line
    for (var i=0; i<Tectonic.faults.length; i++){
        var fault = Tectonic.faults[i]
        var name = fault.properties.name

        var layer = L.geoJSON(fault.geometry)
        layer.setStyle({
        color: "#FDFBAC", 
        weight:1.5,  
        fillOpacity:0,
        "dashArray": 5,
        "dashOffset": 5,
        "opacity": 0.8
        }).addTo(globe); // <-- add .bindTooltip(`${name} fault: ${faultCounts[name]} quakes`)  before .addTo () 

    }
  
      // step through the earthquakes csv and add a small dot for each one
    //   for (var r=0; r<table.rows.length; r++){
    //       var row = table.getRow(r)
    //       var lat = row.getNum('latitude')
    //       var lng = row.getNum('longitude')
    //       var mag = row.getNum('mag')
    //       var place = row.getString('place')
  
          // find the intersection point with the nearest fault
        //   var closest = Tectonic.findFault(lat, lng)
  
          // draw a line connecting the quake to the closest faultline nearby
        //   L.polyline([[lat, lng], [closest.latitude, closest.longitude]], {
        //       color:'red',
        //       weight:1
        //   }).bindTooltip(`${closest.distance.toFixed(1)} km from ${closest.name} fault`).addTo(globe)
  
          // draw a marker at the location of the quake itself
        //   L.circleMarker([lat, lng], {
        //       weight:4,
        //       color:'red',
        //       fillColor:'white',
        //       fillOpacity:1,
        //       radius:3
        //   }).bindTooltip(`<b>${mag.toFixed(1)}</b> · ${place}`).addTo(globe)
    };

// End of Setup Map function ------------------------------------------ 

// Function Logic
function unpackJSON(feed, sortAttr){
    // Converts the USGS's geojson feed into an array of quake objects and optionally sorts them 
    // based on the specified attribute name (if present)
    //
    // Each object in the list contains the following attributes:
    //    longitude, latitude, depth, mag, place, time, updated, tz, url, 
    //    detail, felt, cdi, mmi, alert, status, tsunami, sig, net, code, 
    //    ids, sources, types, nst, dmin, rms, gap, magType, type,
    // 
    // See the ComCat documentation page for details on what each attribute encodes:
    //    https://earthquake.usgs.gov/data/comcat/data-eventterms.php
    // 
    let quakes = _.map(feed.features, item => {
        let [longitude, latitude, depth] = item.geometry.coordinates
        return _.extend({longitude, latitude, depth}, item.properties)
    })
    return sortAttr ? sortQuakes(quakes, sortAttr) : quakes
    }
    
function sortQuakes(quakeArray, sortAttr){
// Sorts an array of quake objects based on the attribute name you supply. 
// 
// By default the list of quakes returned by the function will be sorted in ascending order.
// If you pass an attribute name with a '-' at the start of it, the quakes will be sorted in 
// descending order instead. e.g.,
// 
//    var quakes = unpackJSON(jsonData)
//    var chronological = sortQuakes(quakes, 'time')
//    var reverseChron = sortQuakes(quakes, '-time')
// 
var sorted = _.sortBy(quakeArray, _.trim(sortAttr,'-'))
return _.startsWith(sortAttr, '-') ? _.reverse(sorted) : sorted
}
    
function maxValue(quakeArray, attr){
// searches through all the quakes in an array to find the largest value for a particular attribute
return _.max(_.map(quakeArray, attr))
}

function minValue(quakeArray, attr){
// searches through all the quakes in an array to find the smallest value for a particular attribute
return _.min(_.map(quakeArray, attr))
}

// Mirroring the Features of volcanic JSON Data +360 and -360
function mirroredFeatures(features){
    var shiftLeft = points => _.map(points, ([lng, lat]) => [lng-360, lat])
    var shiftRight = points => _.map(points, ([lng, lat]) => [lng+360, lat])
    
    var mirror = {
        Point:           coords => [coords, shiftLeft([coords])[0], shiftRight([coords])[0]],
        LineString:      coords => [coords, shiftLeft(coords), shiftRight(coords)],
        Polygon:         coords => [coords, _.map(coords, shiftLeft), _.map(coords, shiftRight)],
        MultiPoint:      coords => coords.concat(shiftLeft(coords), shiftRight(coords)),
        MultiLineString: coords => coords.concat(_.map(coords, shiftLeft), _.map(coords, shiftRight)),
        MultiPolygon:    coords => _.map(coords, poly => poly.concat(_.map(poly, shiftLeft), _.map(poly, shiftRight))),
    }
    
    return _.map(features, ({type, properties, geometry}) => ({
        type, properties,
        geometry:{
        type:geometry.type.replace(/^(Multi)?/, 'Multi'),
        coordinates:mirror[geometry.type](geometry.coordinates)
        }
    }))
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    let colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    let colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    let colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    let colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
}



//#######Snippets to use below for experiments_____________________________________________________




// Async callback function for loading JSON
// loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",gotData);

// function gotData(data){
   
//     for (var i = 0; i < data.features; i++) {
//         fill(255, 0, 0);
//         ellipse(random(width), random(height), 16, 16);
//     }
//     console.log(data.features[i]);
// }


// Sort Table Function using Lodash
// function sortTable(origTable, columnName){
//     // Returns a copy of a Table object whose rows are ordered according to values in the specified column
//     // 
//     // By default the rows in the table will be sorted in ascending order. If you pass a 
//     // column name with a '-' at the start of it, the rows will be sorted in descending order.
//     // 
//     const key = _.trim(columnName,'-'),
//           table = _.extend(new p5.Table(), {columns:origTable.columns}),
//           columnVal = ({obj}) => _.isNaN(_.toNumber(obj[key])) ? obj[key] : _.toNumber(obj[key]),
//           cloneRow = ({obj, arr}) => _.extend(new p5.TableRow(), {obj, arr, table}),
//           sorted = _.sortBy(origTable.rows, columnVal).map(cloneRow),
//           rows = _.startsWith(columnName, '-') ? _.reverse(sorted) : sorted;
  
//     return _.extend(table, {rows})
//   }


// Custom Control
// let info = L.control();

// info.onAdd = function(globe) {
//     this.div = L.DomUtil.create('div', 'info'); // create a div with class "info"
//     this.update();
//     return this._div;
// };
          
// info.update = function (props) {
//     this._div.innerHTML = '<h4>Earthquake Magnitude</h4>' +  (props ?
//         '<b>' + props.name + '</b><br />' + props.mag + ' per event'
//         : 'Hover over a circle');
// };

// info.addTo(globe); 

// function highlightFeature(e) {
    
//     info.update(layer.feature.properties);
// }

// function resetHighlight(e) {

//     info.update();


// textSize(12);
// fill(255);
// text(`Plotting ${table.getRowCount()} seismic events`, 20, 40);
// text(`Largest Magnitude: ${columnMax(table, "mag")}`, 20, 60);
// text(`Greatest Depth: ${columnMax(table, "depth")}`, 20, 80);

// function volcDataPoints() {
//     strokeWeight(2);
//     stroke(255,0,0);
//     // cycle through array
//     for (var i = 0; i < volcanicActivity.length; i++) {
//         var volcLon = volcanicActivity.features[0].properties.LON;
//         var volcLat = volcanicActivity.features[0].properties.LAT;
        

//     var create_element = createElement('h1', volcanicActivity.features[0]);
//     create_element.position(300, 3000);
//     var location = volcanicActivity.features[0].geometry;
//     for (var j = 0; j < location.length; j++) {
//         console.log(location[j]);
//     } 


//     for(var i=0; i<times.length; i++){
//       //map the x position to the time
//       var dayTime = moment(times[i])
//       var x = map(dayTime,timeMin, timeMax, x_left, x_right);
    
//       // map the y position to magnitude
//       var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
//       point(x,y);
//     }
//   }
// }
//     console.log(volcLon);
//     console.log(volcLat);



// Empty GeoJSON layer which can have more features added to it later.
// var myLayer = L.geoJSON().addTo(map);
// myLayer.addData(geojsonFeature);


// Sample of creating Points on the map related to bicycleRental and campus data (sample-geojson.js)
// L.geoJSON([bicycleRental, campus], {

// 	style: function (feature) {
// 		return feature.properties && feature.properties.style;
// 	},

// 	onEachFeature: onEachFeature,

// 	pointToLayer: function (feature, latlng) {
// 		return L.circleMarker(latlng, {
// 			radius: 2,
// 			fillColor: "#00ffff",
// 			color: "#00ffff",
// 			weight: 0.1,
// 			opacity: 0.3,
// 			fillOpacity: 0.3,
// 		});
// 	}
// }).addTo(globe);


// Sample of creating Points on the map related to freeBus data (sample-geojson.js)
// L.geoJSON(freeBus, {

// 	filter: function (feature, layer) {
// 		if (feature.properties) {
// 			// If the property "underConstruction" exists and is true, return false (don't render features under construction)
// 			return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
// 		}
// 		return false;
// 	},
// 	onEachFeature: onEachFeature
// }).addTo(globe);

// // Sample of creating Points on the map related to coorsField data (sample-geojson.js)
// let coorsLayer = L.geoJSON(coorsField, {
// 	pointToLayer: function (feature, latlng) {
// 		return L.marker(latlng);
// 	},
// 	onEachFeature: onEachFeature
// }).addTo(globe);


  // sample to find the coordinates on the map by clicking anywhere
    // let popup = L.popup();
    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(globe);
    // }
    // globe.on('click', onMapClick);



