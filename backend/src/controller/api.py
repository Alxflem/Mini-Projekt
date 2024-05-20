from flask import Flask, jsonify, request
from flask_cors import CORS
from DatabaseConnection import Database
from Login import login_user
from Registration import register_user
from AddProduct import add_product

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

@app.route('/api/login', methods=['POST'])
def verify_login():
    login_data = request.get_json()

    if not login_data:
        return jsonify({"error": "Invalid input"}), 400

    email = login_data.get('email')
    password = login_data.get('password')

    if not email or not password:
        return jsonify({"error": "Username and password required"}), 400

    if login_user(email, password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/api/add_product', methods=['POST'])
def register_product_endpoint():
    product_data = request.get_json()

    if not product_data:
        print("Invalid input")
        return jsonify({"error": "Invalid input"}), 400

    required_fields = ["name", "type", "price", "image", "production_date", "color", "condition"]
    if not all(field in product_data for field in required_fields):
        print("Missing fields")
        return jsonify({"error": "Missing fields"}), 400

    result, status = add_product(
        product_data["name"],
        product_data["type"],
        product_data["price"],
        product_data["image"],
        product_data["production_date"],
        product_data["color"],
        product_data["condition"],
    )

    return jsonify(result), status

@app.route('/api/reg_user', methods=['POST'])
def register_user_endpoint():
    user_data = request.get_json()

    if not user_data:
        return jsonify({"error": "Invalid input"}), 400

    required_fields = ["username", "password", "birth_date", "first_name", "last_name", "email"]
    if not all(field in user_data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    result, status = register_user(
        user_data["username"], 
        user_data["password"], 
        user_data["birth_date"], 
        user_data["first_name"], 
        user_data["last_name"], 
        user_data["email"]
    )

    return jsonify(result), status


if __name__ == '__main__':
    app.run(debug=True)
