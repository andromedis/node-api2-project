// Imports
import express, { Request, Response } from "express";
import * as PostModel from "./posts-model";
import { BasePost, Post } from "./post.interface";
import { Comment } from "./comment.interface";

// Express Router instance
export const router = express.Router()


// Posts endpoints

// GET    | /api/posts              | Returns **an array of all the post objects** contained in the database
router.get('/', async (req: Request, res: Response) => {
    // PostModel.find()
    //     .then((posts: Post[]) => {
    //         res.status(200).json(posts)
    //     })
    //     .catch((err: unknown) => {
    //         console.error(err)
    //         res.status(500).json({ message: 'The posts information could not be retrieved' })
    //     })
    
    try {
        const posts: Post[] = await PostModel.find()
        res.status(200).json(posts)
    }
    catch (err: unknown) {
        console.error(err)
        res.status(500).json({ message: 'The posts information could not be retrieved' })
    }
})

// GET    | /api/posts/:id          | Returns **the post object with the specified id**
router.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    // PostModel.findById(id)
    //     .then((post: Post | undefined) => {
    //         const [ status, json ] = post 
    //             ? [200, post] 
    //             : [404, { message: 'The post with the specified ID does not exist' }]
    //         res.status(status).json(json)
    //     })
    //     .catch((err: unknown) => {
    //         console.error(err)
    //         res.status(500).json({ message: 'The post information could not be retrieved' })
    //     })

    try {
        const post: Post | undefined = await PostModel.findById(id)
        const [ status, json ] = post 
                ? [200, post] 
                : [404, { message: 'The post with the specified ID does not exist' }]
        res.status(status).json(json)
    }
    catch (err: unknown) {
        console.error(err)
        res.status(500).json({ message: 'The post information could not be retrieved' })
    }
})

// POST   | /api/posts              | Creates a post using the information sent inside the request body and returns **the newly created post object**
router.post('/', async (req: Request, res: Response) => {
    // if (!req.body.title || !req.body.contents) {
    //     res.status(400).json({ message: 'Please provide title and contents for the post' })
    // }
    // else {
    //     const post: BasePost = req.body
    //     PostModel.insert(post)
    //         .then(( { id }: {id: number} ) => {
    //             return PostModel.findById(id)
    //         })
    //         .then((post: Post | undefined) => {
    //             res.status(201).json(post)
    //         })
    //         .catch((err: unknown) => {
    //             console.error(err)
    //             res.status(500).json({ message: 'There was an error while saving the post to the database' })
    //         })
    // }

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    }
    else {
        try {
            const post: BasePost = req.body
            const { id }: {id: number} = await PostModel.insert(post)
            const newPost: Post | undefined = await PostModel.findById(id)
            res.status(201).json(newPost)
        }
        catch (err: unknown) {
            console.error(err)
            res.status(500).json({ message: 'There was an error while saving the post to the database' })
        }
    }
})

// PUT    | /api/posts/:id          | Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
router.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    // if (!req.body.title || !req.body.contents) {
    //     res.status(400).json({ message: 'Please provide title and contents for the post' })
    // }
    // else {
    //     const postUpdate: BasePost = req.body
    //     PostModel.update(id, postUpdate)
    //         .then((recordsUpdated: number | undefined) => {
    //             if (recordsUpdated)
    //                 return PostModel.findById(id)
    //             else
    //                 res.status(404).json({ message: 'The post with the specified ID does not exist' })
    //         })
    //         .then((post: Post | undefined) => {
    //             res.status(200).json(post)
    //         })
    //         .catch((err: unknown) => {
    //             console.log(err)
    //             res.status(500).json({ message: 'The post information could not be modified' })
    //         })
    // }

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    }
    else {
        try {
            const postUpdate: BasePost = req.body

            let post: Post | undefined = await PostModel.findById(id)
            if (post) {
                await PostModel.update(id, postUpdate)
                post = await PostModel.findById(id)
                res.status(200).json(post)
            }
            else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        }
        catch (err: unknown) {
            console.log(err)
            res.status(500).json({ message: 'The post information could not be modified' })
        }
    }
})

// DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)
        const post: Post | undefined = await PostModel.findById(id)
        if (post) {
            await PostModel.remove(post.id)
            res.status(200).json(post)
        }
        else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
    }
    catch (err: unknown) {
        console.log(err)
        res.status(500).json({ message: 'The post could not be removed' })
    }
})

// GET    | /api/posts/:id/comments | Returns an **array of all the comment objects** associated with the post with the specified id
router.get('/:id/comments', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)
        const post: Post | undefined = await PostModel.findById(id)
        if (post) {
            const comments: Comment[] = await PostModel.findPostComments(id)
            res.status(200).json(comments)
        }
        else {
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        }
    }
    catch (err: unknown) {
        console.error(err)
        res.status(500).json({ message: 'The comments information could not be retrieved' })
    }
})
