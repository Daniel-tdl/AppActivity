module.exports = app => {
    const { dataValidaOrErro, isValidDate, isValidSize, isValidPriority } = app.src.config.validations
    const save = (req, res) => {
        const activity = {...req.body }
        if (req.params.id) activity.id = req.params.id

        let erros = []
        let erro = ""

        try {
            erro = dataValidaOrErro(activity.realizationsDate, "Data inváida.")
            if (erro !== "")
                erros.push(erro)

            erro = isValidDate(activity.realizationsDate, "Data precisa ser maior que atual.")
            if (erro !== "")
                erros.push(erro)

            erro = isValidSize(activity.nome, 25, "O nome se limita a 25 caracteres.")
            if (erro !== "")
                erros.push(erro)

            erro = isValidSize(activity.description, 120, "O description se limita a 120 caracteres.")
            if (erro !== "")
                erros.push(erro)

            erro = isValidPriority(activity.typeID, activity.priorityID)
            if (erro !== "")
                erros.push(erro)

            var data = {
                status: "error",
                erros
            };

            if (erros.length > 1){
                return res.status(500).send(data)
            }
        } catch (error) {
            console.log('error')
            return res.status(400).send(error)
        }

        if (activity.id) {
            app.db('tbActivity')
                .update(activity).where({ id: activity.id })
                .then(_ => res.status(200).json({ status: "sucess" }))
                .catch(e => res.status(500).send(e))
        } else {
            app.db('tbActivity')
                .insert(activity)
                .then(_ => res.status(200).json({ status: "sucess" }))
                .catch(err => res.status(500).send(err))
        }
    }

    const getById = async(req, res) => {
        app.db('tbActivity')
            .where({ id: req.params.id })
            .first()
            .then(activity => res.status(200).json({ activity: activity }))
            .catch(err => res.status(500).send(err))
    }

    const get = async(req, res) => {
        app.db('tbActivity')
            .select('*')
            .then(activitys => res.status(200).json({ activitys: activitys }))
            .catch(err => res.status(500).send(err))
    }

    const del = async(req, res) => {
        try {
            const activityDelete = await app.db('tbActivity')
                .where({ id: req.params.id }).del()

            res.status(204).send()
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    return { save, del, get, getById }
}