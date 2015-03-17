The Discovery of the Pluto website
==================================

**The Discovery of the Pluto** is a project of the **Big Universe**, popular-science web-magazine of astronomy.

Build
-----

To build the project run this command in console:

```
npm install && bower install && npm run setup && npm run build
```

Development
---


Deploy
---
Setup ./ftp-config.js file using this as a template:

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
