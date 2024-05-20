from DatabaseConnection import Database

def login_user(email, password):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        query = "SELECT EXISTS (SELECT 1 FROM user_account WHERE email = %s AND password = %s)"
        cursor.execute(query, (email, password))
        exists = cursor.fetchone()[0]

        if exists:
            return True
        else:
            return False
    except Exception as e:
        print(f"Failed to retrieve data (Login): {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)
        if db_instance:
            db_instance.close_all_connections()