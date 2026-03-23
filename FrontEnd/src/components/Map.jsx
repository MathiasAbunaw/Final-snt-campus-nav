//react-leaflet gives us the pre build react map components 

//Mapcontainer is the outler layer that helps contains the map information 

//Tilelayer is what alls the map layer components to be showed or printed.

//Marker alls up input the coordinate of the building such as toomey hall and etc 

//while the popup is used inorder to print the building name

import { MapContainer, TileLayer, Marker, Popup }  from "react-leaflet"



//Leaflets need it own css inorder to style it owns map AKA basically the default styles
//Without this the map will look broken by the zoom and other components being disorganized 
import 'leaflet/dist/leaflet.css'

function Map(){
    return(
        //MapContainer contains the maps
        //the center is the location we would like the map to focus on. AKA the coordidate of missouri S&T
        //16 zoom is how close we start off
        //styles allows us to manage the how long and wide we would like the map to take over the whole screen
        <MapContainer 
        center={[37.954415, -91.774075]}
        zoom={16}
        style={{height: "100vh", width: "100%" }}
        
        > 
        <TileLayer
        //Tileslayer allows use to show the images of the maps
        // the url is a template — {s}, {z}, {x}, {y} get replaced automatically
        // with the right values to load whichever part of the map you're looking at

        //attribute just gives the creddit to openstreetmaps 

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //this changes the s z x y corridinate depending on where you are looking at which is they they are empthy

        attribution="© OpenStreetMap contributors"

        
        />
        <Marker 
        position = {[37.9516, -91.7654]} //This includes the coordinate of the position of the marker like building such as toomey hall
        >
            <Popup>Toomey Hall</Popup>
        </Marker>

        <Marker 
        position = {[37.9508, -91.7682]} //This includes the coordinate of the position of the marker like building such as toomey hall
        >
            <Popup>Curtis Laws Wilson Library</Popup>
        </Marker>

        <Marker 
        position = {[37.9501, -91.7663]} //This includes the coordinate of the position of the marker like building such as toomey hall
        >
            <Popup>Butler-Carlton Hall</Popup>
        </Marker>

        <Marker 
        position = {[37.9494, -91.7691]} //This includes the coordinate of the position of the marker like building such as toomey hall
        >
            <Popup>Schrenk Hall</Popup>
        </Marker>

        <Marker 
        position = {[37.9520, -91.7678]} //This includes the coordinate of the position of the marker like building such as toomey hall
        >
            <Popup>Castleman Hall</Popup>
        </Marker>

        
        </MapContainer>

        
    )
}
export default Map 
//this allows app.jsx to be able to use this components and maps
