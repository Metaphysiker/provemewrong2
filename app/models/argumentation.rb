class Argumentation < ApplicationRecord
  belongs_to :user
  has_many :arguments

  include PgSearch
  pg_search_scope :search_by_title_content, :against => [:title, :content]
  pg_search_scope :search_by_title, :against => [:title], :using => {
      :tsearch => {:prefix => true}
  }
end
