//react-leaflet gives us the pre build react map components 

//Mapcontainer is the outler layer that helps contains the map information 

//Tilelayer is what alls the map layer components to be showed or printed.

//Marker alls up input the coordinate of the building such as toomey hall and etc 

//while the popup is used inorder to print the building name

import { MapContainer, TileLayer, Marker, Popup, Polyline }  from "react-leaflet"
import { useState } from "react" //This will allow us to be able to be able to store data like coordinates that react can will use and automatically update



//Leaflets need it own css inorder to style it owns map AKA basically the default styles
//Without this the map will look broken by the zoom and other components being disorganized 
import 'leaflet/dist/leaflet.css'

function Map(){
    const [route, setRoute] = useState([]) //creates a function that stores the coordinate of the rout of nodes into rout and setRoute is the second variable use to update the next destination of the node

    const [startPoint, setStartPoint] = useState(null) //this creates a function that stores the startPoint which is the first building clicked and null is used because we want nothing to be stored yet

    const [endPoint, setEndPoint] = useState(null) //this creates a function that stores the endPoint which is the second building to be clicked and null is used because we want nothing to be stored yet
 

     //This created a function called fetRoute that accept the 4 paremeter of the start and end coordinate and async tell javascript to wait for the coordinate in the backend without feezing the app
    const fetchRoute = async(startLat, startLng, endLat, endLng) => {
        //fetch sends a requestion FASTAPI backend. await basically tell javascript to wait here until the backend responds with the coordinates. ${} is how javascript but variables inside string like f'' in python
        const response = await fetch( //This is used inorder for react to send the coordate to FastAPI through the URL 
            `http://127.0.0.1:8000/route?start_lat=${startLat}&start_lng=${startLng}&end_lat=${endLat}&end_lng=${endLng}`
        )
        const data = await response.json() //the fetch is called it pulls the raw text of the coordinate so this line convert it to javascript object so we can use it. await is used because converting it takes time
        setRoute(data.route) //this will update route with the new coordinates the backend just provided. when react sees route change the polyline we automatically start redrawing
    }

    const handleMarkerClick = (lat, lng) => {
        //If their is no startPoint yet then set this coordinate as the start point 

        if(startPoint === null){
            setStartPoint([lat, lng])
        }
        //else if their is no endPoint then set this coordinates as the end point
        else if(endPoint === null){
            setEndPoint([lat, lng])
            fetchRoute(startPoint[0], startPoint[1], lat, lng) //this should call the fetchroute function when we have both the setstart point and setend poiny
        }
        //Else if both point already exist then we want it to reset both the start and endpoint as well the the setRoutes 
        else{
            setStartPoint([lat, lng])
            setEndPoint(null)
            setRoute([])
        }
    }
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

        //This just creates marker which are point on the map such as the building names
        />
        <Marker

            position = {[37.95467956409968, -91.77403226565306]} //This includes the coordinate of the position of the marker like building such as toomey hall
            
    //this is react leaflet markers have eventHandles so they listen for evens on the mark. in this case we will a case for a click even that when clicked it calls handleMarket with the building coordinates to use it
            eventHandlers={{
                click: () => handleMarkerClick(37.95467956409968, -91.77403226565306) 
            }}
        >
            <Popup>Toomey Hall</Popup>
        </Marker>

        <Marker 
            position = {[37.95555953595066, -91.77354098951726]} //This includes the coordinate of the position of the marker like building such as toomey hall
            eventHandlers={{
                click: () => handleMarkerClick(37.95555953595066, -91.77354098951726) 
            }}
        >
            <Popup>Curtis Laws Wilson Library</Popup>
        </Marker>

        <Marker 
            position = {[37.95566105058601, -91.77200676595298]} //This includes the coordinate of the position of the marker like building such as toomey hall
            eventHandlers={{
                click: () => handleMarkerClick(37.95566105058601, -91.77200676595298) 
            }}
        >
            <Popup>Butler-Carlton Hall</Popup>
        </Marker>

        <Marker 
            position = {[37.95290419072032, -91.77409662144312]} //This includes the coordinate of the position of the marker like building such as toomey hall
            eventHandlers={{
                click: () => handleMarkerClick(37.95290419072032, -91.77409662144312) 
            }}
        >
            <Popup>Schrenk Hall</Popup>
        </Marker>

        <Marker 
            position = {[37.95194358412681, -91.77424939108371]} //This includes the coordinate of the position of the marker like building such as toomey hall
             eventHandlers={{
                click: () => handleMarkerClick(37.95194358412681, -91.77424939108371) 
            }}
        >
            <Popup>Castleman Hall</Popup>
        </Marker>
        <Marker 
            position = {[37.953652783424275, -91.773003904139]} //This includes the coordinate of the position of the marker like building such as toomey hall
             eventHandlers={{
                click: () => handleMarkerClick(37.953652783424275, -91.773003904139) 
            }}
        >
            <Popup>Norwood hall</Popup>
        </Marker>


        {route.length > 0 && ( //only draws a line if we have received a coordinate from the backend and if that a true
            <Polyline positions = {route} //give Polyline the coordinetes from route which is usestate memory
            color = "blue" /> //  draw a blue line using the coordinate ir route
        )}

        </MapContainer>

        

    )
}
export default Map 
//this allows app.jsx to be able to use this components and maps
