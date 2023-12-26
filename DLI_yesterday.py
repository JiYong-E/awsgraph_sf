import os
import csv
import json
from datetime import datetime, timedelta

def calculate_dli(data):
    total_dli = sum([float(row[6]) * 60 for row in data])
    return total_dli / 1e6

def update_dli_data(dli_data_path, date, dli_value):
    if os.path.exists(dli_data_path):
        with open(dli_data_path, 'r') as json_file:
            dli_data = json.load(json_file)
    else:
        dli_data = {}

    dli_data[date] = dli_value

    with open(dli_data_path, 'w', encoding='utf-8') as json_file:
        json.dump(dli_data, json_file, indent=2, ensure_ascii=False)

def main():
    input_folder = './datasample'
    output_folder = './integrateddata'
    
    # Calculate yesterday's date
    yesterday = datetime.now() - timedelta(1)
    date = yesterday.strftime('%Y-%m-%d')

    input_file_path = os.path.join(input_folder, f'{date}.txt')
    dli_output_file_path = os.path.join(output_folder, 'DLI.json')

    if os.path.exists(input_file_path):
        with open(input_file_path, 'r', newline='') as file:
            reader = csv.reader(file, delimiter=',')
            data = [row for row in reader]

        dli_value = calculate_dli(data)
        update_dli_data(dli_output_file_path, date, dli_value)
        print(f'DLI data for {date} successfully integrated.')
    else:
        print(f'Error: File not found - {input_file_path}')

if __name__ == "__main__":
    main()

