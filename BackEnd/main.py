from fastapi import FastAPI

#This is used to creat FastAPI app instance 

app = FastAPI()

#a testing endpoint to see if the message will be return to the react app file website 

@app.get("/")
def read_root():
    return{"message": "S&T Campus Nav API is running"}