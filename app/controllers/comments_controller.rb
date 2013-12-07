class CommentsController < ApplicationController
  layout "admin"

  before_filter :authenticate_member
  
  def create
    @bar = Bar.find(params[:bar_id])
    @comment = @bar.comments.create(params[:comment])

    redirect_to bar_path(@bar)
  end

  def update
    @bar = Bar.find(params[:bar_id])

    respond_to do |format|
      if @bar.update_attributes(params[:bar])
        format.html { redirect_to @bar, notice: 'Bar was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @bar.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @bar = Bar.find(params[:bar_id])
    @comment = @bar.comments.find(params[:id])
    @comment.destroy
    redirect_to bar_path(@bar)
  end
end
