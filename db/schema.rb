# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111023230547) do

  create_table "chapters", :force => true do |t|
    t.boolean  "enabled"
    t.string   "chapter_title"
    t.integer  "chapter_number"
    t.text     "resume"
    t.integer  "subject_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chapters", ["subject_id"], :name => "index_chapters_on_subject_id"

  create_table "sections", :force => true do |t|
    t.boolean  "enabled"
    t.string   "section_title"
    t.integer  "section_number"
    t.text     "resume"
    t.integer  "chapter_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sections", ["chapter_id"], :name => "index_sections_on_chapter_id"

  create_table "subjects", :force => true do |t|
    t.string   "subject_name"
    t.text     "resume"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
