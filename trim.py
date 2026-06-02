from PIL import Image
import sys

# 画像ファイルのパス
image_path = sys.argv[1]

# 画像を開く
with Image.open(image_path) as img:
    width, height = img.size

    # 中央の正方形を計算
    new_size = min(width, height)
    left = (width - new_size)/2
    top = (height - new_size)/2
    right = (width + new_size)/2
    bottom = (height + new_size)/2

    # トリミング
    img_cropped = img.crop((left, top, right, bottom))

    # 新しいファイル名で保存
    img_cropped.save('cropped_image.jpg')

