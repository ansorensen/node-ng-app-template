var restful = require('node-restful'),
	mongoose = restful.mongoose,
    UserSchema;

UserSchema = restful.model('User', mongoose.Schema({
    _id: {type: 'number'},
    email:  { type: 'string', required: true },
    password: { type: 'string', required: true },
    userItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserItem' }]
}));
                             
module.exports = UserSchema;