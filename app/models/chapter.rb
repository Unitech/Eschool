class Chapter < ActiveRecord::Base
  belongs_to :subject
  has_many :sections
  accepts_nested_attributes_for :sections, :reject_if => lambda { |a| a[:section_title].blank? }, :allow_destroy => true
end
