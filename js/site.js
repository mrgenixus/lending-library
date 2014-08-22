function drawBookBox(data) {
  var books = ich.books({
    'rows': data
  })
$('#books').html(books)
}

$(document).on( 'click', '#showAvailable', toggleAvailable)

$(document).on( 'click', '.clear', function(e) {
  clearSearch(e)
  $('#showAvailable').removeClass('button-pressed')
    .html('Show Available')
})

$(document).on('keyup', '#bookSearch', function(e) {
  var text = $(e.target).val().trim().toLowerCase()

  if (text === '') return clearSearch(e)
  if ($('.button-pressed').length === 1) {
    console.log('Hide unavailable')
    $('.book-box').filter('.not-available').hide()
  }
  filterBooks(text)
})

$(document).on( 'click', '.book-box-book', function(e) {
  var rowNumber = $(this).closest("div").attr("id")
  if ($(this).closest('div').hasClass('selected-book')) {
    $('.book-box-bottom' + '.' + rowNumber).css('display', 'none')
    $(this).closest('div').removeClass('selected-book')
  }
  else {
    $('.book-box-bottom' + '.' + rowNumber).css('display', 'inherit')
    $(this).closest('div').addClass('selected-book')
  }
})

function toggleAvailable() {
  if ($('.button-pressed').length === 0) {
    console.log('off')
    $('#showAvailable').addClass('button-pressed')
      .html('Show All')
    $('.not-available').hide()
  } else {
    console.log('on')
    $('#showAvailable')
      .html('Show Available').removeClass('button-pressed')
    if ($('#bookSearch').val() != '') {
      console.log("search not empty")
      return filterBooks($('#bookSearch').val())
    }
    $('.not-available').show()
  }
}

function clearSearch(e) {
  console.log('clear')
  $('#bookSearch').val('')
  drawBookBox(gData)
}

function filterBooks(text) {
  $('.book-box-book').each(function() {
  var book = $(this).html().toLowerCase()
  if (book.match(text)) {
    $(this).parent().show()
  } else $(this).parent().hide()
  })
}
