import navbarCollectionResponse from "../../types/interfaces/NavbarCollectionResponse";
import qGetAllNavbarNames from "../../types/queries/GetAllNavbarNames";
import booksCollectionResponse from "../../types/interfaces/BooksCollectionResponse";
import qGetNewBooks from "../../types/queries/GetNewBooks";
import qGetBookById from "../../types/queries/GetBookById";
import qGetBooksByTitle from "../../types/queries/GetBooksByTitle";
import BookItem from "../../types/interfaces/BookItem";

const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

const getAllNavbarNames = async () => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetAllNavbarNames }),
    });

    const body = (await response.json()) as {
      data: navbarCollectionResponse;
    };

    const navbarNames = body.data.navbarCollection.items.map((item) => ({
      title: item.title,
      path: item.path,
      dropdowns: item.dropdowns.map((dropdown) => dropdown),
    }));

    return navbarNames;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getBooksByTitle = async (searchTerm: string) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetBooksByTitle(searchTerm) }),
    });

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };

    const books = body.data.booksCollection.items.map((item) => ({
      bookId: item.bookId,
      title: item.title,
      author: item.author,
      description: item.description,
      cover: item.cover,
    }));

    return books;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getNewBooks = async () => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetNewBooks }),
    });

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };
    console.log(body.data);

    const books = body.data.booksCollection.items.map((item) => ({
      bookId: item.bookId,
      title: item.title,
      author: item.author,
      description: item.description,
      cover: item.cover,
    }));

    return books;
  } catch (error) {
    console.log(error);

    return [];
  }
};

const getBookById = async (bookId: string) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetBookById(bookId) }),
    });

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };

    console.log(body);

    const books = body.data.booksCollection.items.map((item) => ({
      bookId: item.bookId,
      title: item.title,
      author: item.author,
      description: item.description,
      cover: item.cover,
    }));

    return books[0];
  } catch (error) {
    console.log(error);

    return [];
  }
};

const ContentfulService = {
  getAllNavbarNames,
  getBooksByTitle,
  getNewBooks,
  getBookById,
};

export default ContentfulService;