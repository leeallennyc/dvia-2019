// the data loaded from a USGS-provided CSV file
let table;

// my leaflet.js map
let mymap;


function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("../data/all_month.csv", "csv", "header");
    geoJSONPlateBoundaries = loadJSON("PB2002_boundaries.json");
    console.log(geoJSONPlateBoundaries);
}


function setup() {
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap();

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();
    addPlateBoundaries();



    // generate a Canvas instance 
    let canvasSketch1 = function(a) {
        
        a.x = a.windowWidth;
        a.y = 500;
        a.setup = function() {
            a.createCanvas(a.x, a.y);
            a.background(0);
        }
        a.draw = function() {
            a.fill(255, 0, 0, 50);
            a.noStroke();
            a.ellipse(a.x/2, a.y/2, 5, 5);

        a.x = a.x + a.random(-10, 10);
        a.y = a.y + a.random(-10, 10)

        function windowResized() {
            resizeCanvas(a.windowWidth, 600);
        }
      }
    }


    // generate a another Canvas instance
    let canvasSketch2 = function(a) {
        
        a.x = a.windowWidth;
        a.y = 500;
        a.setup = function() {
            a.createCanvas(a.x, a.y);
            a.background(60);
        }
        a.draw = function() {
            a.fill(255, 0, 0, 50);
            a.noStroke();
            a.ellipse(a.x/2, a.y/2, 5, 5);

        a.x = a.x + a.random(-10, 10);
        a.y = a.y + a.random(-10, 10)

        function windowResized() {
            resizeCanvas(a.windowWidth, 600);
        }
      }
    }

    // Placed both canvas instances in variables and call constructor
    let canvasTemplate1 = new p5(canvasSketch1);
    let canvasTemplate2 = new p5(canvasSketch2);

    // Place text from map in banner below map
    fill(0);
    noStroke();
    textSize(6);
    text(`Plotting ${table.getRowCount()} seismic events`, 20, 40);
    text(`Largest Magnitude: ${columnMax(table, "mag")}`, 20, 60);
    text(`Greatest Depth: ${columnMax(table, "depth")}`, 20, 80);


    // // generate another p5 diagram that complements the map, communicating the earthquake data non-spatially
    // let canvasBottom = createCanvas(windowWidth, 500);
    // canvasBottom.parent("canvasBottom");
    // canvasBottom.position(0 ,1020);
    // background(160);

    // function windowResized() {
    //     resizeCanvas(windowWidth, 510);
    // }



function setupMap(){
    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // Declare and Set Map and Long/Lat View to Alaska/Pacific Ocean
    mymap = L.map('Esri_WorldGrayCanvas').setView([55.160507, -150.369141], 2.75);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
    }).addTo(mymap);


    // Sample of implementing external GeoJSON file (sample-geojson.js) -- Set to Colorado
	function onEachFeature(feature, layer) {
		let popupContent = "<p>I started out as a GeoJSON " +
				feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}
        layer.bindPopup(popupContent);
    };
    
    // Sample of creating Points on the map related to bicycleRental and campus data (sample-geojson.js)
	L.geoJSON([bicycleRental, campus], {

		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 5,
				fillColor: "#00ffff",
				color: "#00ffff",
				weight: 0.1,
				opacity: 0.5,
				fillOpacity: 0.5,
			});
		}
    }).addTo(mymap);

    
    // Sample of creating Points on the map related to freeBus data (sample-geojson.js)
	L.geoJSON(freeBus, {

		filter: function (feature, layer) {
			if (feature.properties) {
				// If the property "underConstruction" exists and is true, return false (don't render features under construction)
				return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
			}
			return false;
		},
		onEachFeature: onEachFeature
	}).addTo(mymap);

    // Sample of creating Points on the map related to coorsField data (sample-geojson.js)
	let coorsLayer = L.geoJSON(coorsField, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng);
		},
		onEachFeature: onEachFeature
    }).addTo(mymap);


    //  Set up Volcanic Activity from GeoJSON data *file harvard-glb-volc-geojson.js
    L.geoJSON(volcanicActivity, {

		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
                radius: 2,
                stroke: false,
				fillColor: "#0DEC1D94",
				color: "#0DEC1D94",
				weight: 0.2,
				opacity: 0.9,
				fillOpacity: 0.2
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


    // Here we add the Boundary Layers JSON data
    function addPlateBoundaries() {
    let boundaryStyle = {
        "color": "#FDFBAC",
        "weight": 0.5,
        "stroke": true,
        "opacity": 0.6
    };

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

        // create a new dot
        let circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'red',
            stroke: false,    // the dot stroke color
            fillColor: '#f03', // the dot fill color
            fillOpacity: 0.5,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 400
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
    })
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
}