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
    sleep 4

    expect(page.text.index("A case against Moral Nihilism") < page.text.index("Moral Properties are not natural")).to be true

    click_button "Bearbeiten"
    click_button "Argumente tauschen"
    check 'A case against Moral Nihilism'
    check 'Moral Properties are not natural'
    click_button "Tauschen"
    click_button "Speichern"
    click_button "Bearbeitungsmodus verlassen"
    sleep 3

    expect(page.text.index("A case against Moral Nihilism") < page.text.index("Moral Properties are not natural")).to be false
  end

  scenario "User creates an argumentation, adds an argument and deletes it" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Bearbeiten"
    add_argument("A case against Moral Nihilism", "Moral nihilism is the denial of moral properties.")
    click_button "Argument löschen"
    choose 'A case against Moral Nihilism'
    click_button "Löschen"
    sleep 1
    click_button "Ja, löschen!"
    sleep 1
    click_button "OK"
    sleep 1
    click_button "Speichern"
    sleep 1
    click_button "OK"
    sleep 1
    click_button "Bearbeitungsmodus verlassen"
    sleep 3
    expect(page).not_to have_content("A case against Moral Nihilism")
  end

  scenario "User creates an argumentation, changes something and leaves without saving" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Bearbeiten"
    fill_in "argumentation_title", with: "unsaved"
    click_button "Bearbeitungsmodus verlassen"
    sleep 2
    click_button "Ja, Veränderungen nicht speichern"
    sleep 2
    expect(page).to have_content("A Defence of Moral Realism")
    click_button "Bearbeiten"
    fill_in "argumentation_title", with: "now saved"
    click_button "Bearbeitungsmodus verlassen"
    sleep 1
    click_button "Zurück"
    click_button "Speichern"
    sleep 1
    click_button "OK"

    click_button "Bearbeitungsmodus verlassen"
    sleep 3
    expect(page).to have_content("now saved")
  end

  scenario "User creates an argumentation and deletes it" do
    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Löschen"
    sleep 1
    click_button "Ja, löschen!"
    sleep 1
    click_button "OK"
    expect(page).not_to have_content("A Defence of Moral Realism")
  end

  scenario "User creates an argumentation and adds two references" do
    anotheruser = User.create!(email: "anotheruser@gmail.com",
                 password: "abcdefgh123",
                 password_confirmation: "abcdefgh123")
    argum = Argumentation.create(title: "Kafka, Parmenides und das Absurde das Lebendige und das Enorme", content: "Kafka und Sartre haben etwas gemeinsam, beide räumen dem Absurden einen besonderen Platz ein.", user_id: anotheruser.id)

    log_in(email, password)
    create_single_argumentation_and_go_to_overview
    click_button "Bearbeiten"
    click_button "Referenz hinzufügen"
    fill_in "keywords", with: "Kafka, Parmenides und das"
    sleep 2
    expect(page).to have_content("Kafka, Parmenides und das Absurde das Lebendige und das Enorme")
    click_button "Kafka, Parmenides und das Absurde das Lebendige und das Enorme"
    expect(page).to have_content("Kopieren und im Text einfügen!")
    expect(page.find_field("copypaste").value).to have_content("hyperlink(" + argum.id.to_s + ":Kafka Parmenides und das Absurde das Lebendige und das Enorme)")
    #expect(page).to have_content("hyperlink(" + argum.id.to_s + ":Kafka Parmenides und das Absurde das Lebendige und das Enorme)")
    fill_in "argumentcontent_content", with: "Mein Argument beruht auf der Prämisse, dass Kafka und Sartre etwas gemeinsam haben, siehe: hyperlink(" + argum.id.to_s + ":New Kafka Button)"
    expect(page).to have_button("New Kafka Button")
  end

end
#save_screenshot('screen.png', full: true)