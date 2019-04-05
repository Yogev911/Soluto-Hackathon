import os

from imageai.Prediction import ImagePrediction


class recognizer:
    execution_path = os.getcwd()
    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    model_path = execution_path + r"\model\resnet50_weights_tf_dim_ordering_tf_kernels.h5"
    prediction.setModelPath(model_path)
    prediction.loadModel()

    def by_image_path(self, path):
        predictions, percentage_probabilities = self.prediction.predictImage(
            path, result_count=5)
        return predictions[percentage_probabilities.index(max(percentage_probabilities))]


if __name__ == '__main__':
    r = recognizer()
    print(r.by_image_path(r"C:\Users\Amir\Documents\mbp13touch-space-select-201807.jpeg"))
