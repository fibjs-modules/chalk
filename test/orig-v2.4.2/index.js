const test = require('test')
test.setup()

require('../spec_helpers').setupTestEnv();

const chalk = require('../../');

describe('orig: chalk', () => require('./chalk'))
describe('orig: constructor', () => require('./constructor'))
describe('orig: enabled', () => require('./enabled'))
describe('orig: level', () => require('./level'))
describe('orig: template-literal', () => require('./template-literal'))
describe('orig: visible', () => require('./visible'))
if (process.platform === 'win32')
    xdescribe('orig: windows', () => chalk.sandbox.require('./windows', __dirname))

if (require.main === module)
    test.run(console.DEBUG)