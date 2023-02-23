echo $(printf "\e[32m**** Executing Synth-ai flask backend deployment script ****\e[0m")

echo "Installing virtualenv"
pip install virtualenv

echo "Setting virtualenv to synth-ai"
virtualenv synth-ai

echo "Setting synth-ai env source"
source synth-ai/bin/activate

echo "Installing Requirements"
pip install -r requirements.txt

echo "Starting flask server"
python api/index.py