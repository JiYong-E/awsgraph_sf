import requests
import os
from datetime import datetime, timedelta
import shutil

# Get yesterday's date
yesterday_date = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

# Extracting Year, Month, and Day from yesterday's date
year, month, day = yesterday_date.split("-")

# Replacing the specific parts in the URL with the extracted date components
download_url = f"http://203.239.47.148:8080/dspnet.aspx?Site=85&Dev=1&Year={year}&Mon={month}&Day={day}"


def download_and_move_file(url, destination_folder):
    response = requests.get(download_url)
    if response.status_code == 200:
        file_name = f"{yesterday_date}.txt"
        file_path = os.path.join(destination_folder, file_name)

        with open(file_path, "wb") as file:
            file.write(response.content)

        print(f"File downloaded to: {file_path}")

        # Move to datasample folder
        datasample_folder = "datasample"
        if not os.path.exists(datasample_folder):
            os.makedirs(datasample_folder)

        final_file_path = os.path.join(datasample_folder, file_name)
        shutil.move(file_path, final_file_path)
        print(f"File moved to: {final_file_path}")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")

if __name__ == "__main__":
    download_and_move_file(download_url, "./datasample")
