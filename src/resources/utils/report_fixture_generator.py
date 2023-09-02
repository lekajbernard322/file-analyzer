from os import listdir
from os.path import isfile, join
import json
from datetime import datetime, timezone
from bson.objectid import ObjectId

INPUT_DIR = r'../report_data/'
OUTPUT_PATH = r'../../backend/app/report/fixtures/report_fixture.json'

file_paths = [(join(INPUT_DIR, file_name), file_name)
              for file_name in listdir(INPUT_DIR)
              if isfile(join(INPUT_DIR, file_name))]


def prepare_output_data(i, file_name, content):
    return {
        'model': 'report.report',
        'pk': str(ObjectId()),
        'fields': {
            'name': file_name,
            'content': content,
            'created': datetime.now(tz=timezone.utc).isoformat()
        }
    }


data = []
for index, (input_file_path, input_file_name) in enumerate(file_paths):
    print(f'[*] Processing file: {input_file_path}')

    with open(input_file_path, 'r') as input_file:
        json_content = json.load(input_file)

        output_data = prepare_output_data(index, input_file_name, json_content)

        data.append(output_data)

print(f'[*] Dumping to fixture file: {OUTPUT_PATH}')
with open(OUTPUT_PATH, 'w', encoding='utf-8') as output_file:
    json.dump(data, output_file, indent=4)

print(f'[\u2714] Done')
