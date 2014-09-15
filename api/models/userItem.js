var restful = require('node-restful'),
	mongoose = restful.mongoose,
    UserItemSchema;

UserItemSchema = restful.model('UserItem', mongoose.Schema({
    _owner : { type: Number, ref: 'User' },
    name:  { type: 'string', required: true },
    desc: {type: 'string', required: false}
}));
                             
module.exports = UserItemSchema;