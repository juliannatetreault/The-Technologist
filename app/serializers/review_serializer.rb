class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at
  belongs_to :user
  belongs_to :category
end
