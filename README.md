# cps-refactor-scripts

ClearPoint Refactor Scripts

### Setup

`$> npm install` Installs development tools and supporting libraries.

### Running

`$> node .` Runs the application. This will list required parameters.

### Testing

Test TBD

### Usage

Install into app where script will be used:

`$> npm install "https://github.com/ClearPoint-Strategy/cps-refactor-scripts"`

Create an npm script inside package.json and save.

```
"scripts": {
   "refactor": "cps-refactor -s barrel -b src/hooks/index.js -i hooks/index.js -p src -e .js -c 10 -d",
```
Call script from terminal

`$> npm run refactor`
