require 'rails_helper'
require 'spec_helper'

feature "angular test" do
  let(:email) { "bob@example.com" }
  let(:password) { "password123" }

  before do
    User.create!(email: email,
                 password: password,
                 password_confirmation: password)
  end


  scenario "Our Angular App is Working" do
    log_in(email, password)
    expect(page).to have_content("We're using Rails 5.0.1")
  end

end