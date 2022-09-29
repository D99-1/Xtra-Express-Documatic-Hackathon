const express = require('express');
const app = express()
let fs = require('fs')


express.viewsInit =  function(fileName){
    fs.mkdir('./xtra-express', (error) => {
        if(error){
        //  console.log('./xtra-express exists')
        } else {
          console.log('./xtra-express created')
        }
      })
      
      fs.mkdir('./xtra-express/'+fileName, (error) => {
        if(error){
         // console.log(`./xtra-express/${fileName} exists`)
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
        if (err) console.log(`./xtra-express/${fileName}/views.json exists`);
        else console.log(`./xtra-express/${fileName}/views.json created`);
    });
} catch{
    console.log('')
}
}

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
        //console.log(err)
        console.log("initialization Complete => Visits from this point onwards will be counted")
    } 
}

express.views = function(fileName){
    try{
        const jsonString = fs.readFileSync(`./xtra-express/${fileName}/views.json`, 'utf-8')
       // console.log("JSON:"+jsonString)
        const data = JSON.parse(jsonString)
        x = data.count.views
        console.log("Current Views => ",x)

    } catch (err){
        console.log(err)
        console.log("Current Views => Error => Double check the information you have provided to make sure it is correct")
    }
}
 

express.chartInit = function(fileName){
    try{
        const jsonString = fs.readFileSync(`./xtra-express/${fileName}/views.json`, 'utf-8')
        const data = JSON.parse(jsonString)

        fs.mkdir('./views', (error) => {
            if(error){
              //console.log('./views exists')
            } else {
              console.log('./views created')
            }
          })
        fs.mkdir('./views/xtra-express', (error) => {
            if(error){
             // console.log(`./views/xtra-express exists`)
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
             <title>${fileName} Views</title>
         </head>
         <body>
             <img id="image"/>
             <script>
                let keys
                let vals
                 $.getJSON('${jsonLocation}', function(data) {
                     console.log(data)
                      keys = Object.keys(data.time) // => ['a','b','c']
                      vals = Object.values(data.time) // => [1,2,3]
                        console.log(keys.toString())
                        const keysWrappedInQuotes = keys.map(key => "'"+key+"'");
                        const finalKeys = keysWrappedInQuotes.join(',')
                        link = "https://quickchart.io/chart?bkg=white&c={type:'line',data:{labels:["+finalKeys+"],datasets:[{label:'Views%20Over%20Time',data:["+vals+"]}]}}"
                        document.getElementById("image").src = link;
                      
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
        console.log(`Current Views => Error => If you did not previously have a ${fileName}.ejs file then this may be a initialization error => It should work corrently when you next run the code`)
    }
} 

express.init = function(files = []) {
  for(var i = 0; i < files.length;i++){
    express.viewsInit(files[i])
    express.chartInit(files[i])
  }
}

module.exports = {express}