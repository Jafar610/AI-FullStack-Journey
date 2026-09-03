export const errorHandler = (err, req, res, next)=>{
    return res.status(err.status || 500).json({
        status: false,
        message: err.message ||  "Something is wrong try again."
    });
}