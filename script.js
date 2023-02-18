let issuedBooks = [];

const issuanceForm = document.querySelector('form');
const issuedBooksTable = document.getElementById('issued-books-table');

issuanceForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const bookName = document.getElementById('book-name').value;
  const issuedTo = document.getElementById('issued-to').value;

  const newIssuedBook = {
    id: issuedBooks.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: new Date().toLocaleString(),
    status: "Returned"
  };


  issuedBooks.push(newIssuedBook);

  issuanceForm.reset();

  renderIssuedBooksTable();
});

function renderIssuedBooksTable() {
  while (issuedBooksTable.rows.length > 1) {
    issuedBooksTable.deleteRow(1);
  }

  issuedBooks.forEach(function(book) {
//     issuedBooksTable.innerHTML+=`<tr>
//     <td>${book.id}</td>
//     <td>${book.book_name}</td>
//     <td>${book.issued_to}</td>
//     <td>${book.issued_time}</td>
//     <td contenteditable = "true">${ book.status} <img src="icons8-edit-96.png" class = "edit" alt="edit"></td>
//   </tr>`
let myarray = book.issued_time.split(",")
    const row = issuedBooksTable.insertRow(-1);
    row.insertCell(0).textContent = book.id;
    row.insertCell(1).textContent = book.book_name;
    row.insertCell(2).textContent = book.issued_to;
    row.insertCell(3).innerHTML 
     = `${myarray[0]} at ${myarray[1]} `;
     console.log(book.issued_time)
    const statusCell = row.insertCell(4);
    statusCell.innerHTML = `<span class="mystatus">${ book.status}</span>
     <img src="icons8-edit-96.png" class = "edit" alt="edit">
    `;
   
    
    statusCell.setAttribute("contenteditable", "true");
    statusCell.classList.toggle("red", book.status === "Not Returned");
    statusCell.classList.toggle("green", book.status === "Returned");
    statusCell.classList.add("Returned")

    // Listen for status cell changes
    statusCell.addEventListener('blur', function() {
      const newStatus = statusCell.textContent.trim().toLowerCase();
      if (newStatus === "returned" || newStatus === "not returned") {
        book.status = newStatus;
        statusCell.classList.toggle("red", book.status === "not returned");
        statusCell.classList.toggle("green", book.status === "returned");
      } else {
        statusCell.textContent = book.status;
      }
    });
  });
}
// // var img = document.querySelector(".edit")
// var mystatus = document.querySelector(".mystatus")
// // // img.addEventListener('click',function(){
// // //   mystatus.classList.add("hide")
// // //   statusCell.innerHTML = `<input class = "mystatus" type="text">
// // //   <img src="icons8-edit-96.png" class = "edit" alt="edit">
// //  `;  
// })