import db from '../database/db.js'

class answersController {
    // GET
    async getAnswers(req, res) {
        const selectAnswers = await db.query(`select * from answers order by id`)
        res.json(selectAnswers.rows)
    }

    //POST
    async createAnswer(req, res) {
        const { id_question, answer, correct_answer } = req.body
        const createAnswer = await db.query(
            'insert into answers (id_question, answer, correct_answer) values ($1, $2, $3) RETURNING *',
            [id_question, answer, correct_answer]
        )
        res.json(createAnswer.rows)
    }

    //DEL
    async deleteAnswer(req, res) {
        const { id } = req.params
        const delAnswer = await db.query('delete from answers where id = $1 RETURNING *', [id])
        res.json(delAnswer.rows)
    }

    //PUT
    async editAnswers(req, res) {
        const answers = req.body

        for (let i = 0; i < answers.length; i++) {
            const { id, id_question, answer, correct_answer } = answers[i]
            const selectAnswer = await db.query('select * from answers where id = $1', [id])
            const selectAnswerRow = selectAnswer.rows[0]

            if (
                selectAnswerRow.answer !== answer ||
                selectAnswerRow.correct_answer !== correct_answer
            ) {
                const updateAnswer = await db.query(
                    'UPDATE answers SET answer = $1, correct_answer = $2 WHERE id = $3 RETURNING *',
                    [answer, correct_answer, id]
                )
                console.log(updateAnswer.rows)
            }
        }

        // res.json(answers)
    }

    //РАБОЧИЙ КОД ДЛЯ POST
    // async editAnswers(req, res) {
    //     try {
    //         const answers = req.body

    //         for (let i = 0; i < answers.length; i++) {
    //             const { id, id_question, answer, correct_answer } = answers[i]

    //             try {
    //                 const selectAnswer = await db.query('SELECT * FROM answers WHERE id = $1', [id])
    //                 const selectAnswerRow = selectAnswer.rows[0]

    //                 if (
    //                     selectAnswerRow.answer !== answer ||
    //                     selectAnswerRow.correct_answer !== correct_answer
    //                 ) {
    //                     const updateAnswer = await db.query(
    //                         'UPDATE answers SET answer = $1, correct_answer = $2 WHERE id = $3 RETURNING *',
    //                         [answer, correct_answer, id]
    //                     )
    //                     console.log(updateAnswer.rows)
    //                 }
    //             } catch (error) {
    //                 console.error(`Error processing answer with id ${id}:`, error)
    //                 return res.status(500).send(`Error processing answer with id ${id}`)
    //             }
    //         }

    //         res.status(200).json({ message: 'Answers updated successfully' })
    //     } catch (error) {
    //         console.error('Error updating answers:', error)
    //         res.status(500).send('A server error occurred while updating answers')
    //     }
    // }

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

export default new answersController()
