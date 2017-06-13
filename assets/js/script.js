$(document).ready(function() {

  var API_KEY = 'dc6zaTOxFJmzC'
  var topics = ['bart', 'lisa', 'homer', 'marge', 'maggie']

  function addButtons () {
    $('#button-wrapper').empty()
    for (var i = 0; i < topics.length; i++) {
      var $button = $('<button/>')
        .addClass('btn')
        .attr('data-name', topics[i])
        .text(topics[i])
      $('#button-wrapper').append($button)
    }
  }


  function getImages () {
    var name = $(this).attr('data-name')
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + name + '&limit=10&api_key=dc6zaTOxFJmzC'
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (res) {
      $('#image-wrapper').empty()
      res.data.forEach(function(item) {
      console.log(item)
      var $img = $('<img/>')
        .attr('src', item.images.original_still.url)
        .attr('data-still', item.images.original_still.url)
        .attr('data-giphy', item.images.original.url)
        .addClass('image')
      $('#image-wrapper').append($img)
      })
    })
  }
   function clickImage () {
     var src = $(this).attr('src')
     var still = $(this).attr('data-still')
     var giphy = $(this).attr('data-giphy')
     src === still ? $(this).attr('src', giphy) : $(this).attr('src', still)
   }
  // Adds onClick higher up in DOM heirarchy.
  // Solves adding event listener to element newly created
  $(document).on('click', '.btn', getImages)
  $(document).on('click', '.image', clickImage)
  addButtons()
})
