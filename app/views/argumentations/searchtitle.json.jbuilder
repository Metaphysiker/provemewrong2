json.array! @argumentations do |argumentation|
  json.title argumentation.title
  json.owner argumentation.user.email
  json.id argumentation.id
end
