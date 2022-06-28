import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBooks() {
  const [authorsList, setAuthorsList] = useState([]);
  const [name, setName] = useState("");
  const [isbn, setisbn] = useState("");
  const [author, setauthor] = useState("");
  const [price, setprice] = useState("");
  const [year, setyear] = useState("");
  const [publisher, setpublisher] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      name,
      isbn,
      author,
      price,
      year,
      publisher,
    };

    axios
      .post("http://localhost:5000/books/add", newBook)
      .then((res) => {
        console.log(res.data);
        navigate("/view-books");
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/author")
      .then((res) => {
        setAuthorsList(res.data.authors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h2>Add Book</h2>
      <button
        onClick={() => {
          navigate("/view-books");
        }}
      >
        View Books
      </button>
      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <label>Book Name</label>
        <input
          type="text"
          name="name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <br />
        <label>ISBN</label>
        <input
          type="number"
          name="isbn"
          required
          onChange={(e) => {
            setisbn(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Select Author</label>
        <select
          name="authors"
          id="author"
          onChange={(e) => {
            setauthor(e.target.value);
          }}
          required
        >
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          {authorsList.map((author, key) => (
            <option value={author.firstName + " " + author.lastName} key={key}>
              {author.firstName + " " + author.lastName}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>Price</label>
        <input
          type="number"
          name="price"
          required
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Year</label>
        <input
          type="number"
          name="year"
          required
          onChange={(e) => {
            setyear(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Publisher</label>
        <input
          type="text"
          name="publisher"
          required
          onChange={(e) => {
            setpublisher(e.target.value);
          }}
        />
        <br />
        <br />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBooks;
