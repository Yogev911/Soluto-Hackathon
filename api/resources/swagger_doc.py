products_post = {
        'tags': ['users'],
        'description': 'Adds a user',
        'parameters': [
            {
                'name': 'body',
                'description': 'Request body',
                'in': 'body',
                'required': True,
            }
        ],
        'responses': {
            '201': {
                'description': 'Created user',
                'headers': {
                    'Location': {
                        'type': 'string',
                        'description': 'Location of the new item'
                    }
                },
                'examples': {
                    'application/json': {
                        'id': 1
                    }
                }
            }
        }
    }