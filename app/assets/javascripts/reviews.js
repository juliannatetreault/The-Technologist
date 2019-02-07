// Fires functions upon docuemnt loading
$(document).ready(() => {
    pageListeners();
})

// Handles all page listeners
function pageListeners() {
    $('.new-form').click(newReview) // Renders a new review form on click
}

// Constructs review objects with review params
class Review {
    constructor(id, category, title, content, created_at, username) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.username = username;
    }

// Renders constructed objects to page via HTML
renderToPage() {
    let html = `
    <div id="reviews">
    <div class="heading">${this.title}</div>
    <div class="review-sub-label">Written by: ${this.username}</div>
    <div class="review-sub-label">Category: ${this.category}</div>
    <p>${this.content}</p>
    <p>Published: ${this.created_at}</p>
    </div>
    `
    return html;
  };
} 

// Extends truncated review on button click
Review.prototype.expandReview = $(function () {
    $(".show-more").on('click', function() {
      let id
      id = $(this).data("id");
      $.get("/reviews/" + id + ".json", function(data) {
        $("#body-" + id).text(data.content);
      });
    });
  });


// Gets an indvidual user's reviews via their user_id
function userReviews (element) {
    event.preventDefault();
    let user_id = parseInt(element.id);
     $.get(`/reviews.json`, function (data) {   
        reviews = []
        data.forEach(function (review) {
        if (review.user.id == user_id) {reviews.push(review)}})
        $('#reviews').html("")
        reviews.forEach(function(reviews) {
           let review = new Review(reviews.id, reviews.category.title, reviews.title, reviews.content, reviews.created_at, reviews.user.username)
            $('#reviews').append(review.renderToPage())
        });
    });
 }




// Creates a new review via a new, dynamic review form
function newReview() {
    event.preventDefault();
    let user_id = parseInt($('.new-form').attr('data-id'));
    $.get(`/users/${user_id}/reviews/new.json`, function(data) {

       $('.form').append(
           `     
       <form action="/reviews" id="review" method="POST">
       <input type="hidden" name="review[user_id]" value="${data.review.user_id}">
       <input type="hidden" name="authenticity_token" value="${$("meta[name=csrf-token]").attr("content")}">
       <select name="review[category_id]" class="browser-default">
            ${data.categories.map(category => '<option name="review[category_id]" value="' + category.id + '">' + category.title + '</option>')}    
        </select>
       <label for="title">Title: </label><input type="text" name="review[title]">
       <label for="content">Content: </label><input type="text" name="review[content]">
       <input type="submit" id="create-review" value="Create Review">
      </form>
           `
       )
    });
}


// Submits search form without a page refresh
// function submitSearch() {
//     event.preventDefault();
//     $('#search-form')
//     Rails.fire(search, 'submit');
// }
