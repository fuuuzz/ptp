require "populator"
require "ffaker"

namespace :db do

	task :populate => :environment do

		Bar.populate(100) do |bar|
			bar.name = Faker::Name.name
			bar.adress = Faker::Address.street_address
			bar.price = (3..10).to_a.sample
		end
	end
end
