from PIL import Image
import torch
from torchvision import transforms
from model import NeuralNetwork
import base64
import io


def predict_value(input_img):
    # Convert inputted image to proper format and to grayscale
    image = Image.open(io.BytesIO(base64.b64decode(input_img))).convert("L")

    # resize image to 28x28 and convert to tensor
    transform = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor()
    ])
    x = transform(image)

    # Add batch dimension
    x = x.unsqueeze(0)

    # load model
    model = NeuralNetwork()
    model.load_state_dict(torch.load("./trained_model/trained_model.pth", weights_only=True))

    # predict
    model.eval()
    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=1).squeeze()

    # Get top 3 predictions
    top3_probs, top3_indices = torch.topk(probs, k=3)

    # convert the probability into list with 3 items
    top3_list = [
        {"digit": int(idx.item()), "probability": round(prob.item() * 100, 1)}
        for idx, prob in zip(top3_indices, top3_probs)
    ]

    return top3_list
