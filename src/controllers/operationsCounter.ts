import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { OperationsCounter, OperationsCounterDocument } from '../models/OperationsCounter'

/**
 * GET /operations-counter/id
 * OperationsCounter entity.
 */
export const getOperationsCounter = (req: Request, res: Response) => {
    OperationsCounter.findById(req.params.id, (err, article) => {
        if (!article) {
            res.statusCode = 404
            return res.send({ error: 'не найдено' })
        }
        if (!err) {
            return res.send(article)
        } else {
            res.statusCode = 500
            return res.send({ error: 'server error' })
        }
    })
}


/**
 * POST /operations-counter
 * New OperationsCounter.
 */
export const createOperationsCounter = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.statusCode = 400
        //TODO: rework of send errors
        return res.send({ error: errors.array()[0].msg })
    }

    let operationsCounter = new OperationsCounter({
        counter: req.body.counter
    })

    let saveFunc = (operationsCounter: OperationsCounterDocument) => operationsCounter.save(err => {
        if (!err) {
            return res.sendStatus(200)
        } else {
            res.statusCode = 500
            return res.send({ error: 'server error' })
        }
    })

    saveFunc(operationsCounter)
}

/**
 * PUT /operations-counter/:id
 * Edit OperationsCounter.
 */
export const editOperationsCounter = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.statusCode = 400
        //TODO: rework of send errors
        return res.send({ error: errors.array()[0].msg })
    }

    OperationsCounter.findById(req.params.id, (err, operationsCounter) => {
        if (!operationsCounter) {
            res.statusCode = 404
            return res.send({ error: 'not found' })
        }

        operationsCounter.counter = req.body.counter

        let saveFunc = (operationsCounter: OperationsCounterDocument) => operationsCounter.save(err => {
            if (!err) {
                return res.sendStatus(200)
            } else {
                res.statusCode = 500
                return res.send({ error: 'server error' })
            }
        })

        saveFunc(operationsCounter)
    })
}

/**
 * DELETE /operations-counter
 * Delete OperationsCounter.
 */
export const deleteOperationsCounter = (req: Request, res: Response) => {
    OperationsCounter.findById(req.params.id, (err, article) => {
        if (!article) {
            res.statusCode = 404
            return res.send({ error: 'not found' })
        }
        return article.remove(err => {
            if (!err) {
                return res.sendStatus(200)
            } else {
                res.statusCode = 500
                return res.send({ error: 'server error' })
            }
        })
    })
}