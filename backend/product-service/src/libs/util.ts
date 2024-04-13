export function uuid() {
    const timestamp = Math.floor(Date.now() / 100).toString(16)
    const randomId = Math.floor(Math.random() * 16777216).toString(16)
    const processId = process.pid.toString(16)
    const counter = Math.floor(Date.now() * 100).toString(16)

    return `${timestamp}-${randomId}-${processId}-${counter}`
}
