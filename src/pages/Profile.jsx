import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import Card from "../components/Card";

const Profile = () => {
  const { usernames } = useContext(UserContext);
  const [platformwiseUserData, setPlatformwiseUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = [];

        if (usernames?.leetcode) {
          const { data } = await axios.get(
            `https://leetcode-stats-api.herokuapp.com/${usernames.leetcode}`
          );

          const { totalSolved, easySolved, mediumSolved, hardSolved } = data;
          const user = {
            platform: "Leetcode",
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
          };
          newData.push(user);
        }

        if (usernames?.codeforces) {
          const { data } = await axios.get(
            `https://codeforces.com/api/user.status?handle=${usernames.codeforces}`
          );

          if (data.status !== "OK") {
            setError("User doesn't exist");
            return;
          }

          const solved = new Set();
          const res = data.result;

          for (let i = 0; i < res.length; i++) {
            const submission = res[i];
            const { verdict } = submission;
            const { name, rating } = submission.problem;

            if (verdict !== "OK" || rating === undefined) continue;

            const successfulSub = JSON.stringify({
              name,
              rating,
            });

            solved.add(successfulSub);
          }

          let easySolved = 0,
            mediumSolved = 0,
            hardSolved = 0,
            totalSolved = 0;

          for (const currSubmission of solved) {
            const { rating } = JSON.parse(currSubmission);

            totalSolved++;

            if (+rating >= 1400) hardSolved++;
            else if (+rating >= 1000) mediumSolved++;
            else easySolved++;
          }

          const user = {
            platform: "Codeforces",
            easySolved,
            hardSolved,
            mediumSolved,
            totalSolved,
          };
          newData.push(user);
        }

        setPlatformwiseUserData(newData);
      } catch (error) {
        setError("An error occurred");
      }
    };

    fetchData();
  }, [usernames]);

  return (
    <section className='grid grid-cols-1 mt-6 md:grid-cols-2 gap-4'>
      {platformwiseUserData.length > 0 &&
        platformwiseUserData.map((curr) => (
          <Card key={curr.platform} curr={curr} />
        ))}
    </section>
  );
};

export default Profile;
