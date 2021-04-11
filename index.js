const server = require('./api/server')
const port = 1111

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})