import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { API_URL } from "../config";

function CourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("end_date", endDate);
    if (file) formData.append("videos", file);

    try {
      await axios.post(`${API_URL}/courses`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Course created successfully", status: "success" });
      setTitle("");
      setDescription("");
      setEndDate("");
      setFile(null);
    } catch (error) {
      console.error("Error creating course:", error);
      toast({ title: "Error creating course", status: "error" });
    }
  };

  return (
    <Box padding="4">
      <form onSubmit={handleSubmit}>
        <FormControl id="title" mb="4" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl id="description" mb="4" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="end_date" mb="4" isRequired>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="videos" mb="4" isRequired>
          <FormLabel>Upload Video</FormLabel>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Create Course
        </Button>
      </form>
    </Box>
  );
}

export default CourseForm;
