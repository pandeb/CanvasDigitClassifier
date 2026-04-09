from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    # return dummy data
    prediction = [{'digit': 3, 'probability': 69.8}, {'digit': 2, 'probability': 16.0}, {'digit': 7, 'probability': 4.4}]
    return jsonify({'predicted_value': prediction})


if __name__ == "__main__":
    app.run(debug=True)