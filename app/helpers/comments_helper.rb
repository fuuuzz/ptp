module CommentsHelper

  def give_bar_rate(bar)
    rate = 0
    bar_id = bar.id
    comments = Comment.all(:conditions => { :bar_id => bar_id })

    if comments.count != 0

      comments.each do |comment|
        rate += comment.rate
      end
      rate = rate.to_i/comments.count

    else
      rate = -1
    end

    return rate
  end
  
  def user_already_comment(bar, user)
    user_already_comment = false
    comments = Comment.all(:conditions => { :bar_id => bar.id })

    comments.each do |comment|
      if comment.author == user.name
        user_already_comment = true
      end
    end

    return user_already_comment

  end
end
