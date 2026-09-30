const createQuestionController = async(req, res, next)=>{
    try {
        const {title, content} = req.body;
        const result = await createQuestionWithVectorService({
            userId: req.user.id,
            title,
            content,
        });

        res.status(StatusCodes.CREATED).json({
            success:true,
            message:'question posted successfully',
            data: result.question,
        });


    } catch (error) {
        next(error);
    }
}