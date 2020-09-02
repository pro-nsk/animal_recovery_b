import mongoose from 'mongoose'

export type OperationsCounterDocument = mongoose.Document & {
    counter: number
}

const operationsCounterSchema = new mongoose.Schema({
    counter: Number
})

export const OperationsCounter = mongoose.model<OperationsCounterDocument>('OperationsCounter', operationsCounterSchema)