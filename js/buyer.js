let delayInMilliseconds = 2000;

$(window).on("load", function () {
  $(".modal").hide();
});

$(".close").on("click", function () {
  $(".modal").hide();
});

let openShareModal = function () {
  $("#share").show();
};
let openSettleModal = function () {
  $("#settle").show();
};

let openDetailsModal = function () {
  $("#details").show();
};

let copyText = function () {
  $("#copy").html("Copied!");
  setTimeout(function () {
    $("#copy").html("Copy Sharing Link");
  }, delayInMilliseconds);
};
