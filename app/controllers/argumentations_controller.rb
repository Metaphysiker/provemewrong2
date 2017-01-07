class ArgumentationsController < ApplicationController
  before_action :find_argumentation, only: [:show, :update]

  PAGE_SIZE = 10


  def index

  end

  def search

    @page = (params[:page] || 0).to_i

    if params[:keywords].present?
     #@argumentations = Argumentation.search_by_title_content(params[:keywords]).offset(10 * params[:page].to_i).limit(10)
    allbits = ImportantBits.new(params[:keywords], PAGE_SIZE * @page, PAGE_SIZE)
      @argumentations = allbits.get_search_results
    end


    respond_to do |format|
      format.json { render json: @argumentations }
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