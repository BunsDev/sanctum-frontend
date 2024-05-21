import express, { Express, Request, Response } from "express";
import cors from 'cors'
import bodyParser from 'body-parser' 
import { Snowflake } from 'nodejs-snowflake'

const app: Express = express();
const port = process.env.PORT ?? 3030;

const uid = new Snowflake();

app.use(cors())
app.use(bodyParser.json())

app.post("/api/v1/confirmation", (req: Request, res: Response) => {
  console.log(req.body)
  setTimeout(() => {
    res.send({
      ok: true,
      uid: uid.getUniqueID().toString(),
    });
  }, 1_000)
});

app.put("/api/v1/confirmation/:id", (req: Request, res: Response) => {
  console.log(req.body)
  setTimeout(() => {
    res.send({
      ok: true,
      hash: '0x0102030405060708090a0b0c0d0e0f'
    });
  }, 1_000)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
