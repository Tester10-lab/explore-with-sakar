from PIL import Image
import sys

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    # Get the background color from top-left pixel
    bg_color = data[0]
    
    new_data = []
    # threshold for color distance
    threshold = 30
    
    for item in data:
        # Calculate distance
        if abs(item[0] - bg_color[0]) < threshold and \
           abs(item[1] - bg_color[1]) < threshold and \
           abs(item[2] - bg_color[2]) < threshold:
            # Change to transparent, but keep some alpha for anti-aliasing if it's on the edge?
            # A simple replace:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

input_image = r"C:\Users\Diplon\.gemini\antigravity-ide\brain\be8243ff-70d6-4e72-b832-4b1ae3410100\.user_uploaded\media_1787679616361.png"
output_image = r"C:\Users\Diplon\Desktop\explore with sakar\public\images\sakar-nobg.png"

remove_background(input_image, output_image)
print("Background removed and saved to", output_image)
