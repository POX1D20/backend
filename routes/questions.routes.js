import Router from 'express'
import questionsController from '../controllers/questions.controller.js'

const router = new Router()

router.get('/question', questionsController.getQuestions)
router.post('/question', questionsController.createQuestion)
router.delete('/question/:id', questionsController.deleteQuestion)
router.put('/question', questionsController.editQuestions)

export default router
