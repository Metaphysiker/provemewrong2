class ArgumentationsController < ApplicationController
  before_action :find_argumentation, only: [:show, :update]

  def index

  end

  def search
    if params[:keywords].present?
     @argumentations = Argumentation.search_by_title_content(params[:keywords]).offset(10 * params[:page].to_i).limit(10)
    end
  end

  def show

  end

  private

  def find_argumentation
    Rails::logger.debug params.inspect
    @argumentation = Argumentation.find(params[:id])
  end
end