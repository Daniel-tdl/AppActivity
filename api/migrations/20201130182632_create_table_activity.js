exports.up = function(knex) {
    return knex.schema.createTable('tbActivity', table => {
        table.increments('id').primary()
        table.string('nome', 25).notNull()
        table.string('description', 120)
        table.dateTime('realizationsDate').notNull(),
            table.integer('typeID').unsigned().references('id').inTable('tbTypeActivity')
            .onDelete('set null')
        table.integer('priorityID').unsigned().references('id').inTable('tbPriorityActivity')
            .onDelete('set null')
    })
};

exports.down = function(knex) {
    return kenex.schema.dropTable('tbActivity')
};