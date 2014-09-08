var restful = require('node-restful'),
	mongoose = restful.mongoose,
    UserSchema;

UserSchema = restful.model('user', mongoose.Schema({
    email:  { type: 'string', required: true },
    password: { type: 'string', required: true },
    userName: { type: 'string', required: true }
}));
                             
module.exports = UserSchema;