var SpacebookApp = function() {
    // var posts = [{
    //     text: "Hello world",
    //     id: 0,
    //     comments: [
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" }
    //     ]
    // }, {
    //     text: "Hello world",
    //     id: 1,
    //     comments: [
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" }
    //     ]
    // }, {
    //     text: "Hello world",
    //     id: 2,
    //     comments: [
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" },
    //         { text: "Man, this is a comment!" }
    //     ]
    // }];
    var posts = [];
    // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');

    var _findPostById = function(id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
    }

    var createPost = function(text) {
        var post = {
            text: text,
            id: currentId,
            comments: []
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function() {
        $posts.empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            var commentsContainer = '<div class="comments-container">' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

            $posts.append('<div class="post" data-id=' + post.id + '>' + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
                commentsContainer + '</div>');
        }
    }

    var removePost = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;

        var post = _findPostById(id);

        posts.splice(posts.indexOf(post), 1);
        $clickedPost.remove();
    }

    var toggleComments = function(currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    function createComment(comment, thisPostId) {

        var commentEntry = {
            comment: comment
        }
        var chosenPost = _findPostById(thisPostId);
        chosenPost.comments.push(commentEntry);
        //console.log(chosenPost);
    }


    function renderComments(thisPostId) {
        $('.comments-container').empty();

        var chosenPost = _findPostById(thisPostId);
        for (var i = 0; i < chosenPost.comments.length; i++) {
            var currentComment = chosenPost.comments[i];

            //$(chosenPost).append('<div>' + currentComment + '</div>');
    $(chosenPost).find('.comments-container').append('<div>' + currentComment + '</div>');

        };
    }
    //var chosenPost= _findPostById(thisPostId);
    //$(currentPost).find('.comments-container').append('<div>' + chosenPost.comments + '</div>');


    //var renderPosts = function() {

    //     $posts.empty();

    //     for (var i = 0; i < posts.length; i += 1) {
    //         var post = posts[i];

    //         var commentsContainer = '<div class="comments-container">' +
    //             '<input type="text" class="comment-name">' +
    //             '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

    //        $posts.append('<div class="post" data-id=' + post.id + '>' + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
    //             commentsContainer + '</div>');
    //     }
    // }





    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,

        createComment: createComment,


        renderComments: renderComments,

        // TODO: Implement
        // removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function() {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
    //app.renderComments(thisPostId);
});

$('.posts').on('click', '.remove', function() {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function() {
    app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function() {
    var comment = $(this).closest(".post").find(".comment-name").val();
    var thisPostId = $(this).closest(".post").data().id;
    app.createComment(comment, thisPostId);
    app.renderComments(thisPostId);
});
