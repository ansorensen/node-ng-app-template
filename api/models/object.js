var restful = require('node-restful'),
	mongoose = restful.mongoose,
    ObjectSchema;

ObjectSchema = restful.model('object', mongoose.Schema({
    name:  { type: 'string', required: true },
    desc: {type: 'string', required: false}
}));
                             
module.exports = ObjectSchema;