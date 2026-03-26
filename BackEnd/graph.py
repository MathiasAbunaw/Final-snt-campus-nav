import osmnx as ox
import json
import os
def load_graph():#created to return G so other files can use it like the route.py file inorder to calculate the shortest route
    #Download S&T campus walkway netwrok from openstreetMap

    #network_type= 'walk' means we only want pedestrians paths not the driveable ones 

    #retain_all = True - keeps all paths including small ones

    G = ox.graph_from_point(
    (37.9508, -91.7682),  # center of S&T campus
    dist=800,              # 500 meters in every direction
    network_type='walk',
    retain_all=True
)

    print("campus graph loaded completed")
    print(f'Nodes: {len(G.nodes)}') #this wll the the length of how many different node aka point on the graph. For example imagen that every corners on maps are represented as nodes and edges can only be straight so nodes points
    print(f'Endges: {len(G.edges)}') #This will be the length of how many different edges their are. Edges are straight paths that connects from node to node

    #This allows us to open the geojson file no matter which direcotry it is living in
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    shortcuts_path = os.path.join(BASE_DIR, "shortcuts.geojson")
    #this all allow us to open and read the shortcut file we created 
    with open(shortcuts_path) as f:
        shortcuts = json.load(f)

    #this for loop is used inorder to looped through all of the feature key within the json file and find all the shortcuts and then add them as new edges that can be used within the graph 
    for feature in shortcuts["features"]:
        coords = feature["geometry"]["coordinates"]

        #get the start and end coordinate of the short cut

        start = coords[0] #this will get the start coordinate within the shortcut json file with its [longitude, latitude]
        end = coords[-1] #this will get the end coordinate within the shortcut json file with it [longitude, latitude]
        

        #This will find the nearest existing nodes in the graph to connect the new edges we just created too
        start_node = ox.nearest_nodes(G, start[0], start[1]) #This will connect the start edge to the closest node we can find
        end_node = ox.nearest_nodes(G, end[0], end[1]) #this will connect the end edge with the closest node we can find
        
        #This will add the new shortcut as a new edges between those nodes

        G.add_edge(start_node, end_node, name=feature["properties"]["name"], shortcut= True)

    print("Shortcuts stitched into graph successfully!")

    return G
