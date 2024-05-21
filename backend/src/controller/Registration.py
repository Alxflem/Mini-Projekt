from DatabaseConnection import Database

def register_user(username, password, birth_date, first_name, last_name, email):
    db_instance = None
    connection = None
    cursor = None
    
    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        connection.autocommit = False

        cursor.execute("INSERT INTO user_account (username, password, birth_date, first_name, last_name, email) VALUES (%s, %s, %s, %s, %s, %s)", 
                       (username, password, birth_date, first_name, last_name, email))
        print(username, password, birth_date, first_name, last_name)
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
        
