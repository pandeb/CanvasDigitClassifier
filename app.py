from flask import Flask, render_template, jsonify, request
from predict import predict_value

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    # data from the UI
    data = request.json
    img_base64 = data['user_input']

    # Remove the prefix from the data if present
    if "," in img_base64:
        img_base64 = img_base64.split(",")[1]
    
    # prediction using pre_trained model
    prediction = predict_value(img_base64)

    # return the predicted values(class : probability)
    return jsonify({'predicted_value': prediction})


if __name__ == "__main__":
    app.run(debug=True)