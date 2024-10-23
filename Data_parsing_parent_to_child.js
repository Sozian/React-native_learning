import React, { useState } from 'react';

// Grandchild component
const GrandChild = ({ info }) => {
  // Define a function to handle the info
  const handleInfo = () => {
    // You can process or log the info here
    console.log(`Message: ${info.message}, Status: ${info.isActive ? 'Active' : 'Inactive'}`);
    // Return any value if needed
    return info.isActive ? 'The status is Active' : 'The status is Inactive';
  };

  // Call the function (e.g., when the component mounts or based on some condition)
  const statusMessage = handleInfo();

  return (
    <div>
      <h2>GrandChild</h2>
      {/* You can choose to display statusMessage if needed */}
      <p>{statusMessage}</p>
    </div>
  );
};

// Child component
const Child = ({ info }) => {
  return (
    <div>
      <h2>Child</h2>
      <GrandChild info={info} />
    </div>
  );
};

// Parent component (App)
const App = () => {
  const [info, setInfo] = useState({ message: 'Hello from Parent!', isActive: false });

  const handleClick = () => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      isActive: true, // Set isActive to true on button click
    }));
  };

  return (
    <div>
      <h1>Parent</h1>
      <button onClick={handleClick}>Set Active Status</button>
      <Child info={info} />
    </div>
  );
};

export default App;
