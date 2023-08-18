import React, { useState } from "react";
import {
  FormControl,
  Input,
  Text,
  HStack,
  Box,
  Spacer,
} from "@chakra-ui/react";

import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

export default function ImageUploader({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("No Selected file");

  const handleImageUpload = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setFileName(e.target.files[0].name);
    onImageUpload(e.target.files[0]);
  };

  return (
    <>
      <FormControl
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        border={"2px dashed"}
        borderRadius={"5px"}
        h={"300px"}
        cursor={"pointer"}
        onClick={() => document.querySelector(".input-field").click()}
      >
        {/* <FormLabel>Upload Image</FormLabel> */}
        <Input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={handleImageUpload}
        />
        {selectedImage ? (
          <img src={selectedImage} style={{maxHeight:280}} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <Text>Upload a cover image for your book.</Text>
            <Text>
              File Format <b>jpeg, png</b>
            </Text>
          </>
        )}
        
      </FormControl>
      <HStack bgColor={"gray.300"} p={2} borderRadius={5}>
        <AiFillFileImage color="#1475cf" />
        <Spacer />
        <Box display={"Flex"} gap={5} alignItems={"Center"}>
          {fileName}
          <MdDelete
            cursor={"pointer"}
            onClick={() => {
              setFileName("No Selected file");
              setSelectedImage(null);
            }}
          />
        </Box>
      </HStack>
    </>
  );
}
