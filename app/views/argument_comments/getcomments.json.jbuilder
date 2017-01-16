json.array! @comments do |comment|
  json.title comment.title
  json.owner comment.user.email
  json.content comment.content
end
