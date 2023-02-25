import os
import openai
from dotenv import load_dotenv
from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_caching import Cache


# Load environment variables from the .env file
load_dotenv()

# Get the value of the OPENAI_API_KEY environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

input_sentences = []
# output_sentences = []

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

def generate_prompt(no_of_sentences, reference_sentences, tone, topic_name, keywords):
    """
    Generate the prompt for OpenAI based on the input parameters.
    """
    reference_sentences_str = '\n'.join(reference_sentences)
    keywords_str = ','.join(str(kw) for kw in keywords)
    
    reference_sentences_str = reference_sentences_str + "\n"
    prompt = f"""{reference_sentences_str} 
    Generate {no_of_sentences} more sentences for {topic_name}. Focus on aspects such as {keywords_str}. Please write in a {tone} tone.
""" 
    print(prompt)
    return prompt

@app.route('/api/sentences', methods=['POST'])
def generate_sentences():
    # Generate a cache key based on the request body
    cache_key = str(request.data)

    # Check if the response is already cached
    cached_response = cache.get(cache_key)
    if cached_response:
        return cached_response

    # Get the input parameters from the request
    if ('no_of_sentences' not in request.json or
            'sentences' not in request.json or
            'tone' not in request.json or
            'topic' not in request.json or
            'keywords' not in request.json):
       
        return jsonify({'message': "Please provide all the required fields"}), 400

    print("request.json", request.json)
    no_of_sentences = request.json['no_of_sentences']
    reference_sentences = request.json['sentences']
    tone = request.json['tone']
    topic_name = request.json['topic']
    keywords = request.json['keywords']

    # Generate the prompt for OpenAI
    prompt = generate_prompt(no_of_sentences, reference_sentences, tone, topic_name, keywords)

    # NOTE: Uncomment the below code for openAI testing
    # and comment line 107, 108 and 109
    # Call OpenAI to generate the sentences
    # openai_response = openai.Completion.create(
    #     model='text-davinci-003',
    #     prompt=prompt,
    #     temperature=0.5,
    #     max_tokens=3873,
    #     stop=[str(no_of_sentences+1)],
    # )

    # Parse the response and return the generated sentences
    # generated_sentences = openai_response.choices[0]['text'].split('\n')
    # output_sentences = [item for item in generated_sentences if item != ""]

    # NOTE: code for testing API (to save the tokens)
    output_sentences = []
    for i in range(0, no_of_sentences):
       output_sentences.append(reference_sentences[0])

    # Return the response and cache the result
    response = jsonify({'data': output_sentences, 'message': 'Successful'}), 200
    cache.set(cache_key, response, timeout=300)  # Cache the response for 5 minutes
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
