import express from 'express'
import cors from 'cors'
import questionsRouter from './routes/questions.routes.js'
import answersRouter from './routes/answers.routes.js'

const PORT = 8085
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', questionsRouter)
app.use('/api', answersRouter)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}!`)
})
