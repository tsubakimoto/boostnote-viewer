const CSON = require('cson');

module.exports = async function (context, req) {
    context.log('Cson function processed a request.');

    const csonObject = CSON.parse(req.body);
    const jsonObject = CSON.createJSONString(csonObject, { replacer: undefined, indent: false});

    context.res = {
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonObject
    };
}