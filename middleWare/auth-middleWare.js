import jwt from "jsonwebtoken";
import User from "../model/user_model.js";


// CHECK JWT
export const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({
            message: "You need to login"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        req.userId = decoded.id;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};


// CHECK ADMIN
export const requireAdmin = async (req, res, next) => {

    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Admins only"
            });
        }

        next();

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};


// CHECK CURRENT USER
export const checkUser = async (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {

        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decodedToken.id);

        res.locals.user = user;

        next();

    } catch (err) {

        console.log(err.message);

        res.locals.user = null;

        next();
    }
};