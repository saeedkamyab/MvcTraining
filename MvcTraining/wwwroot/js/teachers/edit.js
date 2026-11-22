$(document).on('click', '.btn-edit-teacher', function () {

    let teacherId = $(this).data('id');

    $.ajax({

        url: '/Teacher/GetTeacher',

        type: 'GET',

        data: { id: teacherId },

        success: function (teacher) {

            $('#editTeacherForm [name="Id"]').val(teacher.id);
            $('#editTeacherForm [name="FirstName"]').val(teacher.firstName);
            $('#editTeacherForm [name="LastName"]').val(teacher.lastName);
            $('#editTeacherForm [name="NationalCode"]').val(teacher.nationalCode);
            $('#editTeacherForm [name="Age"]').val(teacher.age);

            let modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById('editTeacherModal')
            );

            modal.show();
        },

        error: function () {
            alert('خطا در دریافت اطلاعات معلم');
        }

    });

});

$('#editTeacherForm').submit(function (e) {

    e.preventDefault();

    $.ajax({

        url: $(this).attr('action'),

        type: 'POST',

        data: $(this).serialize(),

        success: function (response) {

            alert(response.message);

            bootstrap.Modal.getOrCreateInstance(
                document.getElementById('editTeacherModal')
            ).hide();

            loadTeachers();

        },

        error: function (xhr) {

            alert('خطا در ویرایش اطلاعات معلم');

            console.log(xhr.responseJSON);

        }

    });

});