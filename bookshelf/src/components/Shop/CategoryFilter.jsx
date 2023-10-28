import {
  Heading,
  Link,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useBooksContext } from "../../context/booksContext";

function CategoryFilter() {
  const { genre,setGenre, setLanguage, language } = useBooksContext();
  return (
    <UnorderedList styleType={"none"} m={5}>
      <ListItem fontWeight={"bold"} mb={5}>
        Category
      </ListItem>
      <ListItem>
        <UnorderedList styleType={"none"} fontSize={"sm"}>
         
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Self Help and Development")}
            color={genre == "Self Help and Development" ?  'black': null}
            >
              Self Help and Development
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Philosophy")}
            color={genre == "Philosophy" ?  'black': null}

            >
              Philosophy
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Arts and Photography")}
            color={genre == "Arts and Photography" ?  'black': null}
            >
              Arts and Photography
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Health and Fitness")}
            color={genre == "Health and Fitness" ?  'black': null}
            >
              Health and Fitness
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Romance")}
            color={genre == "Romance" ?  'black': null}
            >
              Romance
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Sports")}
            color={genre == "Sports" ?  'black': null}
            >
              Sports
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Business & Economy")}
            color={genre == "Business & Economy" ?  'black': null}
            >
              Business & Economy
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Collections")}
            color={genre == "Collections" ?  'black': null}
            >
              Collections
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Fiction")}
            color={genre == "Fiction" ?  'black': null}
            >
              Fiction
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setGenre("Science Fiction")}
            color={genre == "Science Fiction" ?  'black': null}
            >
              Science Fiction
            </Button>
          </ListItem>
          <ListItem>
              <Button variant={"link"} mt={5} color={'blue.600'}
              onClick={() => setGenre(0)}
              >
                Clear Category Filter
              </Button>
            </ListItem> 
        </UnorderedList>
      </ListItem>

      <ListItem fontWeight={"bold"} mb={5} mt={5}>
        Language
      </ListItem>
      <ListItem>
        <UnorderedList styleType={"none"} fontSize={"sm"}>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setLanguage("English")}
            color={language == "English" ?  'black': null}
            >
              English
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setLanguage("Sinhala")}
            color={language == "Sinhala" ?  'black': null}
            >
              Sinhala
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            
            onClick={() => setLanguage("Tamil")}
            color={language == "Tamil" ?  'black': null}
            >
              Tamil
            </Button>
          </ListItem>

          <ListItem>
              <Button variant={"link"} mt={5} color={'blue.600'}
              onClick={() => setLanguage(0)}
              >
                Clear Language Filter
              </Button>
            </ListItem> 
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  );
}

export default CategoryFilter;
