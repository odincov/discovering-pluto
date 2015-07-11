# The History of The Discovery of Pluto

[**History of The Discovery of Pluto**](http://discoveringpluto.com) is a timeline that tells a story of the discovery of the dwarf planet Pluto. This project is created by [**BigUniverse.Ru**](http://biguniverse.ru) — an online magazine popularizing astronomy.

## Multilingual content

* English: [http://discoveringpluto.com](http://discoveringpluto.com)
* Russian: [http://biguniverse.ru/timeline/pluto](http://biguniverse.ru/timeline/pluto)

If you would like to add translation to another language you are welcome to do so! See [how to add new translation](#contribute-translation).

## Requirements

NodeJS, bower

## Installation

Run in your console `git clone git@github.com:odincov/discovering-pluto.git`.

To get started jump to the root directory of the project and run `npm install && bower install && npm run setup && npm run build` (just copy-paste it really) this will install all project dependencies and modules locally and setup and build the website.

### Development

Use `gulp go` to run a server which will watch for any changes in files and rebuild and reload everything for you in your browser. The url can be found in the console after your run the command.

### Build

To build website simply run `npm run build`.

## Contribute translation

To contribute translation follow these steps:

1. Fork this repository
2. Go to `src/data`
3. Copy existiong language directory and rename to the language you'd like to make traslation to e.g. `cp -r en/ de/`
4. Translate text in all files in that directory
5. Make a pull request

## Todo

* Better project description
* Add repository usage description
* Add an instruction for contributing to the project to README.md
