from flask import Flask, request, jsonify
from flask_cors import CORS
from DatabaseConnection import Database

app = Flask(__name__)
CORS(app)

def get_products():

    try:
        db_instance = Database.get_instance()
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

        cursor.close()
        db_instance.return_connection(connection)

        return jsonify(result), 200

    except Exception as e:
        print(f"Failed to retrieve data: {e}")
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()

@app.route('/api/data', methods=['GET'])

def receive_data():

    data = get_products()
    return data

if __name__ == '__main__':
    app.run(debug=True)