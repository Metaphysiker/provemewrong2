require 'rails_helper'

RSpec.describe ArgumentationsController, type: :controller do

  describe "place-order after destroy or create" do

    before(:each) do
      @testuser = User.create!(email: "test@me.com", password: "password")
      @argumentation = Argumentation.create!(title: "Argumentation-title", content: "Argumentation-description", user_id: @testuser.id)
    end

    it "creates argument and checks for order" do
      argument = Argument.create!(title: "Title", content: "description", argumentation_id: @argumentation.id)
      expect(argument.place).to eql(1)
    end

    it "creates second argument and checks for order" do
      argument = Argument.create!(title: "Title", content: "description", argumentation_id: @argumentation.id)
      argument2 = Argument.create!(title: "Title", content: "description", argumentation_id: @argumentation.id)
      expect(argument2.place).to eql(2)
    end

    it "creates three arguments, destroys one and checks for order" do
      argument = Argument.create(title: "Title", content: "description", argumentation_id: @argumentation.id)
      argument2 = Argument.create(title: "Title", content: "description", argumentation_id: @argumentation.id)
      argument3 = Argument.create(title: "Title", content: "description", argumentation_id: @argumentation.id)
      expect(argument2).to receive(:reorder_place)
      argument2.destroy
    end

  end

end