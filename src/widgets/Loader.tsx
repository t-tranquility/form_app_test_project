import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[500px]">
      <ClipLoader color="#3b82f6" loading={true} size={50} />
    </div>
  );
};

export default Loader;