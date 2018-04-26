# Static Boilerplate 🍳
### Compiling architecture to build & deliver static readable web pages
---

## Development 👨‍💻  /‍ 👩‍💻
Architecture is based on a build system which rely on Gulp & Bower, so you'll need both of them

#### Gulp 🥤
Install Gulp
```
npm install -g gulp
```

#### Bower 🐤
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

#### Dependencies 🔗
Then run a good'ol:
```
npm i
```
This should get you all the dependencies running this app.

#### Architecture 📐

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

### Build 🛠️

#### All
Run all gulp task once
```
gulp
```

#### Watch 🔍
Keep an eye on saved file of interest and run related task
```
gulp watch
```

#### Task
Run standalone task
```
gulp task_name
```

## Server 🖥️

### light-server
During development you might need to be able to view your website
from other devices. So for that you'll need a local running light http server.
You're free to use whatever tool you want for that, but here's a really easy one.

[light-server](https://github.com/txchen/light-server)

#### Install
```
npm i -g light-server
```

#### Run http server
*-p* is customisable if you prefer 1337 🤓
```
light-server -s . -p 8000
```

---

## Delivery 📦
Development files are compiled according to the following architecture

#### Architecture 📐
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
