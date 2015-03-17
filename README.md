# History of The Discovery of Pluto website

**History of The Discovery of Pluto** [http://discoveringpluto.com](http://discoveringpluto.com) is an interactive project about the hisory of the Discovery of the dwarf planet Pluto, created by **BigUniverse.Ru** — an online magazine popularizing astronomy.

## Multilingual content

* English: [http://discoveringpluto.com](http://discoveringpluto.com)
* Russian: [http://biguniverse.ru/timeline/pluto](http://biguniverse.ru/timeline/pluto)

If you would like to add translation to another language you are welcome to do so! See [how to add new translation](#contribute-translation).

## Requirements

* Git
* gulp >= 3.8.10
* Bower >= 1.3.12

## Installation

* Source: [https://github.com/odincov/discovering-pluto.git](https://github.com/odincov/discovering-pluto.git)

To get started run `npm install && bower install && npm run setup && npm run build` (just copy paste it really) this will install Gulp and Bower locally and setup and build the website.

### Development

Use `gulp go` to run a server, which will watch for any changes in files and rebuild the website. This command will also run browser-sync, which will restart the website upon rebuild. Use url shown in the console to access the website in your browser.

### Build

To build the project simply run `npm run build`.

### Deploy

Setup `./ftp-config.js` file using this as a template:

```
module.exports = {
  en: {
    host: '',
    user: '',
    pass: '',
    remotePath: ''
  },
  ru: {
    host: '',
    user: '',
    pass: '',
    remotePath: ''
  }
}
```

Run `npm run upload` to upload files to your server. To push a specific language version use gulp task: `gulp upload --lang en`.

## Todo

* Add CHANGELOG.md
* Add an instruction for contributing to the project to README.md
* Add an instruction for private usage of the repository to README.md

## Contribute translation

To contribute translation follow these steps:

1. Fork this repository
2. Go to `src/data`
3. Copy existiong language directory and rename to the language you'd like to make traslation to e.g. `cp -r en/ de/`
4. Translate text in all files in that directory
5. Make a pull request
