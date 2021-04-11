// Imports
const express = require('express')
const Posts = require('./posts-model')

// Express Router instance
const router = express.Router()


// Posts endpoints

// GET    | /api/posts              | Returns **an array of all the post objects** contained in the database
router.get('/', async (req, res) => {
    // Posts.find()
    //     .then(posts => {
    //         res.status(200).json(posts)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //         res.status(500).json({ message: 'The posts information could not be retrieved' })
    //     })
    
    try {
        const posts = await Posts.find()
        res.status(200).json(posts)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'The posts information could not be retrieved' })
    }
})

// GET    | /api/posts/:id          | Returns **the post object with the specified id**
router.get('/:id', async (req, res) => {
    // Posts.findById(req.params.id)
    //     .then(post => {
    //         const [ status, json ] = post 
    //             ? [200, post] 
    //             : [404, { message: 'The post with the specified ID does not exist' }]
    //         res.status(status).json(json)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //         res.status(500).json({ message: 'The post information could not be retrieved' })
    //     })

    try {
        const post = await Posts.findById(req.params.id)
        const [ status, json ] = post 
                ? [200, post] 
                : [404, { message: 'The post with the specified ID does not exist' }]
        res.status(status).json(json)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'The post information could not be retrieved' })
    }
})

// POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post('/', async (req, res) => {
    // if (!req.body.title || !req.body.contents) {
    //     res.status(400).json({ message: 'Please provide title and contents for the post' })
    // }
    // else {
    //     Posts.insert(req.body)
    //         .then(({ id }) => {
    //             return Posts.findById(id)
    //         })
    //         .then(post => {
    //             res.status(201).json(post)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             res.status(500).json({ message: 'There was an error while saving the post to the database' })
    //         })
    // }

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } 
    else {
        try {
            const { id } = await Posts.insert(req.body)
            const post = await Posts.findById(id)
            res.status(201).json(post)
        }
        catch (err) {
            console.error(err)
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        }
    }
})

// PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', async (req, res) => {
    // if (!req.body.title || !req.body.contents) {
    //     res.status(400).json({ message: 'Please provide title and contents for the post' })
    // }
    // else {
    //     Posts.update(req.params.id, req.body)
    //         .then(success => {
    //             if (success)
    //                 return Posts.findById(req.params.id)
    //             else
    //                 res.status(404).json({ message: 'The post with the specified ID does not exist' })
    //         })
    //         .then(post => {
    //             res.status(200).json(post)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             res.status(500).json({ message: 'The post information could not be modified' })
    //         })
    // }

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    }
    else {
        try {
            let post = await Posts.findById(req.params.id)
            if (post) {
                await Posts.update(req.params.id, req.body)
                post = await Posts.findById(req.params.id)
                res.status(200).json(post)
            }
            else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: 'The post information could not be modified' })
        }
    }
})

// DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (post) {
            await Posts.remove(post.id)
            res.status(200).json(post)
        }
        else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'The post could not be removed' })
    }
})

// GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id
router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (post) {
            const comments = await Posts.findPostComments(req.params.id)
            res.status(200).json(comments)
        }
        else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'The comments information could not be retrieved' })
    }
})


// Exports
module.exports = router