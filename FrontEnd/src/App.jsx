import Map from "./components/Map" //needed inorder to run the Map javascript page

function App() { //Just a standard javascript function
  return ( //inorder for anything to show up on the script it need to be return
    <div>
      <h1>S&T Campus Map</h1>

      <Map/>
    </div>
  )
}

export default App //inorder for other files to use the conponent within this file you will need this at the end of your file

//Same structure: define, return