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
