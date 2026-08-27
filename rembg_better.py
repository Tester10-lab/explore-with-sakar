from rembg import remove
from PIL import Image

input_path = r"C:\Users\Diplon\.gemini\antigravity-ide\brain\f052d4e6-7863-44a2-bc85-cfd7ee678e93\.user_uploaded\media_1787765329342.png"
output_path = r"C:\Users\Diplon\Desktop\explore with sakar\public\images\sakar-nobg.png"

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print("Background removed perfectly!")
