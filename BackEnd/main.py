from fastapi import FastAPI
import osmnx as ox

#This is used to creat FastAPI app instance 

app = FastAPI()

#a testing endpoint to see if the message will be return to the react app file website 

@app.get("/")
def read_root():
    return{"message": "S&T Campus Nav API is running"}

#Download S&T campus walkway netwrok from openstreetMap

#network_type= 'walk' means we only want pedestrians paths not the driveable ones 

#retain_all = True - keeps all paths including small ones

G = ox.graph_from_place("Missouri University of Science and Technology, Rolla, Missouri", network_type = 'walk', retain_all = True)

print("campus graph loaded completed")
print(f'Nodes: {len(G.nodes)}') #this wll the the length of how many different node aka building are within S&T
print(f'Endges: {len(G.edges)}') #This will het the length of how many different edges their are

