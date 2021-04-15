# Flask App

This application provides the REST API for our mobile application to convert picture into speech ( using image captioning ) .

It is backend of our [Describer App](https://github.com/kiranbhanushali/image-captioning/tree/master/react-native-app) made with React Native.

The entire application is contained within ```app.py``` file 

**Currently its deployed on EC instance on Alibaba Cloud .
And configured DNS for it using [No-IP](https://www.noip.com/)**


**Accessible via**
[http://describer.ddns.net/](http://describer.ddns.net/) 

# Run Locally 

## Clone the repository
 ``` git clone https://github.com/kiranbhanushali/image-captioning.git```

## Installing Requirements
requirements are specified in requiremnt.txt file .install the requirements for app via 
```pip install -r requirements.txt```
>Note: for cpu only devices can install tensorflow-cpu.

## Run app 
go to flask-app via command ``` cd flask-app ```

we are using gunicorn to run our flask application 
``` gunicorn app:app```

The app will start on [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Testing 
for testing you can use [Postman ](https://www.postman.com/)
or simply ```curl``` in terminal 



# REST API Endpoints


| ROUTE | METHOD | DESCRIPTION |
| ------ | ------  | ------ |
| `/` | GET | Welcome message.(To ensure that API is running.)
| `/download` | GET  |  To download the trained model(You **must** have to provide model and dictionary link in ```download.sh``` file in models/ and npy-files/ ). |
| `/load` | GET| To load the model and dictionary.
| `/upload` | GET| Only for debugging purpose . |
| `/predict` |POST| Predicts the caption of image which is provided in formdata and returns the json object of captions. |



