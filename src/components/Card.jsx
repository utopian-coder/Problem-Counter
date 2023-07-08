import React from "react";

const Card = ({ curr }) => {
  return (
    <div className='border border-slate-300 p-4 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 flex flex-col gap-2'>
      <h1 className='text-xl font-bold text-gray-800'>
        Solved On {curr.platform}
      </h1>
      <p>Easy - {curr.easySolved}</p>
      <p>Medium - {curr.mediumSolved}</p>
      <p className='border-b border-slate-300 pb-1'>Hard - {curr.hardSolved}</p>
      <p>Total Solved {curr.totalSolved}</p>
    </div>
  );
};

export default Card;
