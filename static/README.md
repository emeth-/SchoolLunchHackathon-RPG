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


##### Thanks

A big shout-out and thanks to robobeau, who built the RPG engine used and released it under the MIT license [here](https://github.com/robobeau/JobInterviewStory)
