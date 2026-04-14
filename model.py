import torch
from torch import nn

# define fully connected network with two hidden layers
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.net = nn.Sequential(
            nn.Linear(28 * 28, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )

    # forward pass of the network
    def forward(self, x):
        x = self.flatten(x)
        logits = self.net(x)
        return logits
