posts = [];
var id = 0;



var postFunc = function(text) {

    var newPost = new Object();
    newPost.text = text;
    newPost.id = id;
    posts.push(newPost);
    id++;
}

var printPost = function() {
    $(".posts").empty();
    for (var i = 0; i < posts.length; i++) {
        $('.posts').append("<p class='post' data-id=" + posts[i].id + ">" + posts[i].text + "</p>")
        //$(posts[i]).attr("button", 'type=button')

    }
}


$('.add-post').click(function() {
    var text = $('#post-name').val();
    postFunc(text);
    printPost()
    console.log(posts)
});
