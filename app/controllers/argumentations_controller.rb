class ArgumentationsController < ApplicationController
  before_action :find_argumentation, only: [:show]

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

  def create
    @argumentation = Argumentation.create!(
        title: "Labore et Dolore",
        content: "Errare humanum est",
        user_id: current_user.id
    )

    Argument.create!(
        title: "Lorem Ipsum",
        content: "Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        argumentation_id: @argumentation.id,
        place: 1
    )
  end

  def update
    argumentation = Argumentation.find(params[:id])

    params[:title] = ActionController::Base.helpers.sanitize(params[:title])
    params[:content] = ActionController::Base.helpers.sanitize(params[:content])

    argumentation.update(argumentation_params)
    updatearguments(argumentation, params[:arguments])
    @argumentation = Argumentation.find(params[:id])
  end

  def myargumentations
    @argumentations = current_user.argumentations
  end

  private

  def updatearguments(argumentation, param_arguments)

    param_arguments_ids = []

    param_arguments.each do |argument|
      param_arguments_ids.push(argument["id"])
    end

    argumentation.arguments.each do |argument|
      unless param_arguments_ids.include?(argument.id)
        argument.destroy
      end
    end

    param_arguments.each do |argument|

      if argument["id"] == 0
        Argument.create!(
                    title: ActionController::Base.helpers.sanitize(argument["title"]),
                    content: ActionController::Base.helpers.sanitize(argument["content"]),
                    place: argument["place"],
                    argumentation_id: argumentation.id
        )
      else
        argumentu = Argument.find(argument["id"])
        argument_params = ActionController::Parameters.new({
                                                               title: ActionController::Base.helpers.sanitize(argument["title"]),
                                                               content:  ActionController::Base.helpers.sanitize(argument["content"]),
                                                               place: argument["place"]
                                                           })
        argumentu.update(argument_params.permit(:title, :content, :place))
      end

    end
  end

  def find_argumentation
    @argumentation = Argumentation.find(params[:id])
    Rails::logger.debug @argumentation.inspect
  end


  def argumentation_params
    params.permit(:title, :content,  :arguments, pets_attributes: [:id, :title, :content, :place])
  end

  def argument_params
    params.permit(:id, :title, :content, :place)
  end

end