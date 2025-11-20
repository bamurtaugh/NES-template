from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import os
from datetime import datetime
from typing import Dict, List

app = Flask(__name__)
CORS(app)

# In-memory storage
users: Dict[str, dict] = {}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'service': 'user-service'})

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify({
        'success': True,
        'data': list(users.values())
    })

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id: str):
    user = users.get(user_id)
    if user:
        return jsonify({
            'success': True,
            'data': user
        })
    return jsonify({
        'success': False,
        'error': 'User not found'
    }), 404

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data.get('email') or not data.get('name'):
        return jsonify({
            'success': False,
            'error': 'Email and name are required'
        }), 400
    
    user_id = str(uuid.uuid4())
    user = {
        'id': user_id,
        'email': data['email'],
        'name': data['name'],
        'createdAt': datetime.utcnow().isoformat()
    }
    
    users[user_id] = user
    
    return jsonify({
        'success': True,
        'data': user
    }), 201

@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id: str):
    if user_id not in users:
        return jsonify({
            'success': False,
            'error': 'User not found'
        }), 404
    
    data = request.get_json()
    user = users[user_id]
    
    if 'email' in data:
        user['email'] = data['email']
    if 'name' in data:
        user['name'] = data['name']
    
    return jsonify({
        'success': True,
        'data': user
    })

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id: str):
    if user_id not in users:
        return jsonify({
            'success': False,
            'error': 'User not found'
        }), 404
    
    del users[user_id]
    return jsonify({
        'success': True,
        'data': None
    })

if __name__ == '__main__':
    # Only enable debug mode if explicitly set via environment variable
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
