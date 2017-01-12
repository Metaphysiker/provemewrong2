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

  scenario "User creates an argumentation" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
  end

  scenario "User creates an argumentation and adds an argument" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Bearbeiten"
    add_argument("A case against Moral Nihilism", "Moral nihilism is the denial of moral properties.")
    click_button "Bearbeitungsmodus verlassen"

    expect(page).to have_content("A case against Moral Nihilism")
    find('h4', :text => "A case against Moral Nihilism").trigger('click')
    expect(page).to have_content("Moral nihilism is the denial of moral properties.")
  end

  scenario "User creates an argumentation, adds two arguments and switches them" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Bearbeiten"
    add_argument("A case against Moral Nihilism", "Moral nihilism is the denial of moral properties.")
    add_argument("Moral Properties are not natural", "What is right and wrong can be known a priori.")
    click_button "Bearbeitungsmodus verlassen"

    expect(page.text.index("A case against Moral Nihilism") < page.text.index("Moral Properties are not natural")).to be true

    click_button "Bearbeiten"
    click_button "Argumente tauschen"
    check 'A case against Moral Nihilism'
    check 'Moral Properties are not natural'
    click_button "Tauschen"
    click_button "Speichern"
    click_button "Bearbeitungsmodus verlassen"

    expect(page.text.index("A case against Moral Nihilism") < page.text.index("Moral Properties are not natural")).to be false
  end

end