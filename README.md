# Static Boilerplate
### Compiling architecture to build & deliver static readable web pages
---

## Development
Architecture is based on a build system which rely on Gulp & Bower, so you'll need both of them

### Prerequisites

#### Gulp
Install Gulp
```
npm install -g gulp
```

#### Bower
Install Bower
```
npm install -g bower
```

When installing a new package don't forget to use *--save*
this way it'll be instantly added to the *bower.json*
then parsed from *gulpfile.js*
```
bower install --save package_name
```

#### Dependencies
Then run a good'ol:
```
npm i
```
This should get you all the dependencies running this app.

#### Architecture

```
|--assets
|  |-- fonts
|  |   |-- *.eot
|  |   |-- *.svg
|  |   |-- *.ttf
|  |   |-- *.woff
|  |   |-- *.woff2
|  |-- images
|  |   |-- *.png
|  |   |-- *.jpg
|  |   |-- *.svg
|--scripts
|  |-- *.js
|--styles
|  |-- components
|  |   |-- _*.scss
|  |-- pages
|  |   |-- _*.scss
|  _*.scss
|  _main.scss
*.html
```

---

## Delivery
Development files are compiled according to the following architecture

#### Architecture
```
|--public
|  |--assets
|  |  |-- fonts
|  |  |-- images
|  |--js
|  |  |-- main
|  |--styles
|  |  |-- main
*.html
```
