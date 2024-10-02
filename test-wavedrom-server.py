#!/usr/bin/env python 
# 
# Python class to build wires 
#
#
import requests
import argparse
#import string
#import random
import json

#class wavedrom_generator:
#
#    def __init__(self):
#
#
#        self.features_dict = {
#            'names' : True,
#            'edges' : True,
#            'breaks' : False
#        }
#
#        self.signal_type_prob = {'clk' : 0.05, 
#                                 'data' : 0.5, 
#                                 'binary' : 0.4,
#                                 'break' : 0.05 } 
#
#        self.binary_type_prob = { '1' : 0.2,
#                                  '0' : 0.2,
#                                  'x' : 0.1,
#                                  '.' : 0.5
#                                }
#
#        self.data_type_prob = {
#                            '1' : 0.1, 
#                            '0' : 0.1, 
#                            'x' : 0.1, 
#                            '.' : 0.5, 
#                            '3' : 0.05, 
#                            '4' : 0.05, 
#                            '5' : 0.05, 
#                            '=' : 0.05}
#
#        self.norm_prob(self.signal_type_prob)
#        self.norm_prob(self.binary_type_prob)
#        self.norm_prob(self.data_type_prob)
#
#    def norm_prob(self,dict_in):
#        cdf = 0.0
#        for key in dict_in.keys():
#            cdf += dict_in[key]
#        for key in dict_in.keys():
#            dict_in[key] /= cdf
#
#    def get_random_key(self, dict_in):
#        prob = random.uniform(0,1.0)
#        cdf = 0.0
#        for key in dict_in.keys():
#            cdf += dict_in[key]
#            if prob < cdf:
#                return key
#            
#        return key 
#
#    def get_random_signalname(self, min_len=3, max_len=10):
#
#        num_char = random.randint(min_len, max_len)
#        signal_name = ''
#        for loop1 in range(num_char):
#            signal_name += random.choice(string.ascii_letters)
#        return signal_name
#
#    def fix_repeat_bits(self, signals):
#
#        no_runs = False
#        fixed_signals = signals
#
#        index = 0
#        repeat_char =[ '0', '1', 'x']
#
#        while index < (len(fixed_signals)-1):
#
#            curr_char = fixed_signals[index]
#            if curr_char in repeat_char:
#                repeat_index = index
#                for loop1 in range(index+1, len(fixed_signals)):
#                    if fixed_signals[loop1] == curr_char:
#                        repeat_index = loop1
#                    elif fixed_signals[loop1] == '.':
#                        pass
#                    else:
#                        break
#
#                # swap the index
#                if repeat_index > index:
#                    print(f'before: {fixed_signals}, index = {index}, repeat_index={repeat_index}')
#                    num_repeat = repeat_index-index
#                    fixed_signals = fixed_signals[:index+1] + ('.'*num_repeat) + fixed_signals[repeat_index+1:]
#                    print(f'after:  {fixed_signals}\n')
#                    index += 1
#                else:
#                    index += 1
#            else:
#                index += 1
#
#        return fixed_signals
#
#    def get_random_signals(self, num_signals):
#
#        signal_type = self.get_random_key(self.signal_type_prob)
#
#        new_signal = ''
#        if signal_type == 'clk':
#            new_signal = 'p'
#            for loop1 in range(num_signals-1):
#                new_signal += '.'
#
#        elif signal_type == 'binary':
#            for loop1 in range(num_signals):
#                new_signal += self.get_random_key(self.binary_type_prob)
#
#        elif signal_type == 'data':
#            for loop1 in range(num_signals):
#                new_signal += self.get_random_key(self.data_type_prob)
#
#        new_signal = self.fix_repeat_bits(new_signal)
#
#        return signal_type, new_signal
#
#    def get_random_data(self, signals):
#
#        data_list = []
#        for val in signals:
#            if val == '3' or val == '4' or val == '5' or val == '=':
#                data_list.append(self.get_random_signalname(1,4))
#
#        return data_list
#
#    def generate_json(self):
#
#        wd_json = {'signal': []}
#
#        num_signals = random.randint(3,10)
#
#        for loop1 in range(num_signals):
#            signal_name = self.get_random_signalname()
#
#            num_signals = random.randint(5, 20)
#            signal_type, signal_text = self.get_random_signals(num_signals)
#
#            if signal_type == 'break':
#                signal_dict = {}
#            else:
#                signal_dict = {'name' : signal_name, 'wave' : signal_text}
#
#            signal_data = self.get_random_data(signal_text)
#            if len(signal_data):
#                signal_dict['data'] = signal_data
#
#            wd_json['signal'].append(signal_dict)

#        print(wd_json)
#        print(json.dumps(wd_json, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Description of your program')
    parser.add_argument('-N','--num-pts', default=65536, type=int, help='Sets number of points')
    parser.add_argument('--delta-v', type=float, help='Sets quantization set in mV')
    args = parser.parse_args()

#    gen = wavedrom_generator()

#    gen.generate_json()

    # Generate a new user
    api_url = "http://127.0.0.1:3000/diagrams"
    #todo = {"userId": 1, "title": "Buy milk", "completed": False}
    #todo = {"svg": "1234"}
    #todo = {}
#    response = requests.post(api_url, json=todo)
    response = requests.post(api_url)
    #print(response)
    print(f'response: {response.json()}')
    resp_data = response.json()
    print(response.status_code)

    # Get the reponse
    api_url = f"http://127.0.0.1:3000/diagrams/{resp_data['diagramId']}"
    #todo = {"userId": 1, "title": "Buy milk", "completed": False}
    todo = {"json": "Dave was here"}
    todo['privateKey'] = resp_data['privateKey']
    response = requests.put(api_url, json=todo)
    print(response)
    print(f'response: {response.json()}')
    print(response.status_code)


#{'userId': 1, 'title': 'Buy milk', 'completed': False, 'id': 201}
#>>> response.status_code
