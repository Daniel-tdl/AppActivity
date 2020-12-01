module.exports = app => {
    function dataValidaOrErro(value, msg) {
        const data = new Date(value)
        if (isNaN(data) || (data.toString() === "Invalid Date"))
            return msg
        else
            return ""
    }

    function isValidDate(realizationDate, msg) {
        const data = new Date(realizationDate)
        if (data <= Date.now) {
            return msg
        } else
            return ""
    }

    function isValidSize(campo, valueSize, msg) {
        if (typeof campo !== 'string') throw "tipo de dado invalído!"
        if (campo.length > valueSize) {
            return msg
        } else
            return ""
    }

    function isValidePriorityUrgente(type) {
        if (type !== 1 || type !== 3) {
            return "Apenas as atividades de manutenção e documentação podem ter prioridade Urgente."
        } else
            return ""
    }

    function isValidPriority(type, priority) {
        switch (priority) {
            case 1:
                return ""
            case 2:
                return isValidePriorityUrgente(type)
        }
    }

    return { dataValidaOrErro, isValidDate, isValidSize, isValidPriority }
}