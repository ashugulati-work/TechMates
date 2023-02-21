import os
import openai
from dotenv import load_dotenv
from flask import Flask,request,jsonify,json,send_file
from flask_cors import CORS
from flask_caching import Cache


#TODO : Add validations
# Create an API to empty list

# Load environment variables from the .env file
load_dotenv()

# Get the value of the OPENAI_API_KEY environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

input_sentences = []

app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route('/api/sentence',methods=['POST'])
def add_sentence():
    if 'sentence' in request.json:
        sentence = request.json["sentence"]
        input_sentences.append(sentence)
        return jsonify({'data': input_sentences, "message": "Successful"}),200
    else:
        return jsonify({"message": "Provide sentence"}),400


@app.route('/api/sentence/<int:id>',methods=['DELETE'])
def delete_sentence(id):
    try:
        del input_sentences[id]
        return jsonify({'data': input_sentences, "message": "Successful"}),200
    except IndexError:
        return jsonify({"message": "Incorrect id"}),400
    
@app.route('/api/sentence',methods=['DELETE'])
def delete_sentences():
    input_sentences.clear()
    return jsonify({'data': input_sentences, "message": "Successful"}),200

@app.route('/api/sentences',methods=['POST'])
def generate_sentences():
    # Generate a cache key based on the request body
    cache_key = str(request.data)

    # Check if the response is already cached
    cached_response = cache.get(cache_key)
    if cached_response:
        return cached_response
    
    if 'no_of_sentences' in request.json and 'sentences' in request.json and 'topic' in request.json:
        no_of_sentences = request.json["no_of_sentences"]
        sentences = request.json["sentences"]
        topic = request.json["topic"]
    else:
        return jsonify({'message':"Bad Request, Provide all the required fields"}),400
    
    temperature = 0.7
    if 'temperature' in request.json:
        temperature = request.json["temperature"]


    sentences.append(f'Generate {no_of_sentences} sentences')
    output_prompt = ""
    for sent in sentences:
        output_prompt += sent+ "\n"
        # print(output_prompt)

    # openai_response = openai.Completion.create(
    # model="text-davinci-003",
    # prompt = output_prompt,
    # temperature=temperature,
    # max_tokens=20,
    # top_p=1,
    # frequency_penalty=0,
    # presence_penalty=0
    # )
    # output_sentences = openai_response.choices[0]['text'].split('\n')
    # output_sentences = [item for item in output_sentences if item != ""]

    # code for testing API (to save the tokens)
    output_sentences = []
    for i in range(1, 3):
       output_sentences += sentences

    # Open the file in write mode
    with open("sentences.txt", "w") as file:
    # Write each sentence to the file on a new line
        for sentence in output_sentences:
            file.write(sentence + "\n")
    #     file.close()

    response = jsonify({'data': output_sentences[:5], "message": "Successful"}),200
    # Cache the response with the cache key
    cache.set(cache_key, response, timeout=300)  # Cache the response for 5 minutes
    return response

@app.route('/api/sentence_file')
def get_file():
    # Path to the PDF file on the server
    # file_path = 'sentences.txt'
    # # Use Flask's send_file function to send the file as a response
    # return send_file(file_path, as_attachment=True)

    with open("sentences.txt", "r") as file:
    # Read the lines of the file into a list
        lines = file.readlines()

    # Remove any newline characters from the end of each line
    output_sentences = [line.strip() for line in lines]
    return jsonify({'data': output_sentences, "message": "Successful"}),200

if __name__ == '__main__':
    app.run(debug=True)
