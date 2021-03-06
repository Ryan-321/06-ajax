$(document).ready(function() {

  var API_KEY = 'dc6zaTOxFJmzC'
  var topics = ['bart', 'lisa', 'homer', 'marge', 'maggie']

  function addButtons () {
    $('#button-wrapper').empty()
    for (var i = 0; i < topics.length; i++) {
      var $button = $('<button/>')
        .addClass('btn')
        .attr('data-name', topics[i]+'+simpson')
        .text(topics[i])
      $('#button-wrapper').append($button)
    }
  }

  function getImages () {
    var name = $(this).attr('data-name')
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + name + '&limit=12&api_key=dc6zaTOxFJmzC'
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (res) {
      $('#image-wrapper').empty()
      createImage(res)
    })
  }
// NOTE should make this click the div instead
  function clickImage () {
    var src = $(this).attr('src')
    var still = $(this).attr('data-still')
    var giphy = $(this).attr('data-giphy')
    src === still ? $(this).attr('src', giphy) : $(this).attr('src', still)
  }

  function createImage (res) {
    res.data.forEach(function(item) {
    // create img element
    var $img = $('<img/>')
      .attr('src', item.images.original_still.url)
      .attr('data-still', item.images.original_still.url)
      .attr('data-giphy', item.images.original.url)
      .addClass('image')
    // create p element
    var $p = $('<p/>')
      .text(item.rating.toUpperCase())
      .addClass('rating')
    // create div to hold $img and $p
    var $div = $('<div/>')
      .append($img, $p)
      .addClass('giphy-wrapper')
    $('#image-wrapper').append($div)
    })
  }

  function addTopics (e) {
    e.preventDefault()
    var newGif = $('#new-giphy-input').val()
    topics.push(newGif)
    addButtons()
  }

  // Adds onClick higher up in DOM heirarchy.
  // Solves adding event listener to element newly created
  $(document).on('click', '.btn', getImages)
  $(document).on('click', '.image', clickImage)
  $(document).on('click', '#add-topic', addTopics)

  addButtons()
})
