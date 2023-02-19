$(document).ready(function() {
  $('#pay-btn').click(function() {
    // Make the API call using jQuery's ajax method
    $.ajax({
      url: 'https://sandbox.checkbook.io/v3/check/digital',
      method: 'POST',
      data: {
        "name": "John Smith",
        "amount": 10.0,
        "description": "Payment for goods"
      },
      headers: {
        'Authorization': 'your-api-key-here',
        'Content-Type': 'application/json'
      },
      success: function(response) {
        console.log(response);
        // Handle the response from the API here
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        // Handle the error from the API here
      }
    });
  });
});