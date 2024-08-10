import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, FormGroup, Typography, Container, Box, Avatar } from '@mui/material';
import useSignup from '../../hooks/useSignup';
import Logo from '../../../../frontend/public/smit.png'; // Ensure you have a logo or use a placeholder

const courses = [
  "Graphics Designing",
  "Web and App Development",
  "Tecno Kids",
  "UI UX Designing",
  "Generative AI & Chatbox",
  "Digital Marketing",
  "Amazon Mastery",
];

const batches = [
  "Batch 11",
  "Batch 12",
  "Batch 13",
  "Batch 14",
  "Batch 15",
  "Batch 16",
  "Batch 17",
];

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "student",
    course: "",
    batch: "",
    courses: [],
    batches: [],
    specialKey: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleRoleChange = (e) => {
    setInputs({
      ...inputs,
      role: e.target.value,
      course: "",
      batch: "",
      courses: [],
      batches: [],
      specialKey: "",
    });
  };

  const handleCourseChange = (e) => {
    setInputs({ ...inputs, course: e.target.value });
  };

  const handleBatchChange = (e) => {
    setInputs({ ...inputs, batch: e.target.value });
  };

  const handleCoursesChange = (e) => {
    const { value, checked } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      courses: checked
        ? [...prevInputs.courses, value]
        : prevInputs.courses.filter(course => course !== value),
    }));
  };

  const handleBatchesChange = (e) => {
    const { value, checked } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      batches: checked
        ? [...prevInputs.batches, value]
        : prevInputs.batches.filter(batch => batch !== value),
    }));
  };

  const handleSpecialKeyChange = (e) => {
    setInputs({ ...inputs, specialKey: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", inputs); // Debugging log
    await signup(inputs);
  };

  return (
    <Container component="main" maxWidth="xs" className='signup-container'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 7,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: 'white',
        }}
      >
        <Avatar
          src={Logo}
          alt="Logo"
          sx={{ width: 190, height: 110, mb: 2 ,borderRadius:0}}
        />
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up <span style={{ color: '#3b71ca' }}>ChatApp</span>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <Typography variant="body1">Gender</Typography>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={inputs.gender === 'male'} onChange={() => handleCheckboxChange('male')} />}
                label="Male"
              />
              <FormControlLabel
                control={<Checkbox checked={inputs.gender === 'female'} onChange={() => handleCheckboxChange('female')} />}
                label="Female"
              />
            </FormGroup>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={inputs.role}
              onChange={handleRoleChange}
              label="Role"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>

          {inputs.role === "student" && (
            <>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Course</InputLabel>
                <Select
                  value={inputs.course}
                  onChange={handleCourseChange}
                  label="Course"
                >
                  <MenuItem value="">Select a course</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel>Batch</InputLabel>
                <Select
                  value={inputs.batch}
                  onChange={handleBatchChange}
                  label="Batch"
                >
                  <MenuItem value="">Select a batch</MenuItem>
                  {batches.map((batch) => (
                    <MenuItem key={batch} value={batch}>
                      {batch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {inputs.role === "teacher" && (
            <>
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <Typography variant="body1">Courses</Typography>
                {courses.map((course) => (
                  <FormControlLabel
                    key={course}
                    control={
                      <Checkbox
                        value={course}
                        checked={inputs.courses.includes(course)}
                        onChange={handleCoursesChange}
                      />
                    }
                    label={course}
                  />
                ))}
              </FormControl>

              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <Typography variant="body1">Batches</Typography>
                {batches.map((batch) => (
                  <FormControlLabel
                    key={batch}
                    control={
                      <Checkbox
                        value={batch}
                        checked={inputs.batches.includes(batch)}
                        onChange={handleBatchesChange}
                      />
                    }
                    label={batch}
                  />
                ))}
              </FormControl>

              <TextField
                label="Special Key"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={inputs.specialKey}
                onChange={handleSpecialKeyChange}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#3b71ca' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
