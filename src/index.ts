import { Context, Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/absence', async(c: Context) => {
    const command = await Bun.$`curl -i -X POST ${process.env.LOGIN_URL} -H "Content-Type: application/x-www-form-urlencoded" -d "username=${process.env.NIM}&password=${process.env.PASSWORD}"`.quiet();
    const token = command.text().split(" ")[15];

    const data = await fetch(process.env.ABSENCE_URL + '', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Cookie": token
        },
    })

    return c.text(await data.text());
})

export default app
