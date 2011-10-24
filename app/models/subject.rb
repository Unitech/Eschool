class Subject < ActiveRecord::Base
  has_many :chapters
  accepts_nested_attributes_for :chapters, :reject_if => lambda { |a| a[:chapter_title].blank? }, :allow_destroy => true
end
