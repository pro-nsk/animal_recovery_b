import { NextFunction, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { OperationsCounter, OperationsCounterDocument } from '../models/OperationsCounter'
import { ActionType } from '../util/enums'

export const validate = (method: ActionType) => {
    switch (method) {
        case ActionType.edit: {
            return [
                check('counter', 'Счётчик должен быть числом').isNumeric()
            ]
        }
        case ActionType.create: {
            return [
                check('counter', 'Счётчик должен быть числом').isNumeric()
            ]
        }
    }
}

/**
 * GET /operations-counter
 * OperationsCounter entity.
 */
export const getOperationsCounter = (req: Request, res: Response) => {
    OperationsCounter.findOne(undefined, (err, article) => {
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

    OperationsCounter.findOne(undefined, (err, article) => {
        if (article) {
            res.statusCode = 409
            return res.send({ error: 'Счётчик уже создан' })
        }

        let operationsCounter = new OperationsCounter({
            counter: req.body.counter
        })
    
        let saveFunc = (operationsCounter: OperationsCounterDocument) => operationsCounter.save(err => {
            if (!err) {
                res.statusCode = 200
                return res.send({ success: 'ok' })
            } else {
                res.statusCode = 500
                return res.send({ error: 'server error' })
            }
        })
    
        saveFunc(operationsCounter)
    })
}

/**
 * PUT /operations-counter
 * Edit OperationsCounter.
 */
export const editOperationsCounter = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.statusCode = 400
        //TODO: rework of send errors
        return res.send({ error: errors.array()[0].msg })
    }

    OperationsCounter.findOne(undefined, (err, operationsCounter) => {
        if (!operationsCounter) {
            res.statusCode = 404
            return res.send({ error: 'не найдено' })
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