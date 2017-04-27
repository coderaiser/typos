'use strict';

const test = require('tape');
const typos = require('..');

test('typos: no args', (t) => {
    t.throws(typos, /text should be a string!/, 'should throw when no args');
    t.end();
});

test('typos: no args', (t) => {
    const fn = () => typos('');
    t.throws(fn, /text can not be empty!/, 'should throw when text is empty');
    t.end();
});

test('typos: add: error', (t) => {
    const text = 'hello';
    const typo = typos(text);
    
    typo.on('error', (e) => {
        const error = Error(`Symbol "x" is wrong`);
        
        Object.assign(error, {
            current: 'h',
            symbol: 'x',
            count: 1,
        });
        
        t.deepEqual(error, e, 'should emit error');
        t.end();
    });
    
    typo.add('x');
});

test('typos: add: end', (t) => {
    const text = 'x';
    const typo = typos(text);
    
    typo.on('end', (result) => {
        const store = {
            errorsCount: 0,
            length: 1,
        };
        
        t.deepEqual(result, store, 'should be equal');
        t.end();
    });
    
    typo.add('x');
});

test('typos: add: add', (t) => {
    const text = 'x';
    const typo = typos(text);
    
    typo.on('add', (result) => {
        const store = {
            cursor: 0,
            symbol: 'x'
        };
        
        t.deepEqual(result, store, 'should be equal');
        t.end();
    });
    
    typo.add('x');
});

test('typos: add: add after end', (t) => {
    const text = 'x';
    const typo = typos(text);
    
    typo.on('error', (e) => {
        const error = Error(`Text is ended`);
        
        Object.assign(error, {
            current: '',
            symbol: 'm',
            count: 1,
        });
        
        t.deepEqual(error, e, 'should emit error');
        t.end();
    });
    
    typo.add('x');
    typo.add('m');
});

