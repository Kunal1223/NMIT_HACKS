import NGOContext from './NGOContext';
import { useState} from 'react';

export default function NGOState(props) {
  const host = 'http://localhost:5000';
  const NGOInitial = [];


  const [NGO, setNGO] = useState(NGOInitial);

  // Function to fetch NGOs related to a specific email
  const getNGO = async (email) => {
    try {
      const response = await fetch(`${host}/api/auth/ngo/fetchallngo?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch NGOs: ${response.statusText}`);
      }

      const json = await response.json();
      setNGO(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NGOContext.Provider value={{ getNGO, NGO }}>
      {props.children}
    </NGOContext.Provider>
  );
}
