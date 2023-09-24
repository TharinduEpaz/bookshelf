import { createContext, useContext, useReducer, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const booksContext = createContext();

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  currentBook: null,
  booksCount: null,
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_BEGIN":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };
    case "FETCH_SINGLE_BOOK_SUCCESS":
      return {
        ...state,
        isLoading: false,
        currentBook: action.payload,
      };
    
  }
};

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  async function fetchBooks(page = 1) {
    try {
      dispatch({ type: "FETCH_BOOKS_BEGIN" });
      const response = await axiosInstance.get(`books/paginated?page=${page}&limit=12`);
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data.result });
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      dispatch({ type: "FETCH_BOOKS_BEGIN" });
      const response = await axiosInstance.get('books');
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBooksCount = async () => {
    try {
      const response = await axiosInstance.get('books');
      console.log(response);
      return response.data.length;
      
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSingleBook = async (id) => {
    try {
      dispatch({ type: "FETCH_BOOKS_BEGIN" });
      const response = await axiosInstance.get('/books/' + id);
      dispatch({ type: "FETCH_SINGLE_BOOK_SUCCESS", payload: response.data });
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchedBooks = async (searchTerm) => {
    try {
      dispatch({ type: "FETCH_BOOKS_BEGIN" });
      const response = await axiosInstance.post(
        '/searchBooks',
        {
          title: searchTerm,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchFilteredBooks = async (genre) => {
    try {
      dispatch({ type: "FETCH_BOOKS_BEGIN" });
      const response = await axiosInstance.post(
        '/filterBooks',
        {
          genre: genre,
        }
      );
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
    


  useEffect(() => {
    fetchBooks();
  }, [initialState]);

  return (
    <booksContext.Provider
      value={{ ...state, fetchSingleBook, fetchSearchedBooks,fetchFilteredBooks,fetchBooksCount,fetchBooks }}
    >
      {children}
    </booksContext.Provider>
  );
};

export const useBooksContext = () => {
  return useContext(booksContext);
};
