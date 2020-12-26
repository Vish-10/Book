module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }

        res.send('not authenticated');
    },
    ensureAdmin: function(req, res, next){
        if(req.user.admin){
            return next();
        }

        res.send('not authenticated');
    }
}