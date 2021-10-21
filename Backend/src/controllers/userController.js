const UserController = {

    myUser: async (req, res, next) => {
        try{
            res.status(200).json({
                user: req.user
            });
        }catch (error) {
            res.status(404).json({
                Error: `Ha ocurrido un error en la petición: ${error.message}`,
            });
        }
    }
}
export {UserController}