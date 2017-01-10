class Argument < ApplicationRecord
  #after_create :add_place
  #after_destroy :reorder_place

  belongs_to :argumentation1

  include PgSearch
  pg_search_scope :search_by_title_content, :against => [:title, :content]

  def add_place
    argumentation = Argumentation.find(self.argumentation.id)
    place_number = argumentation.arguments.maximum("place")
    if place_number == 0
      self.update(place: 1)
    else
      place_number = place_number + 1
      self.update(place: place_number)
    end
  end

   def reorder_place
    argumentation = Argumentation.find(self.argumentation)
    place_of_deleted_argument = self.place
    argumentation.arguments.each do |argument|
      if argument.place > place_of_deleted_argument
        place_number = argument.place
        argument.update(place: place_number - 1)
      end
    end
  end

end
