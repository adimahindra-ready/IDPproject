
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    image = request.files["image"]
    path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(path)

    # Prototype AI response
    result = {
        "crop": "Tomato",
        "disease": "Leaf Spot",
        "confidence": "89%",
        "treatment": "Remove infected leaves and apply recommended fungicide."
    }
    return jsonify(result)

@app.route("/ask", methods=["POST"])
def ask():
    q = request.json.get("question","")
    return jsonify({
        "answer": "Recommended action: Check soil moisture, apply balanced fertilizer, and monitor leaves for spots."
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
