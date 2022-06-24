import "./App.css";
import axios from "axios";
import { useState } from "react";

// imput style.css from

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBmEQQb59WW6Q59ReKB0qU7wio05KdpAHY"
  );

  function handleChange(event) {
    const book = event.target.value;

    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key" +
          apiKey +
          "&maxResults=40"
      )
      .then((data) => {
        // console.log(data.data);
        setResult(data.data.items);
      });
  }

  return (
    <div className="container">
      <h1>Pesquise e compre o seu livro favorito!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Pesquisar Livro"
            autoComplete="off"
          />
        </div>
        <button type="button" class="btn btn-outline-primary btn-lg">
          Search
        </button>
      </form>

      {result.map((book) => (
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img
            src={
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.smallThumbnail
            }
            alt="img"
          />
        </a>
      ))}
    </div>
  );
}

export default App;
