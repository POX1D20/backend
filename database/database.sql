CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    id_question INT NOT NULL,
    answer TEXT,
    correct_answer BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_question) REFERENCES questions(id) ON DELETE CASCADE
);

insert into questions (question) values ('Сколько будет 2 + 2?')

INSERT INTO answers (id_question, answer, correct_answer) VALUES (2, 'Четыре', true);

SELECT
  questions.question,
  answers.answer,
  answers.correct_answer
FROM
  answers
JOIN questions ON answers.id_question = questions.id;

UPDATE answers SET answer = 'Десять' WHERE id = 1;
