

// Preload the CSV file from the Data Folder
function preload(){
    allCountriesCleaned = loadTable('data/Allcountries_cleaned.csv', 'csv', 'header');
    }

    // let loopBeat;
    // let bassSynth;
    // let chooseNoise;
    // let setVolume;
    // let toggleOnOff;

// Setup Canvas and Background
function setup(){
    let start = moment().valueOf();
    createCanvas(30000, 4000);
    background(255);

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
    let dataTable1  = allCountriesCleaned;

    // Starting point for x and y Axis
    let x = 200;
    let y = 0;

    // Set Increment/Rowheight/Rectangle X and Y size
    let increment = 40;
    let rowHeight = 40;
    let colWidth = 40;
    let rectDimX = 1;
    let rectDimY = 15;
    let latestIndex = 0;
    let count = 0;

    
    // Set years as Array
    let years = ["1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956",
    "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972",
    "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988",
    "1989", "1990", "1991", "1992","1993", "1994", "1995", "1996", "1997","1998", "1999", "2000", "2001", "2002", "2003", "2004",  
    "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];

    // Starting Date
    let date = moment('01/1/1945', 'MM/DD/YYYY');
    
    // Create outer For loop to go through every day from 1945-2017
    for (let t = 0; t < (years.length) * 365; t++) {
        
        if (t === 0) {
            date = date;
        } else {
            date = moment(date.add(1, 'days').format('MM/DD/YYYY')); // <--- Setting Date variable to Increment by one day
        }

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
        for (let rowIndex = latestIndex; rowIndex < dataTable1.getRowCount(); rowIndex++) {
            let country = dataTable1.getString(rowIndex, 0);
            let dayOfWeek = dataTable1.getString(rowIndex, 2);
            let rowDate = moment(dataTable1.getString(rowIndex, 6), 'MM/DD/YYYY');
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

            // Draw all USA Data
        if (usaMonday) {
            noStroke();
            fill('blue');
            rect(x, 0 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 0 + increment, rectDimX, rectDimY);
        }
        if (usaTuesday) {
            noStroke();
            fill('blue');
            rect(x, 40 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 40 + increment, rectDimX, rectDimY);
        }
        if (usaWednesday) {
            noStroke();
            fill('blue');
            rect(x, 80 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 80 + increment, rectDimX, rectDimY);
        }
        if (usaThursday) {
            noStroke();
            fill('blue');
            rect(x, 120 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 120 + increment, rectDimX, rectDimY);
        }
        if (usaFriday) {
            noStroke();
            fill('blue');
            rect(x, 160 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 160 + increment, rectDimX, rectDimY);
        }
        if (usaSaturday) {
            noStroke();
            fill('blue');
            rect(x, 200 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 200 + increment, rectDimX, rectDimY);
        }
        if (usaSunday) {
            noStroke();
            fill('blue');
            rect(x, 240 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 240 + increment, rectDimX, rectDimY);
        }

        // Draw all USSR Data
        if (ussrMonday) {
            noStroke();
            fill('red'); 
            rect(x, 340 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 340 + increment, rectDimX, rectDimY);
        }
        if (ussrTuesday) {
            noStroke();
            fill('red');
            rect(x, 380 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 380 + increment, rectDimX, rectDimY);
        }
        if (ussrWednesday) {
            noStroke();
            fill('red');
            rect(x, 420 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 420 + increment, rectDimX, rectDimY);
        }
        if (ussrThursday) {
            noStroke();
            fill('red');
            rect(x, 460 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 460 + increment, rectDimX, rectDimY);
        }
        if (ussrFriday) {
            noStroke();
            fill('red');
            rect(x, 500 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 500 + increment, rectDimX, rectDimY);
        }
        if (ussrSaturday) {
            noStroke();
            fill('red');
            rect(x, 540 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 540 + increment, rectDimX, rectDimY);
        }      
        if (ussrSunday) {
            noStroke();
            fill('red');
            rect(x, 580 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 580 + increment, rectDimX, rectDimY);
        }

        // Draw all UK Data
        if (ukMonday) {
            noStroke();
            fill('green');
            rect(x, 680 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 680 + increment, rectDimX, rectDimY);
        }
        if (ukTuesday) {
            noStroke();
            fill('green');
            rect(x, 720 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 720 + increment, rectDimX, rectDimY);
        }
        if (ukWednesday) {
            noStroke();
            fill('green');
            rect(x, 760 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 760 + increment, rectDimX, rectDimY);
        }
        if (ukThursday) {
            noStroke();
            fill('green');
            rect(x, 800 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 800 + increment, rectDimX, rectDimY);
        }
        if (ukFriday) {
            noStroke();
            fill('green');
            rect(x, 840 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 840 + increment, rectDimX, rectDimY);
        }
        if (ukSaturday) {
            noStroke();
            fill('green');
            rect(x, 880 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 880 + increment, rectDimX, rectDimY);
        }
        if (ukSunday) {
            noStroke();
            fill('green');
            rect(x, 920 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 920 + increment, rectDimX, rectDimY);
        }            

        // Draw all FRANCE Data
        if (franceMonday) {
            noStroke();
            fill('orange');
            rect(x, 1020 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1020 + increment, rectDimX, rectDimY);
        }
        if (franceTuesday) {
            noStroke();
            fill('orange');
            rect(x, 1060 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1060 + increment, rectDimX, rectDimY);
        }
        if (franceWednesday) {
            noStroke();
            fill('orange');
            rect(x, 1100 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1100 + increment, rectDimX, rectDimY);
        }
        if (franceThursday) {
            noStroke();
            fill('orange');
            rect(x, 1140 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1140 + increment, rectDimX, rectDimY);
        }
        if (franceFriday) {
            noStroke();
            fill('orange');
            rect(x, 1180 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1180 + increment, rectDimX, rectDimY);
        }
        if (franceSaturday) {
            noStroke();
            fill('orange');
            rect(x, 1220 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1220 + increment, rectDimX, rectDimY);
        }
        if (franceSunday) {
            noStroke();
            fill('orange');
            rect(x, 1260 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1260 + increment, rectDimX, rectDimY);
        }    


        // Draw all CHINA Data
        if (chinaMonday) {
            noStroke();
            fill('purple');
            rect(x, 1360 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1360 + increment, rectDimX, rectDimY);
        }
        if (chinaTuesday) {
            noStroke();
            fill('purple');
            rect(x, 1400 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1400 + increment, rectDimX, rectDimY);
        }
        if (chinaWednesday) {
            noStroke();
            fill('purple');
            rect(x, 1440 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1440 + increment, rectDimX, rectDimY);
        }
        if (chinaThursday) {
            noStroke();
            fill('purple');
            rect(x, 1480 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1480 + increment, rectDimX, rectDimY);
        }
        if (chinaFriday) {
            noStroke();
            fill('purple');
            rect(x, 1520 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1520 + increment, rectDimX, rectDimY);
        }
        if (chinaSaturday) {
            noStroke();
            fill('purple');
            rect(x, 1560 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1560 + increment, rectDimX, rectDimY);
        }
        if (franceSunday) {
            noStroke();
            fill('purple');
            rect(x, 1600 + increment, rectDimX, rectDimY);
        } else {
            noStroke();
            fill(250);
            rect(x, 1600 + increment, rectDimX, rectDimY);
        }  

        // Creating a break every ten years    
        if (t === 0 || t % 3650 == 0) {
            noStroke();
            fill(255,0,0);
            rect(x, 1800 - rowHeight, 1, 30);
        } else if (t % 365 == 0) {
            noStroke();
            fill(255,0,0);
            rect(x, 1800 - rowHeight, 1, 10);
        }
        // move over by 1 to the right and start loop over
        x += 1;
    }
    // End of loop and duration
    let end = moment().valueOf();
    let duration = end - start;
    // console.log("Time took ", duration, " milliseconds");

    // function song(time) {
    //     // bassSynth.triggerAttackRelease('c3', '8n', time);
    //     console.log(time);
}


