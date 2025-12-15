import requests
import json

url = "http://localhost:8000/api/register/"
headers = {'Content-Type': 'application/json'}
data = {
    "username": "testuser_debug_1",
    "password": "password123",
    "email": "test_debug_1@example.com",
    "full_name": "Test Debug",
    "phone": "1234567890"
}

try:
    print(f"Sending POST to {url}")
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response Text: {response.text}")
    try:
        print(f"JSON: {response.json()}")
    except:
        print("Not JSON")
except Exception as e:
    print(f"Error: {e}")
