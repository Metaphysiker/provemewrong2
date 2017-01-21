# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Role.create!(role: "Admin")
Role.create!(role: "Editor")
Role.create!(role: "Premium")
Role.create!(role: "Commentator")


if Rails.env == 'development'
  mainuser = User.create!(email: "s.raess@me.com", password: "password")
  mainuser.roles << Role.where(role: "Admin")
  10.times do
    argumentation = Argumentation.create!(
        title: Faker::Lorem.sentence,
        content: Faker::Lorem.paragraph(20, true, 20),
        user_id: mainuser.id
    )
    10.times do
      argument = Argument.create!(
          title: Faker::Lorem.sentence,
          content: Faker::Lorem.paragraph(20, true, 20),
          argumentation_id: argumentation.id
      )
      argument.add_place
    end
  end

  100.times do |i|
    puts "I is: #{i}"

    user = User.create!(email: Faker::Internet.email, password: "password")
    10.times do
      argumentation = Argumentation.create!(
          title: Faker::Lorem.sentence,
          content: Faker::Lorem.paragraph(20, true, 20),
          user_id: user.id
      )
      10.times do
        argument = Argument.create!(
            title: Faker::Lorem.sentence,
            content: Faker::Lorem.paragraph(20, true, 20),
            argumentation_id: argumentation.id
        )
        argument.add_place
      end
    end
  end

  Argument.all.each do |argument|
    3.times do
      ArgumentComment.create(
          title: Faker::Lorem.sentence,
          content: Faker::Lorem.paragraph(10, true, 10),
          argument_id: argument.id,
          user_id: Random.rand(1..User.all.count)
      )
    end

  end

end