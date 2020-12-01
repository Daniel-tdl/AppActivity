module.exports = app => {
    app.route('/activity/create')
        .post(app.src.controllers.activity.save)

    app.route('/activity/update/:id')
        .put(app.src.controllers.activity.save)

    app.route('/activity/delete/:id')
        .delete(app.src.controllers.activity.del)

    app.route('/activity/index')
        .get(app.src.controllers.activity.get)

    app.route('/activity/index/:id')
        .get(app.src.controllers.activity.getById)
}