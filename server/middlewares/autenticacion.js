const jwt = require('jsonwebtoken');

//Verificar Token
let verificaToken = (req, res, next) => {
    let token = req.get('token'); //Éste es el token que viene en los HEADERS al hacer la petición
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decoded.user;
        next();
    });
    // res.json({
    //     token
    // })
}

//Verifica AdminRole
let verificaAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

module.exports = {
    verificaToken,
    verificaAdminRole
};