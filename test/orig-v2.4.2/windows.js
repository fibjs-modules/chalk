// https://github.com/chalk/chalk/blob/v2.4.2/test/windows.js

const m = require('../..');

let originalEnv;
let originalPlatform;

test.before(() => {
	originalEnv = process.env;
	originalPlatform = process.platform;
});

test.after(() => {
    Object.keys(originalEnv).forEach(k => {
        process.env[k] = originalEnv[k];
    });
	Object.defineProperty(process, 'platform', {value: originalPlatform});
});

test.beforeEach(() => {
    Object.keys(process.env).forEach(k => {
        delete process.env[k]
    })
	Object.defineProperty(process, 'platform', {value: 'win32'});
    
	// Since chalk internally modifies `ansiStyles.blue.open`, `ansi-styles` needs
	// to be removed from the require cache for `require-uncached` to work
	delete require.cache[resolveFrom(__dirname, 'ansi-styles')];
});

test('detect a simple term if TERM isn\'t set', t => {
	delete process.env.TERM;
	const m = importFresh('..');
	t.is(m.blue('foo'), '\u001B[94mfoo\u001B[39m');
});

test('replace blue foreground color in cmd.exe', t => {
	process.env.TERM = 'dumb';
	const m = importFresh('..');
	t.is(m.blue('foo'), '\u001B[94mfoo\u001B[39m');
});

test('don\'t replace blue foreground color in xterm based terminals', t => {
	process.env.TERM = 'xterm-256color';
	const m = importFresh('..');
	t.is(m.blue('foo'), '\u001B[34mfoo\u001B[39m');
});

test('don\'t apply dimmed styling on gray strings, see https://github.com/chalk/chalk/issues/58', t => {
	process.env.TERM = 'dumb';
	const m = importFresh('..');
	t.is(m.gray.dim('foo'), '\u001B[90mfoo\u001B[22m\u001B[39m');
});

test('apply dimmed styling on xterm compatible terminals', t => {
	process.env.TERM = 'xterm';
	const m = importFresh('..');
	t.is(m.gray.dim('foo'), '\u001B[90m\u001B[2mfoo\u001B[22m\u001B[39m');
});

test('apply dimmed styling on strings of other colors', t => {
	process.env.TERM = 'dumb';
	const m = importFresh('..');
	t.is(m.blue.dim('foo'), '\u001B[94m\u001B[2mfoo\u001B[22m\u001B[39m');
});