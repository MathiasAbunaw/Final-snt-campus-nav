from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware  #Allow React frontend to communicate with this backend

from routes.router import router #This imported the router endpoint from within router.py
#This is used to creat FastAPI app instance 


app = FastAPI()


#React send request from http://localhost:5173/ 
#CorsMiddleware - checks if this origin is allowed
#if so the request get pass through the endpoint within FastAPI 
#else the browser blocks the request before hitting fast API

app.add_middleware( #Basically is giving it access for react
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)


#this will Register the router so FASTAPI know about our routing endpoints we created in router.py allowing it to be use
app.include_router(router)

#a testing endpoint to see if the message will be return to the react app file website 

@app.get("/") #this includes the endpoint of / at the end
def read_root():
    return{"message": "S&T Campus Nav API is running"}

