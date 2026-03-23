let dataList = [];

// Add row
$("#btnAdd").on("click", function () {
    let v1 = $("#txt1").val();
    let v2 = $("#txt2").val();
    let v3 = $("#txt3").val();

    if (!v1 || !v2 || !v3) {
        alert("All fields are required");
        return;
    }

    dataList.push({ value1: v1, value2: v2, value3: v3 });
    renderGrid();
    clearInputs();
});

// Render table
function renderGrid() {
    $("#gridBody").empty();

    $.each(dataList, function (index, item) {
        $("#gridBody").append(`
            <tr>
                <td contenteditable="true">${item.value1}</td>
                <td contenteditable="true">${item.value2}</td>
                <td contenteditable="true">${item.value3}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteRow(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `);
    });
}

// Delete row
function deleteRow(index) {
    dataList.splice(index, 1);
    renderGrid();
}

// Clear inputs
function clearInputs() {
    $("#txt1, #txt2, #txt3").val("");
}

// Submit JSON
$("#btnSubmit").on("click", function () {
    let finalJson = [];

    $("#gridBody tr").each(function () {
        let cols = $(this).find("td");
        finalJson.push({
            value1: cols.eq(0).text(),
            value2: cols.eq(1).text(),
            value3: cols.eq(2).text()
        });
    });

    alert(JSON.stringify(finalJson, null, 2));
});
