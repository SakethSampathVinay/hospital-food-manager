import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

const port = 4000

app.get("/", (request, response) => {
    console.log("API is working fine");
    response.json("API is Working Fine")
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})