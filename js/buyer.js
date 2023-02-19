let delayInMilliseconds = 2000;

$(window).on("load", function () {
  $(".modal").hide();
});

$(".close").on("click", function () {
  $(".modal").hide();
});

let closeModal = function () {
  $(".modal").hide();
};

let openShareModal = function () {
  $("#share").show();
};
let openSettleModal = function () {
  $("#settle").show();
};

let openDetailsModal = function () {
  $("#details").show();
};

let openConfirmModal = function () {
  $("#confirm").show();
};

let copyText = function () {
  $("#copy").html("Copied! Paste link in your browser.");

  setTimeout(function () {
    $("#copy").html("Copy Sharing Link");
    // Get the text field
    let copyText = "https://dhruvchowdhary.github.io/ReceiptSplit/client.html";

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }, delayInMilliseconds);
};
