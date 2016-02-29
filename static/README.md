## Frontend Dependencies

You will need:

* [Ruby](https://www.ruby-lang.org/en) (1.9.3 or above)
* [Node.js](http://nodejs.org) (0.10.25 or above)
* [Compass](http://compass-style.org) (0.12.0 or above)

Grunt and its dependencies will be installed via **npm install**, but here they are, anyway:

* [Grunt](http://gruntjs.com) (0.4.5 or above)
* [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass) (0.8.0 or above)
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) (0.4.0 or above)
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) (0.8.0 or above) 
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) (0.5.0 or above)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) (0.6.1 or above)

## Setup

After checking out the project, CD into this frontend folder and run **npm install** to install all the project dependencies:

```
cd static/
npm install
```

Run Grunt in order to compile the newly installed third party vendor scripts, and to serve the game:

```
grunt
```

To edit the map, you will need to download [Tiled](http://www.mapeditor.org/). Open the file /static/images/a000.tmx in Tiled. Make your changes, then save it to the same file. Then, to get it appear in game, export is as json (via Tiled) to the file /static/pub/json/a000.json.


##### Thanks

A big shout-out and thanks to robobeau, whose [RPG Engine library](https://github.com/robobeau/JobInterviewStory) (also released under the MIT License) was used in this project.
