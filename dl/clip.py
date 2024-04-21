from pydub import AudioSegment 
import os

folder_name = "Full songs"
filenames = [os.path.join(root, file) for root, dirs, files in os.walk(folder_name) for file in files]

for i in filenames:
    song = AudioSegment.from_mp3(i)
    forty_seconds = 40 * 1000 
    seventy_seconds=70*1000
    middle_30_seconds = song[forty_seconds:seventy_seconds]
    a=i.split("\\")[-1]
    b=a.split(".")[0]
    output_filename = os.path.join(f"Dataset\Test_Music\{b}.mp3")
    middle_30_seconds.export(output_filename, format="mp3") 