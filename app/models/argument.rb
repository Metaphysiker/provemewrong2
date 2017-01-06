class Argument < ApplicationRecord
  belongs_to :argumentation

  include PgSearch
  pg_search_scope :search_by_title_content, :against => [:title, :content]
end
