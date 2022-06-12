# How to run this Flask app

- Clone the repository
- Open terminal, then go to this project's root directory
- Type `python -m venv .venv` then press enter
- In Linux, type `source .venv/bin/activate` then press enter
- In Windows, type `.venv\Scripts\activate` then press enter
- Type `pip install -r requirement.txt`, then press enter
- Serve the Flask app by typing `python app.py`
- It will be run on `http://127.0.0.1:443`

# API Endpoint

| Endpoint |   Method   | Body Sent (JSON) |              Description              |
| :------: | :--------: | :--------------: | :-----------------------------------: |
|    /     |    GET     |       None       |   HTTP GET REQUEST Testing Endpoint   |
|  /post   |    POST    |     Anything     |  HTTP POST REQUEST Testing Endpoint   |
|   /404   | GET & POST |     Anything     |        404 NOT FOUND Endpoint         |
| /predict |    POST    | file: Image file | HTTP POST REQUEST Prediction Endpoint |

# Predict image using Postman

- Open Postman
- Enter URL request with `http://127.0.0.1:5000/predict`
- Select method POST
- Go to Body tab and select form-data
- Change key from form-data with file (must be named `file`)
- Input the image that you want predict as a value of the key
- Send the request
