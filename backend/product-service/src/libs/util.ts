import { Console } from 'node:console'
import { Transform } from 'node:stream'

export function uuid() {
    const timestamp = Math.floor(Date.now() / 100).toString(16)
    const randomId = Math.floor(Math.random() * 16777216).toString(16)
    const processId = process.pid.toString(16)
    const counter = Math.floor(Date.now() * 100).toString(16)

    return `${timestamp}-${randomId}-${processId}-${counter}`
}

export function jsonParseSafely(json: string) {
    try {
        return JSON.parse(json)
    } catch (error) {
        console.error(error)

        return null
    }
}

export function getConsoleTableString(data: object) {
    const ts = new Transform({
        transform(chunk, enc, cb) {
            cb(null, chunk)
        }
    })

    const logger = new Console({ stdout: ts })

    logger.table(data)

    return (ts.read() || '').toString()
}
