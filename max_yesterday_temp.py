import os
import csv
import json
from datetime import datetime, timedelta

def read_temperature_data(file_path):
    data = {}
    with open(file_path, 'r', newline='') as file:
        reader = csv.reader(file, delimiter=',')
        for row in reader:
            # Assuming the temperature data is in the 2nd column
            date, temperature = row[0], float(row[1])
            data[date] = temperature
    return data

def update_integrated_data(integrated_data_path, date, temperature):
    if os.path.exists(integrated_data_path):
        with open(integrated_data_path, 'r') as json_file:
            integrated_data = json.load(json_file)
    else:
        integrated_data = {}

    integrated_data[date] = temperature

    with open(integrated_data_path, 'w', encoding='utf-8') as json_file:
        json.dump(integrated_data, json_file, indent=2, ensure_ascii=False)

def main():
    input_folder = './datasample'
    output_folder = './integrateddata'
    
    # Calculate yesterday's date
    yesterday = datetime.now() - timedelta(1)
    date = yesterday.strftime('%Y-%m-%d')

    input_file_path = os.path.join(input_folder, f'{date}.txt')
    output_file_path = os.path.join(output_folder, 'max_temp.json')

    if os.path.exists(input_file_path):
        temperature_data = read_temperature_data(input_file_path)
        max_temperature = max(temperature_data.values())

        update_integrated_data(output_file_path, date, max_temperature)
        print(f'Data for {date} successfully integrated.')
    else:
        print(f'Error: File not found - {input_file_path}')

if __name__ == "__main__":
    main()
