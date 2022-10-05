<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/D99-1/Xtra-Express-Documatic-Hackathon">
    <img src="/images/Xtra-express-logo.png" alt="Logo" width="240" height="80">
  </a>

  <h3 align="center">Xtra-Express</h3>
<p align="center">
   <h4>A NPM Utility Package For Express</h4>
   <h4>Created For The Documatic Hackathon</h4>
    <br />
    <a href="https://github.com/d99-1/xtra-express-documatic-hackathon"><strong>Repository»</strong></a>
    <br />
    <br />
    <a href="https://expressjs.com/">Express</a>
    ·
    <a href="https://github.com/d99-1/xtra-express-documatic-hackathon/issues">Report Bug</a>
    ·
    <a href="https://www.documatic.com/">Documatic</a>
  </p>



[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

## About The Project

Express is a popular Node.js package useful for many simple tasks that require hosting files online such as a simple website or a api, and Xtra-Express is for the sole purpose of making this package even easier by simplifying tasks that would take hundreds of lines of code if done manually. It will save you time and effort, and will hopefully enhance your website, api or whatever you wish to build.


### Prerequisites

NPM is required to run this project

If you do not already have npm you can install it from https://nodejs.org/en/download/ 
  ```sh
  npm install -g npm
  ```

## Installation
### Single Step Project Setup

Mac/Linux:
```sh
git clone https://github.com/d99-1/xtra-express-documatic-hackathon && cd xtra-express-documatic-hackathon && npm install && cd .. && mkdir myProject && cd myProject && npm init -y && touch index.js 
```
Windows:
```sh
 git clone https://github.com/d99-1/xtra-express-documatic-hackathon && cd xtra-express-documatic-hackathon && npm install && cd .. && mkdir myProject && cd myProject && npm init -y && type NUL >> index.js
 ```
### Existing Project Setup
> Begin running these commands from inside your project folder

Go inside the main folder
```sh
cd ..
```
Clone the repository
```sh 
 git clone https://github.com/d99-1/xtra-express-documatic-hackathon
```
Go inside the newly downloaded folder
```sh
cd xtra-express-documatic-hackathon
```
Install required dependencies
```sh
npm install
```
Go back into the main folder
```sh 
cd ..
```

## Usage

```js
const {express} = require('../xtra-express-documatic-hackathon/index')  // Import xtra-express's index.js from the dowloaded files
const app = express();                                                  // create app

app.set('view engine','ejs')                                            // Set ejs to view engine
app.use(express.static('xtra-express'))                                 // This is necessary if you want the views chart page

express.init(['index-ejs'])                                             // Initializes all your files

                                                                        // Make sure to replace `.` with `-` in all 
                                                                        // file names you provide to the package
                                           
app.get('/', async (req, res) => {          
    express.viewsUpdate('index-ejs')                                    // Tells the package that a new view has occured
    res.render('index');                                                // Render your content inside the `views` folder as normal
 });

 app.get('/views', async (req,res) => {
    res.render('xtra-express/index-ejs')                                // Render the views chart for the specified file on that path
 })

 app.listen(5001);
```
> Not all functions have been utilised in the simple demo above and futher functions can be seen in the section below

## Functions
```js
express.init(['file-name']) 
```
Initializes all files given in the array for view tracking and the views chart. Processes can also be done individually through the functions below.
```js
express.viewsInit('file-name')
```
Initializes the view tracking and creates all necessary files
```js
express.chartInit('file-name')
```
Initalizes the views chart and creates all necessary files. This will create a file at `./views/xtra-express/file-name.ejs`, edit this file as per the needs of your site. The chart can be displayed on any route by using `res.render('xtra-express/file-name')`.
> To make sure no content gets cut out, only the last 30 days of recorded data will be shown in the chart
```js
express.viewsUpdate('file-name')
```
Should be placed on the route where you would like to track views. It will be called on every visit, updating the view count each time.
> :warning: **If you are using nodemon**: Nodemon will restart your site on every visit due to the changing of a `.json` file. To avoid this place the following code in your `package.json`
> ```js
>  "nodemonConfig": {
>   "ignore": ["xtra-express/*/*.json"]
>  },
> ```
```js
express.views('file-name')
```
Run at any time to get the current number of views printed in the console. This can also be stored in a variable where it will simply return the number of views 
```js
express.serverUptime()
```
Returns the server uptime in the format `days:hours:minutes:seconds`. Recommended to put this in either a `console.log()` or variable.

## Demonstration
  <a href="https://github.com/D99-1/Xtra-Express-Documatic-Hackathon">
    <img src="/images/chartIMG.png" >
  </a>
Above is a example of what a chart page would look like. It is an interactive file and the exact value of the date can be viewed by hovering over the point. The chart also acts effeciently by only displaying every second date on the bottom to ensure no text gets cut out, however if needed, the exact date can be seen by hovering over a point.

###

> 📊 This feature is made possible by the <a href="https://developers.google.com/chart">Google Charts Api</a> 


## Contributing
Contributing will help keep this project alive and is greatly appreaciated. If you would like to contribute please follow the steps below.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




## License

Distributed under the MIT License. See <a href="https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/blob/main/LICENSE.md">`LICENSE.md`</a> for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



[contributors-shield]: https://img.shields.io/github/contributors/D99-1/Xtra-Express-Documatic-Hackathon.svg?style=for-the-badge
[contributors-url]: https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/D99-1/Xtra-Express-Documatic-Hackathon.svg?style=for-the-badge
[forks-url]: https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/network/members
[stars-shield]: https://img.shields.io/github/stars/D99-1/Xtra-Express-Documatic-Hackathon.svg?style=for-the-badge
[stars-url]: https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/stargazers
[issues-shield]: https://img.shields.io/github/issues/D99-1/Xtra-Express-Documatic-Hackathon.svg?style=for-the-badge
[issues-url]: https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/issues
[license-shield]: https://img.shields.io/github/license/D99-1/Xtra-Express-Documatic-Hackathon.svg?style=for-the-badge
[license-url]: https://github.com/D99-1/Xtra-Express-Documatic-Hackathon/blob/main/LICENSE.md

