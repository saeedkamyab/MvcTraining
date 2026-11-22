function loadTeachers() {

    $.ajax({

        url: '/Teacher/GetTeachers',

        type: 'GET',

        success: function (teachers) {

            let rows = '';
            $('#teachersTable').empty();
        
            $.each(teachers, function (index, teacher) {

    let row = $('<tr>');

    row.append($('<td>').text(teacher.id));
    row.append($('<td>').text(teacher.firstName));
    row.append($('<td>').text(teacher.lastName));

    let editButton = $('<button>', {
        type: 'button',
        class: 'btn btn-sm btn-warning btn-edit-teacher',
        text: 'ویرایش'
    }).attr('data-id', teacher.id);

    let deleteButton = $('<button>', {
    type: 'button',
    class: 'btn btn-sm btn-danger btn-delete-teacher ms-1',
    text: 'حذف'
}).attr('data-id', teacher.id);

    row.append($('<td>').append(editButton).append(deleteButton));

    $('#teachersTable').append(row);
});

        },

        error: function () {

            alert('خطا در دریافت اطلاعات معلمان');

        }

    });

}