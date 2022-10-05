const express = require('express');
const app = express()
let fs = require('fs')
let uptime = 0


// Create views.json file
express.viewsInit =  function(fileName){
  uptime = Date.now()
    fs.mkdir('./xtra-express', (error) => {
        if(error){
        // `./xtra-express` exists
        } else {
          console.log('./xtra-express created')
        }
      })
      
      fs.mkdir('./xtra-express/'+fileName, (error) => {
        if(error){
         // `./xtra-express/${fileName}` exists
        } else {
          console.log(`./xtra-express/${fileName} created`)
        }
      })
      const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
      a = today.toLocaleDateString()
      data = {
        "count":{"views":0},
        "time":{[a]:0}
      }
     let output = JSON.stringify(data)
     try{
      fs.writeFileSync(`./xtra-express/${fileName}/views.json`, output, { flag: 'wx' }, function (err) {
        if (err) {}//`./xtra-express/${fileName}/views.json` exists
        else console.log(`./xtra-express/${fileName}/views.json created`);
    });
} catch{
}
}

// Updates the view count in views.json
express.viewsUpdate = function(fileName){
    try{
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const jsonString = fs.readFileSync(`./xtra-express/${fileName}/views.json`, 'utf-8')
        const data = JSON.parse(jsonString)
        data.count.views = data.count.views + 1
        currentDate = today.toLocaleDateString()
        if(`${currentDate}` in data.time){
           data.time[`${currentDate}`] = data.time[`${currentDate}`] + 1    
        } else{
           let toAssign = {
            [currentDate]:1
        }
           Object.assign(data.time,toAssign)
        }
                let output = JSON.stringify(data)

        
        fs.writeFileSync(`./xtra-express/${fileName}/views.json`,output,err =>{
        })
    } catch (err){
        console.log("initialization Complete => Visits from this point onwards will be counted")
    } 
}

// Load and displays views from the views.json file
express.views = function(fileName){
    try{
        const jsonString = fs.readFileSync(`./xtra-express/${fileName}/views.json`, 'utf-8')
        const data = JSON.parse(jsonString)
        x = data.count.views
        console.log("Current Views => ",x)
        return x

    } catch (err){
        console.log("Current Views => Error => Double check the information you have provided to make sure it is correct")
    }
}
 

// Creates a new ejs file for the chart
express.chartInit = function(fileName){
  uptime = Date.now()

    try{
        const jsonString = fs.readFileSync(`./xtra-express/${fileName}/views.json`, 'utf-8')
        const data = JSON.parse(jsonString)

        fs.mkdir('./views', (error) => {
            if(error){
            // './views' exists
            } else {
              console.log('./views created')
            }
          })
        fs.mkdir('./views/xtra-express', (error) => {
            if(error){
             // `./views/xtra-express` exists
            } else {
              console.log(`./views/xtra-express created`)
            }
          })
          let jsonLocation = `/${fileName}/views.json`
          //let toWrite = ""
         let toWrite = `<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta http-equiv="X-UA-Compatible" content="IE=edge">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"> </script>
             <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
             <title>${fileName} Views</title>
         </head>
         <body>
         <style>
          #chart_div{
            height: 1000px
          }
         </style>
          <div id="chart_div"></div>
             <script>
                let fullKeys
                let fullVals
                let keys
                let vals



                 $.getJSON('${jsonLocation}', function(data) {
                     console.log(data)
                      fullKeys = Object.keys(data.time) // => ['a','b','c']
                      fullVals = Object.values(data.time) // => [1,2,3]
                      keys = fullKeys.slice(-30)
                      vals = fullVals.slice(-30)
                        console.log(keys.toString())
                        const keysWrappedInQuotes = keys.map(key => "'"+key+"'");
                        const finalKeys = keysWrappedInQuotes.join(',')
                        google.charts.load('current', {packages: ['corechart', 'line']});
                        google.charts.setOnLoadCallback(drawBasic);
                        function drawBasic() {
                        
                          var data = new google.visualization.DataTable();
                          data.addColumn('string', 'Date');
                          data.addColumn('number', 'Views');
                        
                          for(i = 0; i < keys.length; i++)
                            data.addRow([keys[i], vals[i]]);
                        
                          new google.visualization.LineChart(document.getElementById('chart_div')).
                            draw(data, {legend:"none"});
                        }
                      
                 })
             </script>
         </body>
         </html>` 
        fs.writeFile(`./views/xtra-express/${fileName}.ejs`, toWrite, { flag: 'wx' }, function (err) {
            if (err) {}
            else console.log(`./views/xtra-express/${fileName}.ejs created`);
        });
        

    } catch (err){
       // console.log(err)
        console.log(`Current Views => Error => If you did not previously have a ${fileName}.ejs file or you made changes in views.jons then this may be a initialization error => It should work corrently when you next run the code`)
    }
} 
// Gets the server uptime in DD:HH:MM:SS
express.serverUptime = function(){
nowTime = Date.now()
finalTime = nowTime - uptime
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

  let seconds = Math.floor(finalTime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours /24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;



return `${padTo2Digits(days)}:${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}
// Initializes the view tracking and chart file for all provided filenames
express.init = function(files = []) {
  uptime = Date.now()
  for(var i = 0; i < files.length;i++){
    express.viewsInit(files[i])
    express.chartInit(files[i])
  }
}

module.exports = {express}
