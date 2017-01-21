json.title @argumentation.title
json.content @argumentation.content
json.owner @argumentation.user.email
json.id @argumentation.id
json.user_id @argumentation.user_id

json.arguments @argumentation.arguments do |argument|
  json.title argument.title
  json.content argument.content
  json.id argument.id
  json.place argument.place
end
