class ArgumentCommentsController < ApplicationController
  def getcomments
    @comments = ArgumentComment.where(argument_id: params[:argument_id])
  end

  def update
    title = ActionController::Base.helpers.sanitize(params[:title])
    content = ActionController::Base.helpers.sanitize(params[:content])

    if params[:id] == 0
      @comment = ArgumentComment.create!(
                         title: title,
                         content: content,
                         user_id: current_user.id,
                         argument_id: 0
      )
    else
      argumentcomment = ArgumentComment.find(params[:id])
      @comment = argumentcomment.update(
                        title: title,
                        content: content,
      )
    end
  end
end
