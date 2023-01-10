import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { COURSE_STACK, TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/courses', (req: Request,res: Response) =>{
    res.status(200).send(courses)
})

// Agora faremos um endpoint que faz uma consulta por todos os cursos cadastrados e os filtra baseado em uma query params.

//A query irá se chamar q (abreviação de query) e será utilizada para gerar um resultado case insensitive.

app.get('/courses/search',(req: Request, res: Response) =>{
    const q = req.query.q as string

    const result = courses.filter((course) =>{
        return course.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

//terceiro endpoint, criação de curso

app.post('/courses', (req: Request, res: Response) =>{
    // const id = req.body.id as string
    // const name = req.body.name as string
    // const lessons = req.body.lessons as number
    // const stack= req.body.stack as COURSE_STACK

    const{id, name, lessons, stack}= req.body as TCourse


    const newCourse = {
        id,
        name,
        lessons,
        stack
    }
    courses.push(newCourse)

    res.status(201).send("Curso registrado com sucesso")
})

//funçao da requisição

app.get('/students', (req: Request, res: Response) =>{
    res.status(200).send(students)
})

//requisição de criar o estudante

app.post('/students', (req: Request, res: Response) =>{
    const {id, name,age}= req.body as TStudent

    const newstudent = {
        id,
        name,
        age
    }
    students.push(newstudent)
    res.status(201).send("Estudante registrado com sucesso")
})