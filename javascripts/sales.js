const datatable = $("#datatable");//id for tbody

function render(doc) {
    datatable.append(`<tr id="${doc.id}">
    <td><a class="btn btn-sm btn-danger" name="delete" href ="javascript:void(0)" id="${doc.id}">Delete</a></td>
    <td>${doc.data().title}</td>

    <td>${doc.id}</td>
    <td>${doc.data().date}</td>
    <td class="fw-bold" style="color:white;background-color: #a4cbeb">Php ${parseFloat(doc.data().selling_price).toFixed(2)}</td>
    <td class="fw-bold" style="color:white; background-color: #7ca8cc">${doc.data().quantity_sold} pcs</td>
    <td class="fw-bold" style="color:white; background-color: #5584ab">Php ${parseFloat(doc.data().sum).toFixed(2)}</td>
    </tr>`)

    $("[name = 'delete']").click((e) => {
        e.stopImmediatePropagation();
        var id = e.target.id;
        db.collection('sales').doc(id).delete();
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Order deleted!',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

//real time rendering of data
db.collection('sales').orderBy('date').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc);
        } else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();
        }
        else if (change.type == "modified") {
            var id = change.doc.id;
            $('#' + id).remove();
            render(change.doc);
        }
    })
})

$(function () {
    var $chk = $("#grpChkBox input:checkbox");
    var $tbl = $("#myTable");
    var $tblhead = $("#myTable td");

    $chk.prop('checked', true);

    $chk.click(function () {
        var colToHide = $tblhead.filter("." + $(this).attr("name"));
        var index = $(colToHide).index();
        $tbl.find('tr :nth-child(' + (index + 1) + ')').toggle();
    });

    $("#_all").click(function () {
        $tbl.toggle();
        
    })
});
