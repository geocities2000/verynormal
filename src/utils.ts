export function convertToDuration(ms: number) {
    const seconds = ms / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    let output = (seconds % 60).toFixed(2).padStart(5, '0')
    if (minutes >= 1) {
        output = (minutes % 60).toFixed(0).padStart(2, '0') + ':' + output
    }
    if (hours >= 1) {
        output = (hours % 24).toFixed(0).padStart(2, '0')+ ':' + output
    }
    if (days >= 1) {
        output = (days).toFixed(0) + ' days, ' + output
    }

    return output
}