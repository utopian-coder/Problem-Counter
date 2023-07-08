import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [usernameFormState, setUsernameFormState] = useState(false);

  const changeHandler = (ev) => {
    const { checked, value } = ev.target;

    if (checked && platforms.includes(value)) return;

    if (!checked) {
      setPlatforms((prevState) => [
        ...prevState.filter((curr) => curr !== value),
      ]);
      return;
    }

    setPlatforms((prevState) => [...prevState, value]);
  };

  const platformSubmitHandler = (ev) => {
    ev.preventDefault();
    if (platforms.length > 0) setUsernameFormState(true);
    ev.target.reset();
  };

  const { setUsernames } = useContext(UserContext);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const usernameSubmitHandler = (ev) => {
    ev.preventDefault();

    const formData = new FormData(formRef.current);
    const formValues = Object.fromEntries(formData.entries());

    if (
      formValues.leetcode ||
      formValues.geeksforgeeks ||
      formValues.codeforces
    ) {
      setUsernames(formValues);
      navigate("/profile");
    }

    ev.target.reset();
  };

  return (
    <section className='mt-6 grid grid-cols-1 gap-4 p-6 md:grid-cols-2'>
      <form
        onSubmit={platformSubmitHandler}
        className='flex flex-col gap-4 border border-gray-300 rounded-md bg-gray-100 px-4 pt-8 pb-6'
      >
        <h1 className='text-2xl font-bold text-gray-700'>Choose Platforms</h1>
        <label className='flex gap-1' htmlFor='leetcode'>
          <input
            id='leetcode'
            type='checkbox'
            value='leetcode'
            onChange={changeHandler}
          />
          LeetCode
        </label>

        <label className='flex gap-1' htmlFor='codeforces'>
          <input
            id='codeforces'
            type='checkbox'
            value='codeforces'
            onChange={changeHandler}
          />
          Codeforces
        </label>

        <label className='flex gap-1' htmlFor='geeksforgeeks'>
          <input
            id='geeksforgeeks'
            type='checkbox'
            value='geeksforgeeks'
            onChange={changeHandler}
          />
          GeeksForGeeks
        </label>

        <button className='bg-cyan-600 rounded-md py-1 px-2'>Submit</button>
      </form>
      {usernameFormState && (
        <form
          ref={formRef}
          onSubmit={usernameSubmitHandler}
          className='flex flex-col gap-4 border border-gray-300 rounded-md bg-gray-100 px-4 pt-8 pb-3'
        >
          <h1 className='text-2xl font-bold text-gray-700'>Fill Usernames</h1>
          {platforms.map((curr) => (
            <label key={curr} htmlFor={curr}>
              {curr.charAt(0).toUpperCase() + curr.slice(1)}
              <input
                name={curr}
                type='text'
                className='p-1 rounded-md mx-2 border border-slate-300'
              />
            </label>
          ))}
          <button className='bg-cyan-600 rounded-md py-1 px-2'>Submit</button>
        </form>
      )}
    </section>
  );
};

export default HomePage;
