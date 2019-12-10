

// Preload the CSV file from the Data Folder
function preload(){
    // allCountriesCleaned = loadTable('data/Allcountries_cleaned.csv', 'csv', 'header');
    allCountriesCleanedISO = loadTable('data/All_Countries_Cleaned_ISO.csv', 'csv', 'header');
    }

    // let loopBeat;
    // let bassSynth;
    // let chooseNoise;
    // let setVolume;
    // let toggleOnOff;

// Setup Canvas and Background
function setup(){
    let start = moment().valueOf();
    let cnv = createCanvas(27000, 1300);
    cnv.position(200, 200);

    background(0);

    // bassSynth = new Tone.MembraneSynth().toMaster();
    // loopBeat = new Tone.Loop(song, '4n');
    // Tone.Transport.start();
    // loopBeat.start(0);
    

    // //Create Toggle On/Off Button
    // toggleOnOff = createButton('play');

    // toggleOnOff.position(50, 150).style('font-family', 'courier');
    // toggleOnOff.mousePressed(function(){
    //     if (testSound1.started){
    //         testSound1.stop();
    //         toggleOnOff.html('play');
    //     } else {
    //         testSound1.start();
    //         toggleOnOff.html('stop');
    //     }
    // });

    //// Sound object
    // testSound1 = new p5.Noise();
    // testSound1.amp(0);

    // chooseNoise = createSelect();
    // chooseNoise.position(50, 275);
    // chooseNoise.option('brown');
    // chooseNoise.option('pink');
    // chooseNoise.option('white');
    // chooseNoise.changed(() => {testSound1.setType(chooseNoise.value());
    // });

    
    // setVolume = createSlider(0, .1, 0, 0);
    // setVolume.position(50, 225);
    // setVolume.input(() => {testSound1.amp(setVolume.value(), 0.01);
    // });



    // Setting dataTable1 to All Countries Cleaned csv.   
    // let dataTable1  = allCountriesCleaned;
    let dataTable2 = allCountriesCleanedISO;

    let daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    // Starting point for x and y Axis
    let x = 200;
    let y = 0;

    // Title 
    let title = "Nulcear Fingerprints";
    textAlign(CENTER);
    textSize(40);
    fill(255);
    text(title, 385, 130);
    
    // Set Increment/Rowheight/Rectangle X and Y size
    let increment = 20;
    let rowHeight = 15;
    let colWidth = 2;
    let labelsColWidth = 100;
    let labelsRowHeight = 100;
    let rectDimX = 2;
    let rectDimY = 15;
    let latestIndex = 0;
    let countryGap = 40;
    let count = 0;

    let countries = ["USA", "RUSSIA", "UNITED KINGDOM", "FRANCE", "CHINA"];
    
    // Set years as Array
    let years = ["1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956",
    "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972",
    "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988",
    "1989", "1990", "1991", "1992","1993", "1994", "1995", "1996", "1997","1998", "1999", "2000", "2001", "2002", "2003", "2004",  
    "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

    let decades = ["1945", "1955", "1965", "1975", "1985", "1995", "2005", "2015"];

    // Starting Date
    let date = moment('1945-01-01', 'YYYY-MM-DD');
    
    // Create outer For loop to go through every day from 1945-2017
    for (let t = 0; t < (years.length) * 365; t++) {
        
        if (t === 0) {
            date = date;
        } else {
            date = moment(date.add(1, 'days').format('YYYY-MM-DD')); // <--- Setting Date variable to Increment by one day
        }

        moment('1995-12-25', 'YYYY-MM-DD');
        console.log('Date is: ', date);

        // Setting Country/Day variables to False
        let usaMonday = false;
        let usaTuesday = false;
        let usaWednesday = false;
        let usaThursday = false;
        let usaFriday = false;
        let usaSaturday = false;
        let usaSunday = false;

        let ussrMonday = false;
        let ussrTuesday = false;
        let ussrWednesday = false;
        let ussrThursday = false;
        let ussrFriday = false;
        let ussrSaturday = false;
        let ussrSunday = false;

        let ukMonday = false;
        let ukTuesday = false;
        let ukWednesday = false;
        let ukThursday = false;
        let ukFriday = false;
        let ukSaturday = false;
        let ukSunday = false;

        let franceMonday = false;
        let franceTuesday = false;
        let franceWednesday = false;
        let franceThursday = false;
        let franceFriday = false;
        let franceSaturday = false;
        let franceSunday = false;

        let chinaMonday = false;
        let chinaTuesday = false;
        let chinaWednesday = false;
        let chinaThursday = false;
        let chinaFriday = false;
        let chinaSaturday = false;
        let chinaSunday = false;

        

        // Looping through each day in getting Country, Day of Week, and Date data
        for (let rowIndex = latestIndex; rowIndex < dataTable2.getRowCount(); rowIndex++) {
            let country = dataTable2.getString(rowIndex, 0);
            let dayOfWeek = dataTable2.getString(rowIndex, 2);
            let rowDate = moment(dataTable2.getString(rowIndex, 10), 'YYYY-MM-DD');
            let rowAfterCurrent = !rowDate.isSameOrBefore(date);

            if (rowAfterCurrent) {
                break;
            }
            
            if (rowDate.isSame(date)) {
                latestIndex = rowIndex;
                if (country === 'usa') {
                    if (dayOfWeek === 'Monday') {
                        usaMonday = true;
                        continue;
                    } else if (dayOfWeek === 'Tuesday') {
                        usaTuesday = true;
                        continue;
                    } else if (dayOfWeek === 'Wednesday') {
                        usaWednesday = true;
                        continue;
                    } else if (dayOfWeek === 'Thursday') {
                        usaThursday = true;
                        continue;
                    } else if (dayOfWeek === 'Friday') {
                        usaFriday = true;
                        continue;
                    } else if (dayOfWeek === 'Saturday') {
                        usaSaturday = true;
                        continue;
                    } else if (dayOfWeek === 'Sunday') {
                        usaSunday = true;
                        continue;
                    } 
                } else if (country === 'ussr') {
                    if (dayOfWeek === 'Monday') {
                        ussrMonday = true;
                        continue;
                    } else if (dayOfWeek === 'Tuesday') {
                        ussrTuesday = true;
                        continue;
                    } else if (dayOfWeek === 'Wednesday') {
                        ussrWednesday = true;
                        continue;
                    } else if (dayOfWeek === 'Thursday') {
                        ussrThursday = true;
                        continue;
                    } else if (dayOfWeek === 'Friday') {
                        ussrFriday = true;
                        continue;
                    } else if (dayOfWeek === 'Saturday') {
                        ussrSaturday = true;
                        continue;
                    } else if (dayOfWeek === 'Sunday') {
                        ussrSunday = true;
                        continue;
                    }
                } else if (country === 'uk') {
                    if (dayOfWeek === 'Monday') {
                        ukMonday = true;
                        continue;
                    } else if (dayOfWeek === 'Tuesday') {
                        ukTuesday = true;
                        continue;
                    } else if (dayOfWeek === 'Wednesday') {
                        ukWednesday = true;
                        continue;
                    } else if (dayOfWeek === 'Thursday') {
                        ukThursday = true;
                        continue;
                    } else if (dayOfWeek === 'Friday') {
                        ukFriday = true;
                        continue;
                    } else if (dayOfWeek === 'Saturday') {
                        ukSaturday = true;
                        continue;
                    } else if (dayOfWeek === 'Sunday') {
                        ukSunday = true;
                        continue;
                    }
                } else if (country === 'fr') {
                    if (dayOfWeek === 'Monday') {
                        franceMonday = true;
                        continue;
                    } else if (dayOfWeek === 'Tuesday') {
                        franceTuesday = true;
                        continue;
                    } else if (dayOfWeek === 'Wednesday') {
                        franceWednesday = true;
                        continue;
                    } else if (dayOfWeek === 'Thursday') {
                        franceThursday = true;
                        continue;
                    } else if (dayOfWeek === 'Friday') {
                        franceFriday = true;
                        continue;
                    } else if (dayOfWeek === 'Saturday') {
                        franceSaturday = true;
                        continue;
                    } else if (dayOfWeek === 'Sunday') {
                        franceSunday = true;
                        continue;
                    }
                } else if (country === 'prc') {
                    if (dayOfWeek === 'Monday') {
                        chinaMonday = true;
                        continue;
                    } else if (dayOfWeek === 'Tuesday') {
                        chinaTuesday = true;
                        continue;
                    } else if (dayOfWeek === 'Wednesday') {
                        chinaWednesday = true;
                        continue;
                    } else if (dayOfWeek === 'Thursday') {
                        chinaThursday = true;
                        continue;
                    } else if (dayOfWeek === 'Friday') {
                        chinaFriday = true;
                        continue;
                    } else if (dayOfWeek === 'Saturday') {
                        chinaSaturday = true;
                        continue;
                    } else if (dayOfWeek === 'Sunday') {
                        chinaSunday = true;
                        continue;
                    }
                }
            }
        }        

        // for (let y = 0; y <= countries.length * daysOfWeek.length; y++){
        //     yOffset = 20(y);
        // }
        // console.log(yOffset);
            // Draw all USA Data

        if (usaMonday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 200 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 200 + increment, rectDimX, rectDimY);
        }
        if (usaTuesday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 220 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 220 + increment, rectDimX, rectDimY);
        }
        if (usaWednesday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 240+ increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 240 + increment, rectDimX, rectDimY);
        }
        if (usaThursday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 260 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 260 + increment, rectDimX, rectDimY);
        }
        if (usaFriday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 280+ increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 280 + increment, rectDimX, rectDimY);
        }
        if (usaSaturday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 300 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 300 + increment, rectDimX, rectDimY);
        }
        if (usaSunday) {
            strokeWeight(1);
            stroke('blue');
            fill('blue');
            rect(x, 320 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 320 + increment, rectDimX, rectDimY);
        }

        // Draw all USSR Data
        if (ussrMonday) {
            strokeWeight(1);
            stroke('red');
            fill('red'); 
            rect(x, 360 + increment + countryGap, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 360 + increment + countryGap, rectDimX, rectDimY);
        }
        if (ussrTuesday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 380 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 380 + increment, rectDimX, rectDimY);
        }
        if (ussrWednesday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 400 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 400 + increment, rectDimX, rectDimY);
        }
        if (ussrThursday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 420 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 420 + increment, rectDimX, rectDimY);
        }
        if (ussrFriday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 440 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 440 + increment, rectDimX, rectDimY);
        }
        if (ussrSaturday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 460 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 460 + increment, rectDimX, rectDimY);
        }      
        if (ussrSunday) {
            strokeWeight(1);
            stroke('red');
            fill('red');
            rect(x, 480 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 480 + increment, rectDimX, rectDimY);
        }

        // Draw all UK Data
        if (ukMonday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x, 520 + increment + countryGap, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 520 + increment + countryGap, rectDimX, rectDimY);
        }
        if (ukTuesday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x, 540 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 540 + increment, rectDimX, rectDimY);
        }
        if (ukWednesday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x,  560 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  560 + increment, rectDimX, rectDimY);
        }
        if (ukThursday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x, 580 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x, 580 + increment, rectDimX, rectDimY);
        }
        if (ukFriday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x, 600 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  600 + increment, rectDimX, rectDimY);
        }
        if (ukSaturday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x,  620 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  620 + increment, rectDimX, rectDimY);
        }
        if (ukSunday) {
            strokeWeight(1);
            stroke('green');
            fill('green');
            rect(x,  640 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  640 + increment, rectDimX, rectDimY);
        }            

        // Draw all FRANCE Data
        if (franceMonday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  680 + increment + countryGap, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  680 + increment + countryGap, rectDimX, rectDimY);
        }
        if (franceTuesday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  700 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  700 + increment, rectDimX, rectDimY);
        }
        if (franceWednesday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  720 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  720 + increment, rectDimX, rectDimY);
        }
        if (franceThursday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  740 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  740 + increment, rectDimX, rectDimY);
        }
        if (franceFriday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  760 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  760 + increment, rectDimX, rectDimY);
        }
        if (franceSaturday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x, 780 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  780 + increment, rectDimX, rectDimY);
        }
        if (franceSunday) {
            strokeWeight(1);
            stroke('orange');
            fill('orange');
            rect(x,  800 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  800 + increment, rectDimX, rectDimY);
        }    


        // Draw all CHINA Data
        if (chinaMonday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  840 + increment + countryGap, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  840 + increment + countryGap, rectDimX, rectDimY);
        }
        if (chinaTuesday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  860 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  860 + increment, rectDimX, rectDimY);
        }
        if (chinaWednesday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  880 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  880 + increment, rectDimX, rectDimY);
        }
        if (chinaThursday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  900 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  900 + increment, rectDimX, rectDimY);
        }
        if (chinaFriday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  920 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  920 + increment, rectDimX, rectDimY);
        }
        if (chinaSaturday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  940 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  940 + increment, rectDimX, rectDimY);
        }
        if (franceSunday) {
            strokeWeight(1);
            stroke('purple');
            fill('purple');
            rect(x,  960 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(60);
            rect(x,  960 + increment, rectDimX, rectDimY);
        }  

        // Creating a break every ten years    
        if (t === 0 || t % 3650 == 0) {
            
                fill(255,0,0);
                rect(x, 1050 - rowHeight, 2, 45);
            
        } else if (t % 365 == 0) {
            
            fill(255,0,0);
            rect(x, 1050 - rowHeight, 2, 25);
        }
        // move over by 1 to the right and start loop over
        x += 1;
    };

    // Print out Decade Names
    for  (var j = 0; j < decades.length; j++) {
        textSize(16);
        textAlign(CENTER);
        fill(255);
        text(decades[j], (j*3650) + 200, 1100);
    }

    // Label countries
    for (var i = 0; i < countries.length+1; i++) {
        textSize(16);
        textAlign(RIGHT);
        fill(255);
        text(countries[i], 170, 275 + i*165);
    }

    // Line across Decades
    fill(255,0,0);
    stroke(255,0,0);
    line(200, 1035, 26850, 1035);

    // End of loop and duration
    let end = moment().valueOf();
    let duration = end - start;
    // console.log("Time took ", duration, " milliseconds");

    // function song(time) {
    //     // bassSynth.triggerAttackRelease('c3', '8n', time);
    //     console.log(time);
    
}



// Make 2DArray function

// function setup() {
//     createCanva(300, 300);
//     colors = make2Darray(cols, rows);
//     for(var i = 0; i < cols; i++){
//         for(var j = 0; j < rows; j++){
//             color[i][j] = random(255);
//         }
//     }
// }