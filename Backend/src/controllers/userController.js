const UserController = {

    myUser: async (req, res, next) => {
        console.log("req.user");
        console.log(req.user);
        res.status(200).json({
            user: req.user
        });
    }
}
export {UserController}