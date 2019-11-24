const jwt = require ('jwt-simple');
const moment = require ('moment');
const secret = 'this_is_a_secret_key';

exports.createToken = (user)=> {
    let payload= {
        sub: user._id,
        name: user.name,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix
    };
    return jwt.encode(payload,secret);
}