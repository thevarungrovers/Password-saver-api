const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json()) // converts any json input from the user into javascript code

// database
const passwords = [
    {
        id : 1,
        website : 'www.netlify.app',
        email : 'example@ex.com',
        password : 'helloworld'
    },
    {
        id : 2,
        website : 'www.netlify.app',
        email : 'abc123@ex.com',
        password : 'helloworld!!!'
    },
    {
        id : 3,
        website : 'www.github.app',
        email : 'example@ex.com',
        password : 'hellohello'
    },
    {
        id : 4,
        website : 'www.github.app',
        email : 'github@ex.com',
        password : 'helloworldgithub'
    }
]


// get route
app.get('/', (req,res) => {
    res.send('App Started..')
    console.log('App Started.....')
})

// get route to print whole array
app.get('/api/password-saver/', (req,res) => {
    res.send(passwords)
})

// particular get route | password
app.get('/api/password-saver/:id', (req,res) => {
    const particularpass = passwords.find(w => w.id === parseInt(req.params.id))
    if(!particularpass) {
        return res.status(404).send('PASSWORD NOT FOUND!!')
    }
    else{
        res.send(particularpass)
    }
})


app.post('/api/password-saver/', (req,res) => {
    const schema = {
        website : Joi.required(),
        email : Joi.required(),
        password : Joi.required()
    }

    const result = Joi.validate(req.body, schema) //returns object

    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }

    else{
        const newpass = {
            id : passwords.length + 1,
            website : req.body.website,
            email : req.body.email,
            password : req.body.password
        }
        passwords.push(newpass) // adding new password
        res.send(passwords)
        }
    
})










// server
app.listen(5002, () =>{ 
    console.log('Server is running at port 5002....')
})