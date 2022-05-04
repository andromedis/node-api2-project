import { server } from "./api/server"
const port: number = 1111

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})