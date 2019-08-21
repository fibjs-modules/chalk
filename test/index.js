const test = require('test')
test.setup()

const chalk = require('../lib/')
const styles = require('ansi-styles')

require('./orig-v2.4.2');

describe('basic usage', () => {
    it('color', () => {
        assert.strictEqual(
            chalk.blue('hello'),
            `${styles.blue.open}hello${styles.blue.close}`
        )
    });
})

describe('process check', () => {
    it('no top-level sandbox env modified', () => {
        assert.strictEqual(
            process.env.FORCE_COLOR,
            undefined
        )
    });
})

test.run(console.DEBUG)
