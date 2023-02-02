import React, { useState } from 'react';


const IPFS_UPLOAD = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const ipfsAPI= "";

  const handleIpfsUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const buffer = await bufferFile(file);
    const ipfs = ipfsAPI('localhost', '5001');
    const results = await ipfs.files.add(buffer);
    const ipfsHash = results[0].hash;
    setIpfsHash(ipfsHash);
  };

  const bufferFile = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(Buffer.from(reader.result));
      };
      reader.onerror = reject;
    });
  };

  return (
    <div>
      <input type="file" onChange={handleIpfsUpload} />
      <p>IPFS Hash: {ipfsHash}</p>
    </div>
  );
};

export default IPFS_UPLOAD;
