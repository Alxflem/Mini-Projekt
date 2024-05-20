from flask import Flask, jsonify, request
from flask_cors import CORS
from DatabaseConnection import Database

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# Initialize the database instance
db_instance = Database.get_instance()

def get_products():
    connection = None
    cursor = None
    try:
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT * FROM product")
        rows = cursor.fetchall()

        result = [
            {
                'p_id': row[0],
                'name': row[1],
                'type': row[2],
                'price': row[3],
                'image': row[4],
                'production_date': row[5],
                'color': row[6],
                'condition': row[7],
                'available': row[8],
                'seller': row[9]
            }
            for row in rows
        ]

        return jsonify(result), 200

    except Exception as e:
        print(f"Failed to retrieve data: {e}")
        return jsonify({'error': 'Failed to retrieve data'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)


def get_types():
    connection = None
    cursor = None
    try:
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT type_name FROM product_type")
        rows = cursor.fetchall()

        result = [
            {
                'type_name': row[0]
            }
            for row in rows
        ]

        return jsonify(result), 200

    except Exception as e:
        print(f"Failed to retrieve data: {e}")
        return jsonify({'error': 'Failed to retrieve data'}), 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)


@app.route('/api/products', methods=['GET'])
def receive_products():
    return get_products()

@app.route('/api/types', methods=['GET'])
def receive_types():
    return get_types()

#@app.route('/api/register', methods=['POST'])
#def

#@app.route('/api/login', methods=['POST'])
#def

@app.route('/api/add_product', methods=['POST'])
def create_product():
    product_data = request.get_json()

    print(product_data)

    if not product_data:
        return jsonify({"error": "Invalid input"}), 400

    # Process the incoming product data
    return jsonify({"message": "Product added successfully!", "product": product_data})

@app.route('/api/reg_user', methods=['POST'])
def register_user():
    user_data = request.get_json()

    print(user_data)

    if not user_data:
        return jsonify({"error": "Invalid input"}), 400

    # Process the incoming product data
    return jsonify({"message": "Product added successfully!", "product": user_data})


if __name__ == '__main__':
    app.run(debug=True)
