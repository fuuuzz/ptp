module MembersHelper
     def member_commenters(member)

       name = member.name
       member_comments = Comment.all(:conditions => { :author => name })

       return member_comments
     end

     def bars_created(member)

       id = member.id
       bars_created = Bar.all(:conditions => { :member_id => id })

       return bars_created
     end
end
