from DatabaseConnection import Database

def register_user(username, password, birth_date, first_name, last_name, email):
    db_instance = None
    connection = None
    cursor = None
    
    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        # Start a transaction
        connection.autocommit = False

        cursor.execute("INSERT INTO user_account (username, password, birth_date, first_name, last_name, email) VALUES (%s, %s, %s, %s, %s, %s)", 
                       (username, password, birth_date, first_name, last_name, email))
        print(username, password, birth_date, first_name, last_name)
        # Commit the transaction
        connection.commit()

        return {"message": "User registered successfully!"}, 201
    except Exception as e:
        # Roll back the transaction in case of an error
        if connection:
            connection.rollback()
        print(f"Failed to register user: {e}")
        return {"error": "Failed to register user"}, 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            # Reset autocommit to default
            connection.autocommit = True
            db_instance.return_connection(connection)
        if db_instance:
            db_instance.close_all_connections()
