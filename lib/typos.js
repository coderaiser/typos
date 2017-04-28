'use strict';

const EventEmitter = require('emitify/legacy');
const inherits = require('inherits');

inherits(Typos, EventEmitter);

function Typos(text) {
    check(text);
    
    EventEmitter.call(this);
    
    const store = {
        cursor: 0,
        length: text.length,
        errorsCount: 0,
    };
    
    this.add = (symbol) => {
        add(text, store, this, symbol);
    };
}

module.exports = (text) => {
    return new Typos(text);
};

function add(text, store, emitter, symbol) {
    const cursor = store.cursor;
    const length = store.length;
    
    const current = text[cursor] || '';
    
    if (cursor >= length) {
        ++store.errorsCount;
        
        const count = store.errorsCount;
        emitter.emit('error', errorEndText(count, symbol, current));
        return;
    }
    
    if (symbol !== current) {
        ++store.errorsCount;
        
        const count = store.errorsCount;
        emitter.emit('error', errorWrongSymbol(count, symbol, current));
        return;
    }
    
    emitter.emit('add', {
        cursor,
        symbol,
    });
    
    ++store.cursor
    
    if (store.cursor === length) {
        const errorsCount = store.errorsCount;
        
        emitter.emit('end', {
            length,
            errorsCount,
        });
    }
}

function errorWrongSymbol(count, symbol, current) {
    const error = Error(`Symbol "${symbol}" is wrong`);
    
    return Object.assign(error, {
        current,
        symbol,
        count,
    });
}

function errorEndText(count, symbol, current) {
    const error = Error('Text is ended');
    
    return Object.assign(error, {
        current,
        symbol,
        count,
    });
}

function check(text) {
    if (typeof text !== 'string')
        throw Error('text should be a string!');
    
    if (!text.length)
        throw Error('text can not be empty!');
}

