exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTableIfNotExists("tbTypeActivity", function(table) {
            table.increments('id');
            table.string('nome').notNull()
        }).then(function() {
            return knex("tbTypeActivity").insert([
                { nome: "Manutenção" },
                { nome: "Desenvolvimento" },
                { nome: "Documentação" }
            ]);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("tbTypeActivity")
    ]);
};