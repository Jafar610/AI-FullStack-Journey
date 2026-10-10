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

export const getQuestionController = async (req, res, next) => {
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

const searchQuestionSemanticController = async(req, res, next)=>{
  try {
    const result = await searchQuestionSemanticService({
      query: req.body.query,
      k: req.query.k? Number(req.query.k):5,
      threshold:
      req.body.threshold === undefined
      ? Number(req.query.threshold)
      : undefined
    });

    res.status(StatusCodes.OK).json({
      success:true,
      message:'Semantic Search completed successfully',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}


const getSingleQuestionController = async(req, res, next)=>{
  try {
    const {questionHash} = req.params;
    const result = await getSingleQuestionService({
      success: true,
      message: 'Question fetched successfully',
      ...result,
    });

  } catch (error) {
    next(error);
  }
}

const assessAnswerAgainstQuestionController = async(req, res, next)=>{
  try {
    const {questionHash} = req.params;
    const {answerText} = req.body;
    const {question} = await getSingleQuestionService({
      questionHash,
      includeAnswer:false,
    });
    const data = await assessAnswerAgainstQuestionService({
      questionTitle: question.title,
      questionContent: question.content,
      answerText,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Answer fit assessed',
      data,
    });
  } catch (error) {
    next(error);
  }
}

const generateQuestionDraftCoachController = async (req, res, next) =>{
  try {
    const {title, content} = req.body;
    const data = await generateQuestionDraftCoachService({title, content});

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Draft suggestions generated',
      date,
    });
  } catch (error) {
    next(error);
  }
}