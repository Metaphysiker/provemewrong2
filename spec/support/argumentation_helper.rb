module ArgumentationHelper
  def log_in(email, password)
    visit "/users/sign_in"
    login_as(@user, :scope => :user)
    #save_screenshot('screoooen.png', full: true)
    #fill_in "Email", with: email
    #fill_in "Password", with: password
    #click_button "Log in"
  end

  def create_single_argumentation_and_go_to_overview
    visit "/argumentation#!/overview"
    click_button "Argumentation erstellen"

    fill_in "argumentation_title", with: "A Defence of Moral Realism"
    fill_in "argumentation_content", with: "Russ Shafer-Landau"
    click_button "Speichern"
    sleep 2
    #click_button "OK"
    find_button("OK").trigger('click')
    save_screenshot('screen.png', full: true)
    sleep 2
    click_button "Übersicht"
    expect(page).to have_content("A Defence of Moral Realism")
  end

  def go_to_edit
    click_button "Edit"
    sleep 3
  end

  def add_argument(title, content)
    click_button "Argument hinzufügen"
    sleep 1
    click_button "OK"
    fill_in "argumentcontent_title", with: title
    fill_in "argumentcontent_content", with: content
    click_button "Speichern"
    sleep 1
    click_button "OK"
  end
end

#save_screenshot('screen.png', full: true)