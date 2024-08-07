import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SPECIAL_AUTH_FOR_TEACHER = import.meta.env.VITE_SPECIAL_AUTH_FOR_TEACHER;
console.log("from signup.jsx", SPECIAL_AUTH_FOR_TEACHER); // for checking

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
    course: "", // Single course for students
    batch: "", // Single batch for students
    courses: [], // Multiple courses for teachers
    batches: [], // Multiple batches for teachers
    specialKey: "", // Special key for teachers
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
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen p-4 md:p-8">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2 block">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full input input-bordered h-10"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 block">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label block">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="min 6 length"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label block">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <div>
            <label className="label block">
              <span className="text-base label-text">Gender</span>
            </label>
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />
          </div>

          <div>
            <label className="label block">
              <span className="text-base label-text">Role</span>
            </label>
            <select
              className="w-full input input-bordered h-10"
              value={inputs.role}
              onChange={handleRoleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {inputs.role === "student" && (
            <>
              <div>
                <label className="label block">
                  <span className="text-base label-text">Course</span>
                </label>
                <select
                  className="w-full input input-bordered h-10"
                  value={inputs.course}
                  onChange={handleCourseChange}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label block">
                  <span className="text-base label-text">Batch</span>
                </label>
                <select
                  className="w-full input input-bordered h-10"
                  value={inputs.batch}
                  onChange={handleBatchChange}
                >
                  <option value="">Select a batch</option>
                  {batches.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {inputs.role === "teacher" && (
            <>
              <div>
                <label className="label block">
                  <span className="text-base label-text">Courses</span>
                </label>
                {courses.map((course) => (
                  <div key={course}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={course}
                        checked={inputs.courses.includes(course)}
                        onChange={handleCoursesChange}
                        className="mr-2"
                      />
                      {course}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="label block">
                  <span className="text-base label-text">Batches</span>
                </label>
                {batches.map((batch) => (
                  <div key={batch}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={batch}
                        checked={inputs.batches.includes(batch)}
                        onChange={handleBatchesChange}
                        className="mr-2"
                      />
                      {batch}
                    </label>
                  </div>
                ))}
              </div>

              <div>
                <label className="label block">
                  <span className="text-base label-text">Special Key</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter special key"
                  className="w-full input input-bordered h-10"
                  value={inputs.specialKey}
                  onChange={handleSpecialKeyChange}
                />
              </div>
            </>
          )}

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
