import {
  Heading,
  Link,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import React from "react";

function CategoryFilter() {
  const [category, setCategory] = React.useState("");
  const [language, setLanguage] = React.useState("");
  return (
    <UnorderedList styleType={"none"} m={5}>
      <ListItem fontWeight={"bold"} mb={5}>
        Category
      </ListItem>
      <ListItem>
        <UnorderedList styleType={"none"} fontSize={"sm"}>
          <ListItem>
            <Button variant={"link"} mt={2} 
            onClick={() => setCategory("Best Sellers")}
            >
              Best Sellers
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Self Help and Development")}
            >
              Self Help and Development
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Philosophy")}
            >
              Philosophy
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Arts and Photography")}
            >
              Arts and Photography
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Health and Fitness")}
            >
              Health and Fitness
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Romance")}
            >
              Romance
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Sports")}
            >
              Sports
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Business & Economy")}
            >
              Business & Economy
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Collections")}
            >
              Collections
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Fiction")}
            >
              Fiction
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setCategory("Science Fiction")}
            >
              Science Fiction
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
            >
              English
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            onClick={() => setLanguage("Sinhala")}
            >
              Sinhala
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}
            
            onClick={() => setLanguage("Tamil")}
            >
              Tamil
            </Button>
          </ListItem>
          <ListItem>
            <Button variant={"link"} mt={2}>
              Other
            </Button>
          </ListItem>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  );
}

export default CategoryFilter;
