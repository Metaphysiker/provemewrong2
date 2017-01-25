class ArgumentCommentsController < ApplicationController
  def getcomments
    @comments = ArgumentComment.where(argument_id: params[:argument_id])
  end

  def create
    title = ActionController::Base.helpers.sanitize(params[:title])
    content = ActionController::Base.helpers.sanitize(params[:content])
    argument_id = params[:argument_id]

    ArgumentComment.create!(
        title: title,
        content: content,
        user_id: current_user.id,
        argument_id: argument_id
    )
  end

  def update
    title = ActionController::Base.helpers.sanitize(params[:title])
    content = ActionController::Base.helpers.sanitize(params[:content])

      argumentcomment = ArgumentComment.find(params[:id])
      @comment = argumentcomment.update(
                        title: title,
                        content: content,
      )
  end
end
