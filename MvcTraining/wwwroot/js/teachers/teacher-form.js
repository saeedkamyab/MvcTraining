$(document).ready(function () {

    // Open Modal for Create
    $('#btnCreateTeacher').click(function () {

        $('#teacherForm')[0].reset();

        $('#teacherForm [name="Id"]').val(0);

        $('#teacherForm').attr('action', '/Teacher/Create');

        $('#teacherModalTitle').text('ایجاد معلم');

        $('#teacherSubmitButton').text('ثبت معلم');

        let modal = bootstrap.Modal.getOrCreateInstance(
            document.getElementById('teacherModal')
        );

        modal.show();

    });

    // Open Modal for Edit
$(document).on('click', '.btn-edit-teacher', function () {

    let teacherId = $(this).data('id');

    $.ajax({

        url: '/Teacher/GetTeacher',

        type: 'GET',

        data: { id: teacherId },

        success: function (teacher) {

            $('#teacherForm [name="Id"]').val(teacher.id);
            $('#teacherForm [name="FirstName"]').val(teacher.firstName);
            $('#teacherForm [name="LastName"]').val(teacher.lastName);
            $('#teacherForm [name="NationalCode"]').val(teacher.nationalCode);
            $('#teacherForm [name="Age"]').val(teacher.age);

            $('#teacherForm').attr('action', '/Teacher/Edit');

            $('#teacherModalTitle').text('ویرایش معلم');

            $('#teacherSubmitButton').text('ذخیره تغییرات');

            let modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById('teacherModal')
            );

            modal.show();

        },

        error: function () {

            alert('خطا در دریافت اطلاعات معلم');

        }

    });

});

// Submit Teacher Form
$('#teacherForm').submit(function (e) {

    e.preventDefault();

    let form = $(this);

    $.ajax({

        url: form.attr('action'),

        type: 'POST',

        data: form.serialize(),

        success: function (response) {

            alert(response.message);

            bootstrap.Modal.getOrCreateInstance(
                document.getElementById('teacherModal')
            ).hide();

            form[0].reset();

            loadTeachers();

        },

        error: function (xhr) {

            alert('خطا در ذخیره اطلاعات معلم');

            console.log(xhr.responseJSON);

        }

    });

});


});


