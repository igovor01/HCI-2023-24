import navbarCollectionResponse from "../../types/interfaces/NavbarCollectionResponse";
import qGetAllNavbarNames from "../../types/queries/GetAllNavbarNames";
import qGetAllBooks from "../../types/queries/GetAllBooks";
import booksCollectionResponse from "../../types/interfaces/BooksCollectionResponse";

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

const getAllBooks = async (searchTerm: string) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query: qGetAllBooks(searchTerm) }),
    });

    const body = (await response.json()) as {
      data: booksCollectionResponse;
    };
    console.log(body.data);

    const books = body.data.booksCollection.items.map((item) => ({
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

const ContentfulService = {
  getAllNavbarNames,
  getAllBooks,
};

export default ContentfulService;
