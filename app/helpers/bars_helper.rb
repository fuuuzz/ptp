module BarsHelper
  def give_bar_rate(bar)
    rate = 0
    bar_id = bar.id
    comments = Comment.all(:conditions => { :bar_id => bar_id })

    if comments.count != 0

      comments.each do |comment|
        rate += comment.rate
      end
       rate = rate.to_f/comments.count

    else

    end

    return rate
  end

  def member_already_comment(bar, member)
    member_already_comment = false
    comments = Comment.all(:conditions => { :bar_id => bar.id })

    comments.each do |comment|
      if comment.author == member.name
        member_already_comment = true
      end
    end

    return member_already_comment

  end
end
