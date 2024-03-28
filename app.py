from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__, static_url_path='/static')


API_URL = "https://api-inference.huggingface.co/models/tae898/emoberta-large"
API_TOKEN = "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"  # Replace with your actual API token
headers = {"Authorization": f"Bearer {API_TOKEN}"}



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    text_input = request.form['text_input']
    payload = {"inputs": text_input}
    response = requests.post(API_URL, headers=headers, json=payload)
    result = response.json()
    return render_template('result.html', user_input=text_input, result=result)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
