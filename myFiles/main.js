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
        $('.posts').empty();

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            var commentsContainer = '<div class="comments-container">' + '<div class=comments-list></div>' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

            $('.posts').append('<div class="post">' + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
                commentsContainer + '</div>');
        };
    };
    //<div class="posts">
    //{{#each posts}}
    //<div class="post">
    //<a href="#" class="remove">remove</a>
    //<a href="#" class="show-comments">comments</a>
    //{{this.text}}
    //</div>
    // <div class="comments-container">
    //<div class=comments-list>
    //</div>
    //<input type="text" class="comment-name">
    //<button class="btn btn-primary add-comment">
    //Post Comment</button> 
    //</div>
    //</div>


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

    function createComment(text, postIndex) {

        var comment = {
            text: text
        };
        posts[postIndex].comments.push(comment);

    }

    var renderComments = function() {

        $('.comments-list').empty();
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var $post = $('.posts').find('.post').eq(i);
            for (var j = 0; j < post.comments.length; j++) {
                var comment = post.comments[j];
                $post.find('.comments-list').append(
                    '<div class="comment"> ' + comment.text +
                    ' <button class="btn btn-danger remove-comment">Remove Comment</button>' +
                    '</div>'
                );
            }
        }
    }

    var removeComment = function(currentComment) {
        var $clickedComment = $(currentComment).closest('.comment');
         var commentIndex = $clickedComment.index();

    var postIndex = $clickedComment.closest('.post').index();
    posts[postIndex].comments.splice(commentIndex, 1);
        $clickedComment.remove();
    }

    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,
        createComment: createComment,
        renderComments: renderComments,
        removeComment: removeComment,
        toggleComments: toggleComments
    }
}


var app = SpacebookApp();

app.renderPosts();
app.renderComments();

$('.add-post').on('click', function() {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
    app.renderComments();
});

$('.posts').on('click', '.remove', function() {
    app.removePost(this);
});

$('.posts').on('click', '.show-comments', function() {
    app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function() {
    var text = $(this).siblings('.comment-name').val();

    var postIndex = $(this).closest('.post').index();
    app.createComment(text, postIndex);
    app.renderComments();
});

$('.posts').on('click', '.remove-comment', function() {
    app.removeComment(this);
})
