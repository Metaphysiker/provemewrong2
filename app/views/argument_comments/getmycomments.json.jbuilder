json.array! @comments do |comment|
  json.title comment.title
  json.owner comment.user.email
  json.content comment.content
  json.argumentation_id comment.argument.argumentation_id
end
