# Import flask and datetime module for showing date and time
from flask import Flask, request
from flask_cors import CORS
import datetime
import os
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
 
 
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }

@app.route("/upload", methods=['POST'])
def upload():
    file = request.files['file']
    # print(classify(file))
    print(file)
    file.save(os.path.join(os.getcwd() + '/uploads', file.filename))
    prediction = classify(os.getcwd() + '/uploads/blob')
    return {"prediction": prediction}

# import gradio as gr
import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf

mp_holistic = mp.solutions.holistic
model = tf.keras.models.load_model('action.h5')
actions = np.array(['hello','you','thankyou','please','how'])
# Assuming the following functions are defined in your code:
# mediapipe_detection, draw_styled_landmarks, extract_keypoints, prob_viz
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False                  # Image is no longer writeable
    results = model.process(image)                 # Make prediction
    image.flags.writeable = True                   # Image is now writeable 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
    return image, results
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])
    #return np.concatenate([lh, rh])

def preprocess(vidpath):
    sequence = []
    cap = cv2.VideoCapture(vidpath)
    with mp_holistic.Holistic(min_detection_confidence=0.8, min_tracking_confidence=0.8) as holistic:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            image, results = mediapipe_detection(frame, holistic)
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
    sequence = sequence[-30:]
    return np.expand_dims(sequence, axis=0)

def classify(video):
    input_data = preprocess(video)
    res = model.predict(input_data)[0]
    action = actions[np.argmax(res)]
    return action

# # Set up the Gradio interface
# iface = gr.Interface(
#     classify, 
#     gr.inputs.Video(label="Upload a video"),
#     gr.outputs.Textbox(label="Predicted Action")
# )
# iface.launch()

     
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=5002)