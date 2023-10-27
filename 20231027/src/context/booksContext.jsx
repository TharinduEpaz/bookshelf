import { createContext,useContext,useReducer,useEffect } from "react";
import axios from "axios";
const allBooksUrl = 'http://localhost:3000/api/v1/books/'
const singleBookUrl = 'http://localhost:3000/api/v1/books/'

const booksContext = createContext();

const initialState = {
    books: [],
    isLoading: false,
    error: null,
    currentBook: null 
}

const bookReducer = (state,action) => {
    switch(action.type) {
        case 'FETCH_BOOKS_BEGIN':
            return {
                ...state,
                isLoading: true,
            }
        
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                books: action.payload
            }
        case 'FETCH_SINGLE_BOOK_SUCCESS':
            return {
                ...state,
                isLoading: false,
                currentBook: action.payload
            }
    }
}

export const BooksProvider = ({ children }) => {
    const [state,dispatch] = useReducer(bookReducer,initialState);

    const fetchBooks = async () => {
        try {
            
        dispatch({type: 'FETCH_BOOKS_BEGIN'});
        const response = await axios.get(allBooksUrl);
        dispatch({type: 'FETCH_BOOKS_SUCCESS', payload: response.data});
        console.log(response.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchSingleBook = async (id) => {
        try {
            dispatch({type: 'FETCH_BOOKS_BEGIN'});
            const response = await axios.get(singleBookUrl + id);
            dispatch({type: 'FETCH_SINGLE_BOOK_SUCCESS', payload: response.data});
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchBooks();
    }
    ,[])

    return (
        <booksContext.Provider value={{...state,fetchSingleBook}}>
            {children}
        </booksContext.Provider>
    )
}


export const useBooksContext = () => {
    return useContext(booksContext);
}



