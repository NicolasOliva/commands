const checkRoleAdmin = (req, res, next) => {

    if(req.isAuthenticated()) {
        if(req.user.role === 'ADMIN_ROLE'){
            return next();
        }
    }

    res.json({
        ok: false,
        message: 'Authorization denied'
    });

};

const checkRoleTaker = (req, res, next) => {

    if(req.isAuthenticated()) {
        if(req.user.role === 'ADMIN_ROLE' || req.user.role === 'ORDER TAKER_ROLE'){
            return next();
        }
    }

    res.json({
        ok: false,
        message: 'Authorization denied'
    });

};

const checkRoleChef = (req, res, next) => {
    
    if(req.isAuthenticated()) {
        if(req.user.role === 'ADMIN_ROLE' || req.user.role === 'CHEF_ROLE'){
            return next();
        }
    }

    res.json({
        ok: false,
        message: 'Authorization denied'
    });

};

module.exports = [checkRoleAdmin, checkRoleTaker, checkRoleChef]; 