import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FBF6F4",
    },
    "&:hover fieldset": {
      borderColor: "#FBF6F4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FBF6F4",
    },
  },
  "& .MuiInputBase-input": {
    color: "#FBF6F4",
  },
  "& .MuiInputLabel-root": {
    color: "#FBF6F4",
  },
}));

const App: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    dob: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [userAge, setUserAge] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async () => {
    const age = calculateAge(formState.dob);
    setUserAge(age);

    if (age < 22 || age > 50) {
      setError("Age must be between 22 and 50.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth", {
        name: formState.name,
        password: formState.password,
      });
      if (response.data.success) {
        setAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  if (authenticated && userAge !== null) {
    return (
      <Container>
        <Typography variant="h5">Welcome, {formState.name}!</Typography>
        <Typography variant="body2">Your age is: {userAge}</Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        position: "absolute",
        top: "52%",
        left: "52%",
        transform: "translate(-48%, -50%)",
        background: "var(--color1)",
        color: "#FBF6F4",
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        border: `3px solid var(--color2)`,
        boxShadow: "2 8px 32px 0 rgba(31, 38, 135, 0.37)",
        padding: "22px",
      }}
      maxWidth="sm"
    >
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <CssTextField
        name="name"
        label="Username"
        fullWidth
        margin="normal"
        value={formState.name}
        onChange={handleInputChange}
      />
      <CssTextField
        name="dob"
        label="Date of Birth"
        type="date"
        fullWidth
        margin="normal"
        value={formState.dob}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
      />
      <CssTextField
        name="password"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formState.password}
        onChange={handleInputChange}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FBF6F4",
          padding: "12px 20px",
          color: "var(--color3)",
          marginTop: "16px",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default App;
