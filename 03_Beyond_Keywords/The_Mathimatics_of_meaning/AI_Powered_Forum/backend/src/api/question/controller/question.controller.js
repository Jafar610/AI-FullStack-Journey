import { StatusCodes } from "http-status-codes";

export const createQuestionController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const result = await createQuestionWithVectorService({
      userId: req.user.id,
      title,
      content,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "question posted successfully",
      data: result.question,
    });
  } catch (error) {
    next(error);
  }
};

const getQuestionController = async (req, res, next) => {
  try {
    const filter = {
      search: req.query.search,
      mine: req.query.mine,
      userId:req.user.id
    };

    const result = await getQuestionService(filter);

    res.status(StatusCodes.ON).json({
        success:true,
        message: 'questions fetched successfully',
        ...result,
    });
  } catch (error) {
    next(error);
  }
};
