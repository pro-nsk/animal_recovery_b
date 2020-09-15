import mongoose from 'mongoose'

export type PostDocument = mongoose.Document & {
    mainImage: string
    text: string
}

const postSchema = new mongoose.Schema({
    mainImage: String,
    text: String
})

export const Post = mongoose.model<PostDocument>('Post', postSchema)