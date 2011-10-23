class Chapter < ActiveRecord::Base
  belongs_to :subject
  has_many :sections
  accepts_nested_attributes_for :sections, :allow_destroy => true
end
