class ArgumentationsController < ApplicationController
  def index

  end

  def search
    if params[:keywords].present?
     @argumentations = Argumentation.search_by_title_content(params[:keywords]).offset(10 * params[:page].to_i).limit(10)
    end
  end

end