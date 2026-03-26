import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) #What this do is is know python knowns to look backward when search for a file

from graph import load_graph #importing the function for load_graph to access the nodes and edges within G
import networkx as nx #inorder to use Dijkastra function to find the shortest route
import osmnx as ox
from fastapi import APIRouter #to create a mini router


G = load_graph()


router = APIRouter()
#This endpoint accepts start and end coordinates as query parameters
# React will call this URL: /route?start_lat=37.9516&start_lng=-91.7654&end_lat=37.9501&end_lng=-91.766
@router.get("/route")
def get_route(start_lat: float, start_lng: float, end_lat: float, end_lng : float ): #we declared parameter within the function because we want fastAPI to know what to check in the url so the variable name have to match 
                                                            # exactly to what we will be seeing in the url. and the : indisde function means type hint, we are telling python what to expect as the input of the parameter 

    #This will help find the nearest nodes in the graph close to the start and end coordinate
    start_node = ox.nearest_nodes(G, start_lng, start_lat)
    end_node = ox.nearest_nodes(G, end_lng, end_lat)

    print(f"Start node: {start_node}")
    print(f"End node: {end_node}")
    print(f"Start node coords: {G.nodes[start_node]}")
    print(f"End node coords: {G.nodes[end_node]}")

    #This will find the shortest path giving the starting node and ending node  using the Dijkstra algoriths to find the shortest length 
    path = nx.shortest_path(G, start_node, end_node, weight="length") #weight = 'length means we want networkX to add up the actual distance of edges not just count how many edges their are

    print(f'Path length: {len(path)} nodes')

    #This will store all the coordinates of every node along the paths to get to the end node 

    coordinate = []

    for node in path:
        point = G.nodes[node]
        coordinate.append([point['y'], point['x']])

    #this will return a dictionary with values of list of all the coordinate point of every nodes from start coordiate to end coordinate 
    return {"route": coordinate}


