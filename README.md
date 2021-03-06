# Typos [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Calculate typos count on text writing.

```
npm i typos --save
```

### How to use?

- `text` - text to work with

```js
const typos = require('typos');
const text = 'hello world';
const type = typos(text);

type.on('add', ({symbol, cursor}) => {
    console.log(`added ${symbol} number ${cursor}`);
});

type.on('error', (error) => {
    const {
        message,
        current,
        symbol,
        count,
    } = error;
    
    console.error(`${message}`);
    console.error(`Errors count: ${count}`);
    console.error(`Expected ${current}`);
    console.error(`Received ${symbol}`);
});

type.on('end', (result) => {
    const {
        length,
        errorsCount,
    } = result;
    
    console.log(`text length: ${length}`);
    console.log(`errors count : ${errorsCount}`);
});

const add = type.add.bind(type);

text.split('')
    .forEach(add);
```

## Usage in Browser

Add script tag to use minified version of `typos`.

```html
<script src="node_modules/typos/dist/typos.min.js></script>
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/typos.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/typos/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/typos.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/typos "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/typos  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/typos "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/typos?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/typos/badge.svg?branch=master&service=github

