# CanvasDigitClassifier

This project implements an end-to-end pipeline for recognizing digits drawn on a canvas.  
Built with `Python`, `JavaScript`, `PyTorch`, `Flask`, `HTML`, and `CSS`.

The primary focus of this project was implementing the complete workflow from frontend input to prediction rather than optimizing model accuracy.

## 📸 Screenshot

<img width="2514" height="1532" alt="prediction_result" src="https://github.com/user-attachments/assets/2529c42d-9a25-4001-8a15-82dba4d9c601" />


## 🛠️ Setup

1. **Clone the repository**
```
git clone https://github.com/pandeb/CanvasDigitClassifier.git
cd CanvasDigitClassifier
```

2. **Create conda environment and install packages**
```
conda env create -f environment.yml
```

3. **Activate the environment**
```
conda activate digitclassifier
```

4. **Run the program**
```
flask run
```
or
```
python3 app.py
```

5. **Open the browser and navigate to** http://127.0.0.1:5000

6. **(Optional) Train the model**:
```
python3 train.py
```
