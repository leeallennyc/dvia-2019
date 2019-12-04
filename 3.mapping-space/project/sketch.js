

let table; // <-- all_month.csv data
let geoJSONDataDay; // <-- significant_day.geojson data from USGS 
let geoJSONDataWeek; // <-- significant_week.geojson data from USGS 
let geoJSONDataMonth; // <-- significant_month.geojson data from USGS 
let geoJSONDataMonthAll; // <-- all_month.geojson data from USGS 
let mymap; // <--  Leaflet.JS Map


function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("../data/all_month.csv", "csv", "header");
    //load the geoJSON data for Plate Boundaries
    geoJSONPlateBoundaries = loadJSON("PB2002_boundaries.json");
      //load significant_day.geojson Quake file into geoJSONData variable
    geoJSONDataDay = loadJSON('../data/significant_day.geojson');
      //load significant_week.geojson Quake file into geoJSONData variable
    geoJSONDataWeek = loadJSON('../data/significant_week.geojson');
    //load significant_month.geojson Quake file into geoJSONData variable
    geoJSONDataMonth = loadJSON('../data/significant_month.geojson');
    //load all_month.geojson Quake file into geoJSONData variable
    geoJSONDataMonthAll = loadJSON('../data/all_month.geojson');
}


function setup() {

    // Create Title Div
    let title = createDiv("The Ring of Fire");
    title.parent('title');

    // Setup canvas1 and Place in "canvas1" div
    let canvas1 = createCanvas(displayWidth, 2000);
    canvas1.parent('container1');
   
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap();

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();
    addPlateBoundaries();

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

//     let container3 = function(a) {
//         a.x = 400;
//         a.y = 600;
//         a.setup = function() {
//             a.createCanvas(a.x, a.y);
//             a.background(200);
//         }
//         a.draw = function() {
                    
//             a.fill(255, 0, 0, 50);
//             a.noStroke();
//             a.ellipse(a.x/2, a.y/2, 10, 10);
//             var myContainerDiv3 = createDiv('container3');
//             myContainerDiv3.parent('canvas1');
//         // a.x = a.x + a.random(-10, 10)
//         // a.y = a.y + a.random(-10, 10)
// }
//     }

     
    let newContainer1 = new p5(container1);
    let newContainer2 = new p5(container2);
    // let newContainer3= new p5(container3);


    // create a color scale we can use for assigning colors based on magnitude and volcanic activity
    var magScale = chroma.scale('YlOrRd').mode('lch').domain([0, 10]);
    var volcScale = chroma.scale('YlGnBu').mode('lch').domain([0, 10]);
  
    // convert the raw geoJSON feed we loaded from the USGS into a plain array of objects
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
      stroke(60);
      strokeWeight(2);
      line(20,0, 20+quake.depth/30, 0);
  
      // typeset the place name
      noStroke();
      fill(100);
      textSize(10);
      textStyle(ITALIC);
      text(quake.place, 45, 4);

      // use translate to change position before looping to draw the next quake
      var maxRows = 12;
      if ((i+1)%maxRows==0){
        // new column
        resetMatrix();
        translate(100 + 350*ceil(i/maxRows),100);
      }else{
        // move to next row
        translate(0, 32)
      }
    }
  }
  
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


function setupMap(){
    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // Declare and Set Map and Long/Lat View to Alaska/Pacific Ocean
    mymap = L.map('Esri_WorldGrayCanvas').setView([54.160507, 180.369141], 1.5);
    L.extend
    // console.log(mymap);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        zoomDelta: 0.25,
        zoomSnap: 0,
    }).addTo(mymap);

    // return color based on mag
    function getColorQuakes(d) {
        return d > 9.0  ? '#800026' :
            d > 7.5  ? '#BD0026' :
            d > 6.0  ? '#E31A1C' :
            d > 4.5  ? '#FC4E2A' :
            d > 3.0  ? '#FD8D3C' :
            d > 1.5  ? '#FEB24C' :
            d > 0.0  ? '#FED976' :
                        '#FFEDA0';
    };

    // return color based on volcanic activity * 
    function getColorVolcs(d) {
        return d > 9.0  ? '#253494' :
            d > 7.5  ? '#225ea8' :
            d > 6.0  ? '#1d91c0' :
            d > 4.5  ? '#41b6c4' :
            d > 3.0  ? '#7fcdbb' :
            d > 1.5  ? '#c7e9b4' :
            d > 0.0  ? '#edf8b1' :
                        '#ffffd9';
    };
    console.log(getColorQuakes());
    console.log(getColorVolcs());


    // Legend 1 (Top right/EarthQuake)
    let legend = L.control({position:  'topright'});
    legend.onAdd = function (mymap) {

        var  div =  L.DomUtil.create('div', 'info  legend'),
        scales =  [0, 1.5, 3, 4.5, 6, 7.5, 9],
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
    legend2.onAdd = function (mymap) {

        var  div =  L.DomUtil.create('div', 'info  legend2'),
        scales =  [0, 1.5, 3, 4.5, 6, 7.5, 9],
        labels =  [];

        for  (let i = 0; i<scales.length;  i++) {
            div.innerHTML +=
                '<i  style  = "background:' + getColorVolcs(scales[i] + 1) + '"></i> ' +
                scales[i] + (scales[i +1] ? '&ndash;' + scales[i + 1] + '<br' : '+');
        }
        return div;
    };

    // Add legend 1 and 2 to Map
    legend.addTo(mymap);
    legend2.addTo(mymap);


    // Setting up popupConent function for click event -- Needs refining
	function onEachFeature(feature, layer) {
		let popupContent = "<p> Location: " + "Mag:  " + "Time: "
				feature.geometry.type + "Location: " + "Mag:  " + "Time: </p>";

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent);
    };
    

    //  Set up Volcanic Activity from GeoJSON data *file harvard-glb-volc-geojson.js
    L.geoJSON(volcanicActivity, {
      
		style: function (feature) {
            return feature.properties && feature.properties.style;
            
        },
        onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
                radius: 1,
                stroke: false,
				fillColor: "#0DEC1D94",
				color: "#0DEC1D94",
				opacity: 0.4
			});
        }

    }).addTo(mymap);

  
    // sample to find the coordinates on the map by clicking anywhere
    let popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }
    mymap.on('click', onMapClick);
};


    // Here we add the Plate Boundary JSON data
    function addPlateBoundaries() {
    let boundaryStyle = {
        "weight": 0.75,
        "color": "#FDFBAC",
        "dashArray": 5,
        "dashOffset": 5,
        "opacity": 0.8
    };
    // Plate Boundaries are added to Map -- shown by yellow dashed lined
    L.geoJSON(geoJSONPlateBoundaries, {
        style: boundaryStyle
    })
    .addTo(mymap);
};

function addCircles(){
    // calculate minimum and maximum values for magnitude and depth
    let magnitudeMin = 0.0;
    let magnitudeMax = columnMax(table, "mag");
    console.log('magnitude range:', [magnitudeMin, magnitudeMax]);

    let depthMin = 0.0;
    let depthMax = columnMax(table, "depth");
    console.log('depth range:', [depthMin, depthMax]);

    // step through the rows of the table and add a dot for each event
    for (let i=0; i<table.getRowCount(); i++){
        let row = table.getRow(i);

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue;
        }
        let lat = row.getNum('latitude')
        let lon = row.getNum('longitude')
        if (lon < 0) {
            lon += 360;
        }
        // printLatAndLon(lat, lon);
        // create a new dot
        let circle = L.circle([lat, lon], {
            color: 'red',
            stroke: false,    // the dot stroke color
            fillColor: '#f03', // the dot fill color
            fillOpacity: 0.2,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 200,
        });
        // place the new dot on the map
        circle.addTo(mymap);
    }
}

// removes any circles that have been added to the map
function removeAllCircles(){
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer);
        }
    });
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




// Async callback function for loading JSON

// loadJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",gotData);

// function gotData(data){
   
//     for (var i = 0; i < data.features; i++) {
//         fill(255, 0, 0);
//         ellipse(random(width), random(height), 16, 16);
//     }
//     console.log(data.features[i]);
// }



// Style function for features 
    // function style(feature) 
    //     return {
    //         fillColor: getColor(feature.properties.mag),
    //         weight: 2,
    //         opacity: 1,
    //         color: 'white',
    //         dashArray: '3',
    //         fillOpacity: 0.7
    //     };
    // }

    // L.geoJson(geoJSONData, {style: style}).addTo(mymap);





// Custom Control
// let info = L.control();

// info.onAdd = function(mymap) {
//     this.div = L.DomUtil.create('div', 'info'); // create a div with class "info"
//     this.update();
//     return this._div;
// };
          
// info.update = function (props) {
//     this._div.innerHTML = '<h4>Earthquake Magnitude</h4>' +  (props ?
//         '<b>' + props.name + '</b><br />' + props.mag + ' per event'
//         : 'Hover over a circle');
// };

// info.addTo(mymap); 

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


    // generate a Canvas instance
    // let canvasSketch2 = function(a) {
        
    //     a.x = a.windowWidth;
    //     a.y = 600;
    //     a.setup = function() {
    //         a.createCanvas(a.x, a.y);
    //         a.background(60);
    //     }
    //     // a.draw = function() {
    //     //     a.fill(255, 0, 0, 50);
    //     //     a.noStroke();
    //     //     a.ellipse(a.x/2, a.y/2, 5, 5);

    //     // a.x = a.x + a.random(-10, 10) 
    //     // a.y = a.y + a.random(-10, 10)

    //     function windowResized() {
    //         resizeCanvas(a.windowWidth, 600);
    //     }

    //     function volcDataPoints() {
    //         strokeWeight(2);
    //         stroke(255,0,0);
    //         // cycle through array
    //         for (var i = 0; i < volcanicActivity.length; i++) {
    //             var volcLon = volcanicActivity.features[0].properties.LON;
    //             var volcLat = volcanicActivity.features[0].properties.LAT;
                

    //         var create_element = createElement('h1', volcanicActivity.features[0]);
    //         create_element.position(300, 3000);
    //         var location = volcanicActivity.features[0].geometry;
    //         for (var j = 0; j < location.length; j++) {
    //             console.log(location[j]);
    //         } 


    //         for(var i=0; i<times.length; i++){
    //           //map the x position to the time
    //           var dayTime = moment(times[i])
    //           var x = map(dayTime,timeMin, timeMax, x_left, x_right);
          
    //           // map the y position to magnitude
    //           var y = map(magnitudes[i],magnitudeMin, magnitudeMax, y_bot, y_top);
    //           point(x,y);
    //         }
    //       }

        
    //     }

           
    //         console.log(volcLon);
    //         console.log(volcLat);
    // }


    // Create Canvas 2 Instance
    // let canvasSketch3 = function(a) {
        
    //     a.x = a.windowWidth;
    //     a.y = 1800;
    //     a.setup = function() {
    //         a.createCanvas(a.x, a.y);
    //         a.background(200);
    //     }
    //     a.draw = function() {
    //         a.fill(255, 0, 0, 50);
    //         a.noStroke();
    //         a.ellipse(a.x/2, a.y/2, 5, 5);

    //     a.x = a.x + a.random(-10, 10)
    //     a.y = a.y + a.random(-10, 10)

    //     function windowResized() {
    //         resizeCanvas(a.windowWidth, 600);
    //     }
    //   }
    // }


    // Placed both canvas instances in variables and call constructor
    // let canvasTemplate1 = new p5(canvasSketch1);
    // let canvasTemplate2 = new p5(canvasSketch2);
    // let canvasTemplate3 = new p5(canvasSketch3);






    // // generate another p5 diagram that complements the map, communicating the earthquake data non-spatially
    // let canvasMiddle = createCanvas(windowWidth, 10);
    // canvasMiddle.parent("canvasMiddle");
    // canvasMiddle.position(0 ,500);
    // background('red');

    // function windowResized() {
    //     resizeCanvas(windowWidth, 500);
    // }

    
    // Empty GeoJSON layer which can have more features added to it later.
    // var myLayer = L.geoJSON().addTo(map);
    // myLayer.addData(geojsonFeature);


    // feature.geometry.coordinates[0] = feature.geometry.coordinates[0] + 180

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
    // }).addTo(mymap);

    
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
	// }).addTo(mymap);

    // // Sample of creating Points on the map related to coorsField data (sample-geojson.js)
	// let coorsLayer = L.geoJSON(coorsField, {
	// 	pointToLayer: function (feature, latlng) {
	// 		return L.marker(latlng);
	// 	},
	// 	onEachFeature: onEachFeature
    // }).addTo(mymap);



    
    
    // Extend plateboundaries beyond anti-meridian

     // for(let i = 0; i < geoJSONPlateBoundaries.features.length; i++) {
    //     let feature = geoJSONPlateBoundaries.features[i]
    //     let coordArr = feature.geometry.coordinates
    //     for (let z = 0; z < coordArr.length; z++) {
    //         let currCoords = coordArr[z]
    //         console.log(currCoords)
    //         let lon = currCoords[1]
    //         if (lon < 0) {
    //             console.log('hello it is less than')
    //             currCoords[1] = currCoords[1] + 360
    //         }
    //     }

    // }
    


    // Extend plateboundaries beyond anti-meridian line

           // coordsToLatLng: function (coords) {
        //     let longitude = coords[0];
        //     console.log('coords', coords)
        //     let latitude = coords[1];
      
        //     var latlng = L.latLng(coords[1], coords[0]);
      
        //     if (coords[0] < 0) {
        //       coords[0] += 360
        //     }
        //     return coords
        //     else
        //       return latlng.wrap();
        // },


// function printLatAndLon(lat, lon) {
    
// }
// function convertMetric(num) {

// }




