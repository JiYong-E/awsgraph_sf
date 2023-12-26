import os
from datetime import datetime

# 오늘 날짜를 가져옴
today_date = datetime.now().strftime("%Y-%m-%d")

# datasample 폴더가 없으면 생성
datasample_folder = "datasample"
if not os.path.exists(datasample_folder):
    os.makedirs(datasample_folder)

# 오늘 날짜를 이름으로 하는 빈 텍스트 파일을 생성
file_path = os.path.join(datasample_folder, f"{today_date}.txt")
with open(file_path, "w") as file:
    pass

print(f"Empty file created at: {file_path}")
