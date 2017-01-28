class ArgumentCommentsController < ApplicationController
  def getcomments
    @comments = ArgumentComment.where(argument_id: params[:argument_id])
  end

  def getmycomments
    @comments = ArgumentComment.where(user_id: current_user.id)
  end

  def create
    title = ActionController::Base.helpers.sanitize(params[:title])
    content = ActionController::Base.helpers.sanitize(params[:content])
    argument_id = params[:argument_id]

    if current_user.nil?
      anonymuser = User.find_by_email("anonym@anonym.com")
      Rails::logger.debug anonymuser.id.inspect
      current_user_id = anonymuser.id
    else
      current_user_id = current_user.id
    end
    ArgumentComment.create!(
        title: title,
        content: content,
        user_id: current_user_id,
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
