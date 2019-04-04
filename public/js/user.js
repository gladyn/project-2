// Wait until page is loaded
$(document).ready(function() {
  // Get references to page elements
  var $userName = $("#username");
  var $userEmail = $("#email");
  var $userPhone = $("#phone");
  var $userCity = $("#city");
  var $userState = $("#state");
  var $userZip = $("#zip");
  var $submitBtn = $("#submit");
  var $userList = $("#user-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveUser: function(user) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/users",
        data: JSON.stringify(user)
      });
    },
    getUsers: function() {
      return $.ajax({
        url: "api/users",
        type: "GET"
      });
    },
    deleteUser: function(id) {
      return $.ajax({
        url: "/api/users/" + id,
        type: "DELETE"
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new user
  // Save the new user to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var user = {
      name: $userName.val().trim(),
      email: $userEmail.val().trim(),
      phone: $userPhone.val().trim(),
      city: $userCity.val().trim(),
      state: $userState.val().trim(),
      zip: $userZip.val().trim()
    };

    // TODO Validation
    if (!(user.name && user.email)) {
      alert("You must enter a user name and email!");
      return;
    }

    API.saveUser(user).then(function() {
      alert("User saved!");
      location.reload();
    });

    $userName.val("");
    $userEmail.val("");
    $userPhone.val("");
    $userCity.val("");
    $userState.val("");
    $userZip.val("");
  };

  // handleDeleteBtnClick is called when a user's delete button is clicked
  // Remove the user from the db and refresh the list
  var handleDeleteBtnClick = function() {
    if (confirm("Are you sure you want to delete this user?")) {
      var idToDelete = $(this)
        .parent()
        .attr("data-id");
      API.deleteUser(idToDelete).then(function() {
        location.reload();
      });
    }
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $userList.on("click", ".delete", handleDeleteBtnClick);
});
