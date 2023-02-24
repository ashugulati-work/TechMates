import os
import openai
from dotenv import load_dotenv
from flask import Flask,request,jsonify,json,send_file
from flask_cors import CORS
from flask_caching import Cache


# Load environment variables from the .env file
load_dotenv()

# Get the value of the OPENAI_API_KEY environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

input_sentences = []
output_sentences = []

app = Flask(__name__)

CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

@app.route('/',methods=['GET'])
def welcome():
    return "Welcome to synth-api",200

@app.route('/api/sentence',methods=['POST'])
def add_sentence():
    if 'sentence' in request.json:
        sentence = request.json["sentence"]
        input_sentences.append(sentence)
        return jsonify({'data': input_sentences, "message": "Successful"}),201
    else:
        return jsonify({"message": "Please provide sample sentences"}),400


@app.route('/api/sentence/<int:id>',methods=['DELETE'])
def delete_sentence(id):
    try:
        del input_sentences[id]
        return jsonify({'data': input_sentences, "message": "Successful"}),200
    except IndexError:
        return jsonify({"message": "Invalid ID, Please provide correct ID"}),400
    
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
    
    print("request.json", request.json)
    if 'no_of_sentences' in request.json and 'sentences' in request.json and 'topic' in request.json and 'keywords' in request.json:
        no_of_sentences = request.json["no_of_sentences"]
        sentences = request.json["sentences"]
        tone = request.json["tone"]
        topic_name = request.json["topic"]
        keywords = request.json["keywords"]
    else:
        return jsonify({'message':"Please provide all the required fields"}),400
   
#     output_prompt = f"""Generate {no_of_sentences} additional sentences for {topic_name}. Use the following sentences as a reference:
# """
    output_prompt = ""
    for sent in sentences:
        output_prompt += sent+ "\n"

    keywords_string = ','.join([str(elem) for elem in keywords])
    output_prompt = output_prompt + "\n"
    output_prompt += f"""Generate {no_of_sentences} more sentences for {topic_name}. Focus on aspects such as {keywords_string}. Please write in a {tone} tone."""
    print(output_prompt)

    openai_response = openai.Completion.create(
    model="text-davinci-003",
    prompt = output_prompt,
    temperature=0,
    max_tokens=3873,
    stop=['101'],
    )
    generated_sentences = openai_response.choices[0]['text'].split('\n')
    # generated_sentences = [item for item in output_sentences if item != ""]

    for item in generated_sentences:
        if item != "":
            output_sentences.append(item)

    if len(output_sentences) <=5:
        data = output_sentences
    else : 
        data = output_sentences[:5]
     
    # code for testing API (to save the tokens)
    # output_sentences = []
    # for i in range(1, 100):
    #    output_sentences += sentences

    response = jsonify({'data': data, "message": "Successful"}),200
    # Cache the response with the cache key
    cache.set(cache_key, response, timeout=300)  # Cache the response for 5 minutes
    return response

@app.route('/api/sentence_file')
def get_file():
    print("output sentences", output_sentences)
    response = jsonify({'data': output_sentences, "message": "Successful"}),200
   
    return response

@app.route('/api/sentence_file', methods=["DELETE"])
def delete_file():
    # global output_sentences
    output_sentences.clear()
    return jsonify({"message": "Successful"}),200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
