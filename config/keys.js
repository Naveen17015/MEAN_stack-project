dbPassword = 'mongodb+srv://userDB:'+ encodeURIComponent('12345') + '@cluster0-fazyx.mongodb.net/test?retryWrites=true&w=majority'
module.exports = {
    mongoURI: dbPassword
};
