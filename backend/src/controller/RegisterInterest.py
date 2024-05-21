from DatabaseConnection import Database

def register_interest(type_name, email):
    db_instance = None
    connection = None
    cursor = None
    
    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        connection.autocommit = False


        cursor.execute("SELECT pt_id FROM product_type WHERE type_name = %s", (type_name));
        result = cursor.fetchone()

        if result is None:
            return {"error": "Email not found"}, 404

        type_id = result[0]


        cursor.execute("SELECT u_id FROM user_account WHERE email = %s", (email));
        result = cursor.fetchone()

        if result is None:
            return {"error": "Email not found"}, 404

        user_id = result[0]


        cursor.execute("INSERT INTO registerd_interest VALUES (%s, %s)", (type_id, user_id))

        connection.commit()

        return {"message": "User registered successfully!"}, 201
    except Exception as e:
        if connection:
            connection.rollback()
        print(f"Failed to register user: {e}")
        return {"error": "Failed to register user"}, 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.autocommit = True
            db_instance.return_connection(connection)
        if db_instance:
            db_instance.close_all_connections()