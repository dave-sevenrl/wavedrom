#!/usr/bin/env python 
# 
# Python class to build wires 
#
#
import requests
import argparse
import time

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Description of your program')
    parser.add_argument('-N','--num-pts', default=65536, type=int, help='Sets number of points')
    parser.add_argument('--delta-v', type=float, help='Sets quantization set in mV')
    args = parser.parse_args()

    main_url = 'http://wavedrom-llm-802454156912.us-west1.run.app'
    #main_url = 'http://127.0.0.1:3000'

    # Get a new chat ID
    api_url = f"{main_url}/newchat"
    todo = {"private_key": "1234"}
    response = requests.post(api_url, json=todo)
    print(response.status_code)
    print(response)
    print(f'response: {response.json()}')
    resp_data = response.json()
    chat_id = resp_data['chat_id']

    # Generate two reponses
    api_url = f"{main_url}/chat/{chat_id}"
    todo = {"prompt" : "Generate a clock named PCK with 10 negative edges"}
    response = requests.put(api_url,json=todo)
    resp_data = response.json()
    if response.status_code == 200:
        print(f'Successfully produced {resp_data["json"]}')
    else:
        print(f'Error {response.status_code} - failed to use model {chat_id}')

    # Send a second prompt
    todo = {"prompt" : "Add a signal PDAT with 4 cycles logic zero followed by 6 xs"}
    response = requests.put(api_url,json=todo)
    resp_data = response.json()
    if response.status_code == 200:
        print(f'Successfully produced {resp_data["json"]}')
    else:
        print(f'Error {response.status_code} - failed to use model {chat_id}')

    # Create an SVG file
    api_url = f"{main_url}/create_svg"
    #todo = {"json" : resp_data["json"]}
    response = requests.put(api_url,json=resp_data)
    resp_data = response.json()
    if response.status_code == 200:
        print(f'Successfully produced {resp_data["svg"]}')
    else:
        print(f'Error {response.status_code} - failed to produce SVG output')

    # Create an PNG file
    api_url = f"{main_url}/create_png"
    response = requests.put(api_url,json=resp_data)
    resp_data = response.json()
    if response.status_code == 200:
        print(f'Successfully produced {len(resp_data["png"])}-byte PNG')
    else:
        print(f'Error {response.status_code} - failed to produce PNG output')

    # Finally delete it
    api_url = f"{main_url}/chat/{chat_id}"
    response = requests.delete(api_url)
    if response.status_code == 204:
        print(f'Successfully deleted {chat_id}')
    else:
        print(f'Error {response.status_code} - failed to delete {chat_id}')

#
#    # Get the reponse
#    api_url = f"http://127.0.0.1:3000/diagrams/{resp_data['diagramId']}"
#    #todo = {"userId": 1, "title": "Buy milk", "completed": False}
#    todo = {"json": """{signal: [
#  {name: 'clk', wave: 'p.....|...'},
#  {name: 'dat', wave: 'x.345x|=.x', data: ['head', 'body', 'tail', 'data']},
#  {name: 'req', wave: '0.1..0|1.0'},
#  {},
#  {name: 'ack', wave: '1.....|01.'}
#]}"""}
#    todo['privateKey'] = resp_data['privateKey']
#    response = requests.put(api_url, json=todo)
#    diag_results = response.json();
#    #print(response)
#    print(f'diag_results: {diag_results.keys()}')
#    print(response.status_code)
#
#    # Get the reponse
#    api_url = f"http://127.0.0.1:3000/diagrams/{resp_data['diagramId']}"
#    todo = {'privateKey' : resp_data['privateKey']}
#
#    while True:
#        response = requests.get(api_url, json=todo)
#        diag_results = response.json();
#        print(response.status_code)
#        if response.status_code == 200:
#            break
#        time.sleep(2)
#
#    print(f'diag_results: {diag_results.keys()}')
#    png = diag_results['png']
#    print(f'PNG = {png['type']} with {len(png['data'])}-bytes')
#
#    #print(f'response: {response.json()}')
#
#
##{'userId': 1, 'title': 'Buy milk', 'completed': False, 'id': 201}
##>>> response.status_code
#