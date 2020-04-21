var dataTable;

$(document).ready(function () {
  loadDataTable();
});

function loadDataTable() {
  dataTable = $("#DT_load").dataTable({
    ajax: {
      url: "/api/book",
      type: "GET",
      dataType: "json",
    },
    columns: [
      { data: "name", width: "30%" },
      { data: "author", width: "30%" },
      { data: "isbn", width: "30%" },
      {
        data: "id",
        render: function (data) {
          return `
            <div class="text-center">
              <a
              href="/bookList/Edit?id=${data}"
              class='btn btn-success text-white'
              style='cursor:pointer; width:100px;'
              >
                Edit
              </a>
              &nbsp;
              <a
              class='btn btn-danger text-white'
              style='cursor:pointer; width:100px;'
              onclick=Delete('/api/book?id='+${data})
              >
                Delete
              </a>
            </div>
          `;
        },
        width: "30%",
      },
    ],
    language: {
      emptyTable: "no data found",
    },
    width: "100%",
  });
}

function Delete(url) {
  swal({
    titlte: "Are you sure?",
    text: "Once deleted, you will not be able to recover",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: "DELETE",
        url: url,
        success: function (data) {
          if (data.success) {
            toastr.success(data.message);
            dataTable.ajax.reload();
          } else {
            toastr.error(data.message);
          }
        },
      });
    }
  });
}
