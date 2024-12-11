$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission
        
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $(this).serialize(), // Serialize form data
            success: function (response) {
                if (response.success) {
                    // Hide the modal and update the page for the logged-in state
                    $('#staticBackdrop').modal('hide');
                    $('#loginStatus').html(`<p>Welcome, ${response.userid}!</p>`);
                } else {
                    // Display error message in the modal
                    $('#loginError').text(response.error).show();
                }
            },
            error: function () {
                $('#loginError').text('An unexpected error occurred. Please try again.').show();
            }
        });
    });
});
