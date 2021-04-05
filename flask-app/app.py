from flask import Flask , session
from flask import render_template,flash, json, jsonify, request,redirect,url_for
from tensorflow import keras
import numpy as np
import cv2
from keras.applications import ResNet50
from keras.models import Model
import os
import io
from keras.preprocessing.sequence import pad_sequences
from werkzeug.utils import secure_filename

from flask_session.__init__ import Session

import uuid
import datetime
 
 
SESSION_TYPE = 'memcache'

model = None
model_cnn = None
new_dict = None
inv_dict = None
MAX_LEN = 36



UPLOAD_FOLDER = './flask-app/static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}




def CNN():
    resnet = ResNet50(include_top=True,weights="imagenet") 
    last = resnet.layers[-2].output
    model_resnet = Model(inputs = resnet.input,outputs = last)
    return model_resnet


def load_model(model_path, model_weights_path):
    global model
    global model_cnn 
    model_cnn = CNN()
    model = keras.models.load_model(model_path)
    model.load_weights(model_weights_path)


def load_dictionary(new_dict_path,inv_dict_path):
    global new_dict
    global inv_dict
    new_dict = np.load(new_dict_path,allow_pickle='TRUE').item()
    inv_dict= np.load(inv_dict_path,allow_pickle='TRUE').item()

def predict_caption(imgName):
    test_img_path =  imgName
    test_img = cv2.imread(test_img_path)
    test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)
    test_img = cv2.resize(test_img, (224, 224))
    test_img = np.reshape(test_img, (1,224,224,3))
    test_feature = model_cnn.predict(test_img).reshape(1,2048)
    text_inp = ['startseq']
    count = 0
    caption = ''
    while count < 25:
        count += 1
        encoded = []
        for i in text_inp:
            encoded.append(new_dict[i])
            
        encoded = [encoded]
        encoded = pad_sequences(encoded, padding='post', truncating='post', maxlen=MAX_LEN)
        prediction = np.argmax(model.predict([test_feature, encoded]))
        sampled_word = inv_dict[prediction]
        caption = caption + ' ' + sampled_word
            
        if sampled_word == 'endseq':
          break

        text_inp.append(sampled_word)
    return caption;



def save_image(file):
    
    basename = "image"
    suffix = datetime.datetime.now().strftime("%y%m%d_%H%M%S")
    filename = "_".join([basename, suffix]) 
    filename = filename + '.jpeg'
    filename = os.path.join(app.config['UPLOAD_FOLDER'], filename) 
    file.save(filename)
    return filename

#def preprosess_image():


app = Flask(__name__)
sess = Session(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



@app.route('/' , methods=['GET'])
def welcome():
    return "Hello Welcome to Image Captioning Api"

@app.route('/upload',methods=['GET'])
def upload():
    return render_template('upload.html')

@app.route('/predict',methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        filename = save_image(file)
        caption = predict_caption(filename)
       
        return render_template('predict.html', image = filename , caption = caption )
        
    



if __name__  == "__main__" :
    sess.init_app(app)
    app.debug = True
    app.config["SECRET_KEY"] = 'TPmi4aLWRbyVq8zu9v82dWYW1'
    MODEL_PATH = './flask-app/models/model.h5'
    MODEL_WEIGHTS_PATH = './flask-app/models/model_weights.h5'
    NEW_DICT_PATH = './flask-app/npy-files/new_dict.npy'
    INV_DICT_PATH = './flask-app/npy-files/inv_dict.npy'
    load_model(MODEL_PATH, MODEL_WEIGHTS_PATH)
    load_dictionary(NEW_DICT_PATH, INV_DICT_PATH)
    app.run(host='0.0.0.0', port=5000)
