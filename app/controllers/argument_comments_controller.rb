class ArgumentCommentsController < ApplicationController
  def getcomments
    Rails::logger.debug "epicness: " + params.inspect
    Rails::logger.debug params.inspect
    @comments = ArgumentComment.where(argument_id: params[:argument_id])
    Rails::logger.debug @comments.inspect
    Rails::logger.debug params[:argument_id].inspect

  end
end
