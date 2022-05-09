import { Knex } from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('comments', tbl => {
    tbl.increments();

    tbl.string('text').notNullable();

    tbl
      .integer('post_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTableIfExists('comments');
};
