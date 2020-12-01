exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists("tbPriorityActivity", function(table) {
            table.increments('id');
            table.string('nome').notNull()
        }).then(function() {
            return knex("tbPriorityActivity").insert([
                { nome: "Normal" },
                { nome: "Urgente" }
            ]);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("tbPriorityActivity")
    ]);
};