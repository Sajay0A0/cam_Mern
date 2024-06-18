import React from "react";
import BarLoader from "react-spinners/BarLoader";

export default function Loading() {
  return (
    <div style={{ backgroundColor: '#BB96F7', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{borderRadius:'250px'}}
         src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRjY7aaMHT59ZRfSwn2NwQ6lZzfMISinHmV89VRgUfxrpr7iUBO" alt="pic" /> <br />
      <BarLoader
        color="black"
        height={5}
        loading
        speedMultiplier={1}
        width={300}
      />
      <p style={{ textAlign: 'center', marginBottom: '10px',fontFamily:' Serif',fontSize:'900', }}>Loading...</p>

    </div>
  );
}
