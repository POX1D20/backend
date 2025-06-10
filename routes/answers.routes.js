import Router from 'express'
import answersController from '../controllers/answers.controller.js'

const router = new Router()

router.get('/answer', answersController.getAnswers)
router.post('/answer', answersController.createAnswer)
router.delete('/answer/:id', answersController.deleteAnswer)
router.put('/answer', answersController.editAnswers)

export default router
