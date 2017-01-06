json.array! @argumentations do |argumentation|
  json.title argumentation.title
  json.content argumentation.content
  json.owner argumentation.user.email
  json.id argumentation.id

  json.arguments argumentation.arguments do |argument|
    json.title argument.title
    json.content argument.content
    json.id argument.id
  end
end