import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/books/")
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const addBook = (id) => {
    bookList.push(id);
    console.log(bookList);
    const data = {
      bookList,
    };

    axios
      .post("http://localhost:5000/books/calc", data)
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>View Books</h2>
      <button
        onClick={() => {
          navigate("/add-books");
        }}
      >
        Add Books
      </button>
      <br />
      <br />
      <center>
        <table>
          <tr>
            <th>Book Name</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Price</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Add Book</th>
          </tr>

          {books.map((book, key) => (
            <tr key={key}>
              <td>{book.name}</td>
              <td>{book.isbn}</td>

              <td>{book.author}</td>

              <td>{book.price}</td>

              <td>{book.year}</td>
              <td>{book.publisher}</td>
              <td>
                <button
                  onClick={() => {
                    addBook(book._id);
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </table>
        <h1>Total : {total}</h1>{" "}
        <button
          onClick={() => {
            setTotal(0);
            setBookList([]);
          }}
        >
          Clear
        </button>
      </center>
    </div>
  );
}

export default ViewBooks;
