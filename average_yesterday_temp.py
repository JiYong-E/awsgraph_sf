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

def calculate_average_temperature(temperature_data):
    if not temperature_data:
        return None

    total_temperature = sum(temperature_data.values())
    average_temperature = total_temperature / len(temperature_data)
    return average_temperature

def update_integrated_data(integrated_data_path, date, value):
    if os.path.exists(integrated_data_path):
        with open(integrated_data_path, 'r') as json_file:
            integrated_data = json.load(json_file)
    else:
        integrated_data = {}

    integrated_data[date] = value

    with open(integrated_data_path, 'w', encoding='utf-8') as json_file:
        json.dump(integrated_data, json_file, indent=2, ensure_ascii=False)

def main():
    input_folder = './datasample'
    output_folder = './integrateddata'
    
    # Calculate yesterday's date
    yesterday = datetime.now() - timedelta(1)
    date = yesterday.strftime('%Y-%m-%d')

    input_file_path = os.path.join(input_folder, f'{date}.txt')
    average_output_file_path = os.path.join(output_folder, 'average_temp.json')

    if os.path.exists(input_file_path):
        temperature_data = read_temperature_data(input_file_path)
        
        # Calculate and update average temperature
        average_temperature = calculate_average_temperature(temperature_data)
        update_integrated_data(average_output_file_path, date, average_temperature)
        print(f'Average temperature data for {date} successfully integrated.')
    else:
        print(f'Error: File not found - {input_file_path}')

if __name__ == "__main__":
    main()




