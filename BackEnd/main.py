from fastapi import FastAPI

from routes.router import router #This imported the router endpoint from within router.py
#This is used to creat FastAPI app instance 

app = FastAPI()

#this will Register the router so FASTAPI know about our routing endpoints we created in router.py
app.include_router(router)

#a testing endpoint to see if the message will be return to the react app file website 

@app.get("/")
def read_root():
    return{"message": "S&T Campus Nav API is running"}

