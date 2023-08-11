import os
from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__, static_url_path='/static', static_folder='static')


openai.api_key = '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'

# Ruta para cargar la página principal (index.html)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/procesar', methods=['POST'])
def procesar_mensaje():
    mensaje = request.json['mensaje']

    # Utiliza GPT-3 para generar una respuesta
    respuesta = openai.Completion.create(
        engine="davinci",  # Usa el motor Davinci
        prompt=mensaje,     # Utiliza el mensaje del usuario como prompt
        max_tokens=100      # Ajusta según la longitudsdeseada
    ).choices[0].text

    return jsonify({'respuesta': respuesta})

if __name__ == '__main__':
    app.run()
