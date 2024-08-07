import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError(""); // Clear any previous errors
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className='mb-4 text-red-500 text-center'>
              {error}
            </div>
          )}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='Enter email'
              className='w-full input input-bordered h-10'
              aria-label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              aria-label='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to='/signup'
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              type='submit'
              className='btn btn-block btn-sm mt-2'
              disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
