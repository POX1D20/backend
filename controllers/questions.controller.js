import db from '../database/db.js'

class questionsController {
    // GET
    async getQuestions(req, res) {
        const selectQuestions = await db.query('select * from questions order by id')
        res.json(selectQuestions.rows)
    }

    // POST
    async createQuestion(req, res) {
        const { question } = req.body
        const createQuestion = await db.query(
            'insert into questions (question) values ($1) RETURNING *',
            [question]
        )
        res.json(createQuestion.rows)
    }

    // DELETE
    async deleteQuestion(req, res) {
        const { id } = req.params
        const delQuestion = await db.query('delete from questions where id = $1 RETURNING *', [id])
        res.json(delQuestion.rows)
    }

    // PUT
    async editQuestions(req, res) {
        try {
            const questions = req.body

            for (let i = 0; i < questions.length; i++) {
                const { id, question } = questions[i]

                try {
                    const selectQuestion = await db.query('SELECT * FROM questions WHERE id = $1', [
                        id,
                    ])
                    const selectQuestionRow = selectQuestion.rows[0]

                    if (selectQuestionRow.question !== question) {
                        const updateQuestion = await db.query(
                            'UPDATE questions SET question = $1 WHERE id = $2 RETURNING *',
                            [question, id]
                        )
                        console.log(updateQuestion.rows)
                    }
                } catch (error) {
                    console.error(`Error processing question with id ${id}:`, error)
                    return res.status(500).send(`Error processing question with id ${id}`)
                }
            }

            res.status(200).json({ message: 'Questions updated successfully' })
        } catch (error) {
            console.error('Error updating questions:', error)
            res.status(500).send('A server error occurred while updating questions')
        }
    }

    //POST
    // async createPrinter(req, res) {
    //     // Получаю данные из тела запроса от клиента
    //     const { type, name, ip_address, location } = req.body
    //     // Делаю запрос на создание в БД на основе полученных данных от клиента
    //     const createPrint = await db.query(
    //         `insert into printers (type, name, ip_address, location) values ($1, $2, $3, $4) RETURNING *`,
    //         [type, name, ip_address, location]
    //     )
    //     // отправка созданных данных клиенту
    //     res.json(createPrint.rows[0])
    // }
    // //GET
    // async getPrinter(req, res) {
    //     const selectPrint = await db.query(`select * from printers order by location`)
    //     res.json(selectPrint.rows)
    // }
    // //PUT
    // async updatePrinter(req, res) {
    //     const { id, type, name, ip_address, location } = req.body
    //     const updatePrint = await db.query(
    //         `update printers set type = $1, name = $2, ip_address = $3, location = $4 where id = $5 RETURNING *`,
    //         [type, name, ip_address, location, id]
    //     )
    //     res.json(updatePrint.rows[0])
    // }
    // //DELETE
    // async deletePrinter(req, res) {
    //     const id = req.params.id
    //     const delPrint = await db.query(`delete from printers where id = $1 RETURNING *`, [id])
    //     res.json(delPrint)
    // }
}

export default new questionsController()
