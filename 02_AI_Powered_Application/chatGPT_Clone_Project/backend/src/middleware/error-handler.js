export const errorHandler = (err, req, res, next)=>{
    return res.status(500).json({
        status: false,
        message: "Something is wrong try again."
    });
}