import { useState } from "react";
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

function EditDeleteCourse({ course }: { course: any }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [endDate, setEndDate] = useState(course.end_date);
  const toast = useToast();

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/courses/${course.id}`, {
        title,
        description,
        end_date: endDate,
      });
      toast({ title: "Course updated successfully", status: "success" });
    } catch (error) {
      console.error("Error updating course:", error);
      toast({ title: "Error updating course", status: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/courses/${course.id}`);
      toast({ title: "Course deleted successfully", status: "success" });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({ title: "Error deleting course", status: "error" });
    }
  }

  return (
    <Box padding="4" border="1px solid" borderRadius="md">
      <FormControl id="title" mb="4">
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl id="description" mb="4">
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl id="end_date" mb="4">
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" onClick={handleUpdate} mr="2">
        Update
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
}

export default EditDeleteCourse;
