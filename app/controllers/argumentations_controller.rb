class ArgumentationsController < ApplicationController
  def index

  end

  def search
    @argumentations = Argumentation.all.limit(10)
  end
end