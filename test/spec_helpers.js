const test = require('test')

exports.setupTestEnv = () => {
    if (!!global.test)
        return ;
        
    global.test = (desc, callback) => {
        const assert = require('assert')

        it(desc, () => {
            callback({
                is: assert.strictEqual,
                not: assert.notEqual,
                false: assert.isFalse,
                true: assert.isTrue,
            });
        });
    }

    global.test.xit = test.xit
    global.test.before = test.before
    global.test.after = test.after
    global.test.beforeEach = test.beforeEach

    global.xtest = xit
}