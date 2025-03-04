import { Context, Hono } from 'hono'

const app = new Hono().basePath("/api");

app.get('/', (c) => {
  return c.json({
    message: 'Hello Hono!'
  })
})

app.get('/absence', async(c: Context) => {
    try {
        const command = await Bun.$`curl -i -X POST ${Bun.env.LOGIN_URL} -H "Content-Type: application/x-www-form-urlencoded" -d "username=${Bun.env.NIM}&password=${Bun.env.PASSWORD}"`.quiet();
        const token = command.text().split(" ")[15];
    
        const data = await fetch(Bun.env.ABSENCE_URL + '', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Cookie": token
            },
        })
        return c.json({
            message: await data.text()
        });
    } catch (error: any) {
        return c.json({
            message: error.message
        }, 500)
    }
})

export default app
