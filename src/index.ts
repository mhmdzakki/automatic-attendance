import { $ } from 'bun'
import { Context, Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/absence', async(c: Context) => {
    const command = await $`curl -i -X POST ${Bun.env.LOGIN_URL} -H "Content-Type: application/x-www-form-urlencoded" -d "username=${Bun.env.NIM}&password=${Bun.env.PASSWORD}"`.quiet();
    const token = command.text().split(" ")[15];

    const data = await fetch(Bun.env.ABSENCE_URL + '', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Cookie": token
        },
    })

    return c.text(await data.text());
})

export default app
