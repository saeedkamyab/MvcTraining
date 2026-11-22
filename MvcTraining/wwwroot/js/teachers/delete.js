$(document).on('click', '.btn-delete-teacher', function () {

    let teacherId = $(this).data('id');

    if (!confirm('آیا از حذف این معلم اطمینان دارید؟'))
        return;

    $.ajax({

        url: '/Teacher/Delete',

        type: 'POST',

        data: {
            id: teacherId,
            __RequestVerificationToken: $('#teacherForm input[name="__RequestVerificationToken"]').val()
        },

        success: function (response) {

            alert(response.message);

            loadTeachers();

        },

        error: function (xhr) {

            alert('خطا در حذف معلم');

            console.log(xhr.responseJSON);

        }

    });

});