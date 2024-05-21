from DatabaseConnection import Database

def register_user(username, password, birth_date, first_name, last_name, email):
    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("INSERT INTO user_account (username, password, birth_date, first_name, last_name, email) VALUES (%s, %s, %s, %s, %s, %s)", 
                       (username, password, birth_date, first_name, last_name, email))

        connection.commit()
        cursor.close()
        db_instance.return_connection(connection)
        return {"message": "User registered successfully!"}, 201
    except Exception as e:
        print(f"Failed to register user: {e}")
        return {"error": "Failed to register user"}, 500
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()