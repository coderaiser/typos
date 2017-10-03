import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import builtins from 'rollup-plugin-node-builtins';

export default {
    input: 'lib/typos.js',
    name: 'typos',
    plugins: [
        commonjs({
            include: [
                'lib/**',
                'node_modules/**',
            ]
        }),
        nodeResolve({
            preferBuiltins: true,
            browser: true,
        }),
        builtins(),
        babel({
            exclude: 'node_modules/**'
        }),
        uglify(),
        filesize()
    ]
};

