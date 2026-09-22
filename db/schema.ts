import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const flows=sqliteTable('flows',{id:text('id').primaryKey(),screens:text('screens').notNull(),version:integer('version').notNull().default(1)});
export const comments=sqliteTable('comments',{id:text('id').primaryKey(),screenId:text('screen_id').notNull(),author:text('author').notNull(),text:text('text').notNull(),resolved:integer('resolved').notNull().default(0),createdAt:integer('created_at').notNull()});
export const presence=sqliteTable('presence',{id:text('id').primaryKey(),name:text('name').notNull(),screenId:text('screen_id').notNull(),updatedAt:integer('updated_at').notNull()},table=>[index('presence_updated_at_idx').on(table.updatedAt)]);
