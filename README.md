The Discovery of the Pluto website
==================================

**The Discovery of the Pluto** is a project of the **Big Universe**, popular-science web-magazine of astronomy.

Build
-----

To build the project run this command in console (just copy paste really):

```
npm install && bower install && npm run setup && npm run build
```

Development
---
This will run a server using browser-sync and will start watching 
files for changes to rebuild and restart website:
```
gulp go
```
Running this will result with a url in your console, 
use it to get access to the website.

Deploy
---
Setup ./ftp-config.js file using this template:

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
To upload files run this command in console:
```
npm run upload
```
Or you can use gulp task to push a specific language version only
```
gulp upload --lang en
```
