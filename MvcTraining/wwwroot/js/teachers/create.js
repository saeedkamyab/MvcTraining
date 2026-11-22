$('#createTeacherForm').submit(function (e) {

    e.preventDefault();

    $.ajax({

        url: $(this).attr('action'),

        type: 'POST',

        data: $(this).serialize(),

        success: function (response) {

            alert(response.message);

            $('#createTeacherModal').modal('hide');

            $('#createTeacherForm')[0].reset();

            loadTeachers();
        },

        error: function (xhr) {

            alert('خطا در ثبت اطلاعات معلم');

            console.log(xhr.responseJSON);
        }

    });

});